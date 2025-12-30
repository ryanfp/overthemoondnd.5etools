import {RenderRaces} from "./render-races.js";
const Renderer = globalThis.Renderer;

class RacesSublistManager extends SublistManager {
	static _getRowTemplate () {
		return [
			new SublistCellTemplate({
				name: "Name",
				css: "bold ve-col-5 pl-0 pr-1",
				colStyle: "",
			}),
			new SublistCellTemplate({
				name: "Ability",
				css: "ve-col-5 px-1",
				colStyle: "",
			}),
			new SublistCellTemplate({
				name: "Size",
				css: "ve-col-2 ve-text-center pl-1 pr-0",
				colStyle: "text-center",
			}),
		];
	}

	pGetSublistItem (race, hash) {
		const cellsText = [
			race.name,
			new SublistCell({text: race._slAbility, css: race._slAbility === VeCt.STR_NONE || race._slAbility. startsWith("Lineage") ? "italic" : ""}),
			(race.size || [Parser.SZ_VARIES]).map(sz => Parser.sizeAbvToFull(sz)).join("/"),
		];

		const $ele = $(`<div class="lst__row lst__row--sublist ve-flex-col">
				<a href="#${UrlUtil.autoEncodeHash(race)}" class="lst__row-border lst__row-inner">
					${this.constructor._getRowCellsHtml({values: cellsText})}
				</a>
			</div>
		`)
			.contextmenu(evt => this._handleSublistItemContextMenu(evt, listItem))
			.click(evt => this._listSub.doSelect(listItem, evt));

		const listItem = new ListItem(
			hash,
			$ele,
			race.name,
			{
				hash,
				page: race.page,
				ability: race._slAbility,
			},
			{
				entity: race,
				mdRow: [...cellsText],
			},
		);
		return listItem;
	}
}

class RacesPage extends ListPage {
	constructor () {
		const pageFilter = new PageFilterRaces();
		super({
			dataSource: DataUtil.race.loadJSON.bind(DataUtil.race, {isAddBaseRaces: true}),
			prereleaseDataSource: DataUtil.race.loadPrerelease.bind(DataUtil.race),
			brewDataSource: DataUtil.race.loadBrew.bind(DataUtil.race),

			pFnGetFluff: Renderer.race.pGetFluff.bind(Renderer.race),

			pageFilter,

			dataProps: ["race"],

			bookViewOptions: {
				nameSingular: "species",
				namePlural: "species",
				pageTitle: "Species Book View",
			},

			tableViewOptions: {
				title: "Species",
				colTransforms: {
					name: UtilsTableview.COL_TRANSFORM_NAME,
					source: UtilsTableview.COL_TRANSFORM_SOURCE,
					page: UtilsTableview.COL_TRANSFORM_PAGE,
					_hasSubrace: {
						name: "Base/Subrace",
						transform: (race) => {
							if (race._isBaseRace) return "Base";
							if (race._baseName) return `Subrace of: ${race._baseName}`;
							return "N/A";
						},
					},
					_slAbility: {name: "Ability Score", transform: (race) => race._slAbility},
					_size: {
						name: "Size",
						transform: (race) => (race.size || [Parser.SZ_VARIES]).map(sz => Parser.sizeAbvToFull(sz)).join("/"),
					},
					_speed: {
						name: "Speed",
						transform: (race) => Parser.getSpeedString(race),
					},
					_fLangs: {
						name: "Languages",
						transform: (race) => (race._fLangs || [])
   							.map(lang => {
      							// Shows only the language part before '|'
      							const abbr = lang.split("|")[0];
      							// Optionally capitalize the first letter
      							return abbr.charAt(0).toUpperCase() + abbr.slice(1);
    						})
    						.join(", ") || "\u2014",
						// transform: (race) => (race._fLangs || []).join(", ") || "\u2014",
					},
					_age: {
						name: "Age",
						transform: (race) => {
							if (! race.age) return "\u2014";
							return Renderer.get().render({type: "entries", entries: [race.age]}, 1);
						},
					},
					_traitTags: {
						name: "Traits",
						transform: (race) => (race.traitTags || [])
							.map(t => PageFilterRaces._TRAIT_DISPLAY_VALUES[t] || t)
							.join(", ") || "\u2014",
					},
					_senses: {
						name: "Senses",
						transform: (race) => {
							const senseKeywords = ["darkvision", "blindsight", "truesight", "tremorsense", "see invisibility", "devilsight"];
							const mainEntries = Array.isArray(race.entries) ? race.entries : [];
							const matched = mainEntries.filter(e => {
							if (typeof e === "object" && e.name) {
								const lower = e.name.trim().toLowerCase();
								if (senseKeywords.some(sense => lower.includes(sense))) return true;
							}
							if (typeof e === "object" && e.entries && Array.isArray(e.entries)) {
								// Optionally, also scan the text for the keyword:
								const content = e.entries.join(" ").toLowerCase();
								if (senseKeywords.some(sense => content.includes(sense))) return true;
							}
							return false;
							});
							if (!matched.length) return "\u2014";
							return Renderer.get().render({type: "entries", entries: matched}, 1);
						},
					},
					_fVuln: {
						name: "Damage Vulnerability",
						transform: (race) => (race._fVuln || []).join(", ") || "\u2014",
					},
					_fRes: {
						name: "Damage Resistance",
						transform: (race) => (race._fRes || []).join(", ") || "\u2014",
					},
					_fImm: {
						name: "Damage Immunity",
						transform: (race) => (race._fImm || []).join(", ") || "\u2014",
					},
					entries: {
						name: "Features",
						transform: (race) => {
							const mainEntries = Array.isArray(race.entries) ? race.entries : [];

							// Prepare column values for comparison
							const sizeValue = race.size
							? (Array.isArray(race.size)
								? race.size.map(sz => sz.toLowerCase()).join("/")
								: String(race.size).toLowerCase())
							: "";

							const speedValue = race.speed
							? (typeof race.speed === "object"
								? Object.entries(race.speed)
									.map(([type, val]) => {
										if (type === "walk") return `${val} ft.`;
										return `${type} ${val} ft.`;
									})
								: [`${race.speed} ft.`])
							: [];

							const fRes = (race._fRes || []).map(s => s.toLowerCase());
							const fImm = (race._fImm || []).map(s => s.toLowerCase());
							const fVuln = (race._fVuln || []).map(s => s.toLowerCase());
							const sensesValue = (race.senses || []).map(s => s.toLowerCase());
							const skillProfRegex = /^you (?:also )?have proficiency in (?:the )?\w+ skill/;
							const visionOrSenseKeywords = ["vision", "sense"]; // Can expand as needed

							const filtered = mainEntries.filter(e => {
							if (typeof e === "object" && e.name) {
								const lower = e.name.trim().toLowerCase();

								// HEADINGS filter
								if ([
									"age",
									"languages",
									"skill proficiency",
									"skill proficiencies",
									"appearance",
									"alignment",
									"creature type",
									"ability score increase"
									].includes(lower)
								) return false;

								// SIZE: filter if *every* subentry matches size value
								if (lower === "size" && sizeValue && Array.isArray(e.entries)
								&& e.entries.every(ent =>
									typeof ent === "string" && ent.toLowerCase().includes(sizeValue)
								)) return false;

								// SPEED: filter if *every* subentry matches any speed value
								if (
								["speed", "fly", "flight", "walk", "burrow", "swim", "nautical", "climb", "climbing", "swimming", "flying", "burrowing", "walking"].includes(lower) &&
								speedValue.length && Array.isArray(e.entries)
								) {
								if (e.entries.every(ent =>
										typeof ent === "string" &&
										speedValue.some(val => ent.toLowerCase().includes(val))
									)) return false;
								}

								// RES/IMM/VULN: filter only if *every* subentry contains all the types in the column
								if (
								(lower.includes("resistance") && fRes.length && Array.isArray(e.entries) &&
									e.entries.every(ent =>
									typeof ent === "string" && fRes.every(val => ent.toLowerCase().includes(val))
									)
								) ||
								(lower.includes("immunity") && fImm.length && Array.isArray(e.entries) &&
									e.entries.every(ent =>
									typeof ent === "string" && fImm.every(val => ent.toLowerCase().includes(val))
									)
								) ||
								(lower.includes("vulnerability") && fVuln.length && Array.isArray(e.entries) &&
									e.entries.every(ent =>
									typeof ent === "string" && fVuln.every(val => ent.toLowerCase().includes(val))
									)
								)
								) return false;

								// SENSES: filter block if heading hints sense and *every* subentry contains all sense column values
								if (
								visionOrSenseKeywords.some(kw => lower.includes(kw)) &&
								sensesValue.length && Array.isArray(e.entries) &&
								e.entries.every(ent =>
									typeof ent === "string" &&
									sensesValue.every(val => ent.includes(val))
								)
								) return false;

								// Skill prof header
								if (lower === "skill proficiency" || lower === "skill proficiencies") return false;
							}

							// CONTENT-BASED SKILL PROF (formulaic, as before)
							if (
								typeof e === "object" && Array.isArray(e.entries) &&
								e.entries.every(ent => typeof ent === "string" && skillProfRegex.test(ent.toLowerCase()))
							) return false;

							return true;
							});

							return Renderer.get().render({ type: "entries", entries: filtered }, 1);
						},
						flex: 3,
						},
					/*entries: {
						name: "Features",
						transform: (it) => Renderer.get().render({
   							type: "entries",
							entries: Array.isArray(it)
							? it.filter(e =>
								!(typeof e === "object" && e.name &&
									["age", "size", "languages"].includes(e.name.trim().toLowerCase())
								))
							: it
						}, 1),
						flex: 3
					},*/
				},
			},
			
			hasAudio: true,
		});
	}

	_addData (data) {
		if (data.race && data.race.length) super._addData(data);
		if (!data.subrace || !data.subrace.length) return;

		// Attach each subrace to a parent race, and recurse
		const nxtData = Renderer.race.adoptSubraces(this._dataList, data.subrace);

		if (nxtData.length) this._addData({race: Renderer.race.mergeSubraces(nxtData)});
	}

	getListItem (race, rcI, isExcluded) {
		const hash = UrlUtil.autoEncodeHash(race);
		if (this._seenHashes.has(hash)) return null;
		this._seenHashes.add(hash);

		this._pageFilter.mutateAndAddToFilters(race, isExcluded);

		const eleLi = document.createElement("div");
		eleLi.className = `lst__row ve-flex-col ${isExcluded ? "lst__row--blocklisted" : ""}`;

		const size = (race.size || [Parser.SZ_VARIES]).map(sz => Parser.sizeAbvToFull(sz)).join("/");
		const source = Parser.sourceJsonToAbv(race.source);

		eleLi.innerHTML = `<a href="#${hash}" class="lst__row-border lst__row-inner">
			<span class="bold ve-col-4 pl-0 pr-1">${race.name}</span>
			<span class="ve-col-4 px-1 ${race._slAbility === VeCt.STR_NONE || race._slAbility. startsWith("Lineage") ? "italic" : ""}">${race._slAbility}</span>
			<span class="ve-col-2 px-1 ve-text-center">${size}</span>
			<span class="ve-col-2 ve-text-center ${Parser.sourceJsonToSourceClassname(race.source)} pl-1 pr-0" title="${Parser.sourceJsonToFull(race.source)}">${source}</span>
		</a>`;

		const listItem = new ListItem(
			rcI,
			eleLi,
			race.name,
			{
				hash,
				source,
				page: race.page,
				ability: race._slAbility,
				size,
				cleanName: PageFilterRaces.getInvertedName(race.name) || "",
				alias: PageFilterRaces.getListAliases(race),
			},
			{
				isExcluded,
			},
		);

		eleLi.addEventListener("click", (evt) => this._list.doSelect(listItem, evt));
		eleLi.addEventListener("contextmenu", (evt) => this._openContextMenu(evt, this._list, listItem));

		return listItem;
	}

	_renderStats_doBuildStatsTab ({ent}) {
		this._$pgContent.empty().append(RenderRaces.$getRenderedRace(ent));
	}
}

const racesPage = new RacesPage();
racesPage.sublistManager = new RacesSublistManager();
window.addEventListener("load", () => racesPage.pOnLoad());

globalThis.dbg_page = racesPage;
