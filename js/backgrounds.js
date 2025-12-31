import {RenderBackgrounds} from "./render-backgrounds.js";

class BackgroundSublistManager extends SublistManager {
	static _getRowTemplate () {
		return [
			new SublistCellTemplate({
				name: "Name",
				css: "bold ve-col-3 pl-0 pr-1",
				colStyle: "",
			}),
			new SublistCellTemplate({
				name: "Ability",
				css: "ve-col-5 px-1",
				colStyle: "",
			}),
			new SublistCellTemplate({
				name: "Skills",
				css: "ve-col-4 pl-1 pr-0",
				colStyle: "",
			}),
		];
	}

	pGetSublistItem (it, hash) {
		const name = it.name.replace("Variant ", "");
		const {summary: skills} = Renderer.generic.getSkillSummary({skillProfs: it.skillProficiencies || [], isShort: true});
		const cellsText = [
			name,
			new SublistCell({text: it._slAbility, css: it._slAbility === VeCt.STR_NONE ? "italic" : ""}),
			skills,
		];

		const $ele = $$`<div class="lst__row lst__row--sublist ve-flex-col">
			<a href="#${hash}" class="lst__row-border lst__row-inner">
				${this.constructor._getRowCellsHtml({values: cellsText})}
			</a>
		</div>`
			.contextmenu(evt => this._handleSublistItemContextMenu(evt, listItem))
			.click(evt => this._listSub.doSelect(listItem, evt));

		const listItem = new ListItem(
			hash,
			$ele,
			name,
			{
				hash,
				source: Parser.sourceJsonToAbv(it.source),
				page: it.page,
				skills,
			},
			{
				entity: it,
				mdRow: [...cellsText],
			},
		);
		return listItem;
	}
}

class BackgroundPage extends ListPage {
	constructor () {
		const pageFilter = new PageFilterBackgrounds();
		super({
			dataSource: DataUtil.background.loadJSON.bind(DataUtil.background),

			pFnGetFluff: Renderer.background.pGetFluff.bind(Renderer.background),

			pageFilter,

			bookViewOptions: {
				nameSingular: "background",
				namePlural: "backgrounds",
				pageTitle: "Backgrounds Book View",
			},

			// function to try and catch rogue objects not outputting correctly
			function toolProficiencyDisplay(code) {
  				switch(code) {
				case "anyGamingSet": return "any gaming set";
				case "anyArtisansTool": return "any artisan's tools";
				case "anyMusicalInstrument": return "any musical instrument";
				default: return code;
 				}
			},

			tableViewOptions: {
				title: "Backgrounds",
				colTransforms: {
					name: UtilsTableview. COL_TRANSFORM_NAME,
					source: UtilsTableview.COL_TRANSFORM_SOURCE,
					page: UtilsTableview.COL_TRANSFORM_PAGE,
					_slAbility: {
						name: "Ability Scores",
						transform: (bg) => bg._slAbility
					},
					_fFeats: {
						name: "Feat",
						transform: (bg) => (bg._fFeats || []).join(", ") || "\u2014",
					},
					_skillDisplay: {
						name: "Skill Proficiencies",
						transform: (bg) => bg._skillDisplay
					},
					_fTools: {
						name: "Tool Proficiencies",
						transform:  (bg) => (bg._fTools || []).join(", ") || "\u2014",
					},
					_otherBenefit: {
					name: "Other Benefit",
					transform: (bg) =>
						bg._otherBenefit
						? Renderer.get().render({ type: "entries", entries: bg._otherBenefit }, 1)
						: "\u2014",
					flex: 2,
					},
					_startingEquipment: {
					name: "Equipment",
					transform: (bg) =>
						bg._startingEquipment
						? (Array.isArray(bg._startingEquipment)
							? bg._startingEquipment.join(", ")
							: String(bg._startingEquipment))
						: "\u2014",
					flex: 2,
					},
					entries: {
						name: "Features",
						transform: (it) => Renderer.get().render({
   							type: "entries",
							entries: Array.isArray(it)
							? it.filter(e =>
								!(typeof e === "object" && e.name &&
									["ability score increase", "increase your ability score", "starting equipment"].includes(e.name.trim().toLowerCase())
								))
							: it
						}, 1),
						flex: 3
					},
						/*name: "Text",
						transform: (bg) => Renderer.get().render({type: "entries", entries: bg.entries}, 1),
						flex: 3,*/
				},
			},

			dataProps: ["background"],
		});
	}



	getListItem (bg, bgI, isExcluded) {
		this._pageFilter.mutateAndAddToFilters(bg, isExcluded);

		const eleLi = document.createElement("div");
		eleLi.className = `lst__row ve-flex-col ${isExcluded ? "lst__row--blocklisted" : ""}`;

		const name = bg.name.replace("Variant ", "");
		const hash = UrlUtil.autoEncodeHash(bg);
		const source = Parser.sourceJsonToAbv(bg.source);

		eleLi.innerHTML = `<a href="#${hash}" class="lst__row-border lst__row-inner">
			<span class="bold ve-col-2-5 pl-0 pr-1">${name}</span>
			<span class="ve-col-3-5 px-1 ${bg._slAbility === VeCt.STR_NONE ? "italic" : ""}">${bg._slAbility}</span>
			<span class="ve-col-4 px-1">${bg._skillDisplay}</span>
			<span class="ve-col-2 ve-text-center ${Parser.sourceJsonToSourceClassname(bg.source)}  pl-1 pr-0" title="${Parser.sourceJsonToFull(bg.source)}">${source}</span>
		</a>`;

		const listItem = new ListItem(
			bgI,
			eleLi,
			name,
			{
				hash,
				source,
				page: bg.page,
				ability: bg._slAbility,
				skills: bg._skillDisplay,
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
		this._$pgContent.empty().append(RenderBackgrounds.$getRenderedBackground(ent));
	}
}

const backgroundsPage = new BackgroundPage();
backgroundsPage.sublistManager = new BackgroundSublistManager();
window.addEventListener("load", () => backgroundsPage.pOnLoad());

globalThis.dbg_page = backgroundsPage;
