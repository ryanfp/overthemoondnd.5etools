"use strict";

Renderer.dice = {
	SYSTEM_USER: {
		name: "Avandra", // goddess of luck
	},
	POS_INFINITE: 100000000000000000000, // larger than this, and we start to see "e" numbers appear
	_SYMBOL_PARSE_FAILED: Symbol("parseFailed"),

	_wrpRoll: null,
	_eleRollboxMinimized: null,
	_iptRoll: null,
	_eleOutRoll: null,
	_eleHead: null,
	_hist: [],
	_histIndex: null,
	_eleLastRolledBy: null,
	_storage: null,

	_isManualMode: false,

	/* -------------------------------------------- */

	// region Utilities
	DICE: [4, 6, 8, 10, 12, 20, 100],
	getNextDice (faces) {
		const idx = Renderer.dice.DICE.indexOf(faces);
		if (~idx) return Renderer.dice.DICE[idx + 1];
		else return null;
	},

	getPreviousDice (faces) {
		const idx = Renderer.dice.DICE.indexOf(faces);
		if (~idx) return Renderer.dice.DICE[idx - 1];
		else return null;
	},
	// endregion

	/* -------------------------------------------- */

	// region DM Screen integration
	_panel: null,
	bindDmScreenPanel (panel, title) {
		if (Renderer.dice._panel) { // there can only be one roller box
			Renderer.dice.unbindDmScreenPanel();
		}
		Renderer.dice._showBox();
		Renderer.dice._panel = panel;
		panel.doPopulate_Rollbox(title);
	},

	unbindDmScreenPanel () {
		if (Renderer.dice._panel) {
			document.body.appendChild(Renderer.dice._wrpRoll);
			Renderer.dice._panel.close$TabContent();
			Renderer.dice._panel = null;
			Renderer.dice._hideBox();
			Renderer.dice._wrpRoll.removeClass("rollbox-panel");
		}
	},

	getRoller () {
		return Renderer.dice._wrpRoll;
	},
	// endregion

	/* -------------------------------------------- */

	bindOnclickListener (ele) {
		ele.addEventListener("click", (evt) => {
			const eleDice = evt.target.hasAttribute("data-packed-dice")
				? evt.target
				// Tolerate e.g. Bestiary wrapped proficiency dice rollers
				: evt.target.parentElement?.hasAttribute("data-packed-dice")
					? evt.target.parentElement
					: null;

			if (!eleDice) return;

			evt.preventDefault();
			evt.stopImmediatePropagation();
			Renderer.dice.pRollerClickUseData(evt, eleDice).then(null);
		});
	},

	/* -------------------------------------------- */

	/**
	 * Silently roll an expression and get the result.
	 * Note that this does not support dynamic variables (e.g. user proficiency bonus).
	 */
	parseRandomise2 (str) {
		if (!str || !str.trim()) return null;
		const wrpTree = Renderer.dice.lang.getTree3(str);
		if (wrpTree) return wrpTree.tree.evl({});
		else return null;
	},

	/**
	 * Silently get the average of an expression.
	 * Note that this does not support dynamic variables (e.g. user proficiency bonus).
	 */
	parseAverage (str) {
		if (!str || !str.trim()) return null;
		const wrpTree = Renderer.dice.lang.getTree3(str);
		if (wrpTree) return wrpTree.tree.avg({});
		else return null;
	},

	// region Roll box UI
	_showBox () {
		Renderer.dice._eleRollboxMinimized.hideVe();
		Renderer.dice._wrpRoll.showVe();
		Renderer.dice._iptRoll.prop("placeholder", `${Renderer.dice._getRandomPlaceholder()} or "/help"`);
	},

	_hideBox () {
		Renderer.dice._eleRollboxMinimized.showVe();
		Renderer.dice._wrpRoll.hideVe();
	},

	_getRandomPlaceholder () {
		const count = RollerUtil.randomise(10);
		const faces = Renderer.dice.DICE[RollerUtil.randomise(Renderer.dice.DICE.length - 1)];
		const mod = (RollerUtil.randomise(3) - 2) * RollerUtil.randomise(10);
		const drop = (count > 1) && RollerUtil.randomise(5) === 5;
		const dropDir = drop ? RollerUtil.randomise(2) === 2 ? "h" : "l" : "";
		const dropAmount = drop ? RollerUtil.randomise(count - 1) : null;
		return `${count}d${faces}${drop ? `d${dropDir}${dropAmount}` : ""}${mod < 0 ? mod : mod > 0 ? `+${mod}` : ""}`;
	},

	/** Initialise the roll box UI. */
	async _pInit () {
		const minRoll = ee`<button class="rollbox-min">
			<span class="rollbox-min__icon" aria-hidden="true">
				<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
					<path fill="currentColor" d="M248 20.3L72.33 132.6L248 128.8zm16 0v108.5l175.7 3.8zm51.4 58.9c6.1 3.5 8.2 7.2 15.1 4.2c10.7.8 22.3 5.8 27.6 15.7c4.7 4.5 1.5 12.6-5.2 12.6c-9.7.1-19.7-6.1-14.6-8.3c4.7-2 14.7.9 10-5.5c-3.6-4.5-11-7.8-16.3-5.9c-1.6 6.8-9.4 4-12-.7c-2.3-5.8-9.1-8.2-15-7.9c-6.1 2.7 1.6 8.8 5.3 9.9c7.9 2.2.2 7.5-4.1 5.1c-4.2-2.4-15-9.6-13.5-18.3c5.8-7.39 15.8-4.62 22.7-.9m-108.5-3.5c5.5.5 12.3 3 10.2 9.9c-4.3 7-9.8 13.1-18.1 14.8c-6.5 3.4-14.9 4.4-21.6 1.9c-3.7-2.3-13.5-9.3-14.9-3.4c-2.1 14.8.7 13.1-11.1 17.8V92.3c9.9-3.9 21.1-4.5 30.3 1.3c8 4.2 19.4 1.5 24.2-5.7c1.4-6.5-8.1-4.6-12.2-3.4c-2.7-8.2 7.9-7.5 13.2-8.8m35 69.2L55.39 149l71.21 192.9zm28.2 0l115.3 197L456.6 149zm-14.1 7.5L138.9 352.6h234.2zm133.3 21.1c13.9 8.3 21.5 26.2 22.1 43c-1.3 13.6-.7 19.8-15.2 21.4s-23.9-19.2-29.7-32.6c-3.4-9.9-5.8-24 1.7-31.3c6.1-4.8 15-4.1 21.1-.5m-223.7 16.1c2.1 4-.5 11.4-4.8 12.1c-4.9.7-3.8-9.3-9.4-11.6c-6.9-2.3-13.6 5.6-15 11.6c10.4-4 20.3 7.1 20.3 17c-.4 11.7-7.9 24.8-19.7 28.1h-5.6c-12.7-.7-18.3-15.8-14.2-26.6c4.4-15.8 10.8-33.9 27.2-40.6c8.5-3.9 19 3.2 21.2 10m213.9-8.4c-7.1-.1-4.4 10-3.3 14.5c3.5 11.5 7.3 26.6 18.9 30c6.8-1.2 4.4-12.8 3.7-16.5c-4.7-10.9-7.1-23.3-19.3-28M52 186v173.2l61.9-5.7zm408 0l-61.9 167.5l61.9 5.7zm-117.9.7l28.5 63.5l-10 4.4l-20-43.3c-6.1 3-13 8.9-14.6-1.4c-1.3-3.9 8.5-5.1 8.1-11.9c-.3-6.9 2.2-12.2 8-11.3m-212 27.4c-2.4 5.1-4.1 10.3-2.7 15.9c1.7 8.8 13.5 6.4 15.6-.8c2.7-5 3.9-11.7-.5-15.7c-4.1-3.4-8.9-2.8-12.4.6m328.4 41.6c-.1 18.6 1.1 39.2-9.7 55.3c-.9 1.2-2.2 1.9-3.7 2.5c-5.8-4.1-3-11.3 1.2-15.5c1 7.3 5.5-2.9 6.6-5.6c1.3-3.2 3.6-17.7-1-10.2c.7 4-6.8 13.1-9.3 8.1c-5-14.4 0-30.5 7-43.5c5.7-6.2 9.9 4.4 8.9 8.9M59.93 245.5c.59.1 1.34 1 2.48 3.6v61.1c-7.3-7-4.47-18-4.45-26.4c0-8.4 1.65-16.3-1.28-23.2c-4.62-1.7-5.79-17-3.17-12.7c4.41 4.8 4.66-2.7 6.42-2.4m178.77 7.6c8.1 4.5 13.8 14.4 10.8 23.6c-2.1 15.2-27 21.1-30.4 29.7c-1.2 3 25.4 1.6 30.2 1.6c.5 4 1.5 10.7-3.8 11.7c-14.5-1.2-29.9-.6-45.1-.6c.4-11.2 7.4-21.3 17-26.8c6.9-4.9 15.4-9.3 18.1-17.9c1.8-4.5-.6-9.3-4.6-11.5c-4.2-2.9-11-2.3-13.2 2.7c-2 3.8-4.4 9.1-8.7 9.6c-2.9.4-9 .5-7.2-4.9c1.4-5.6 3.4-11.5 8.2-15.2c8.8-6.3 19.9-6.7 28.7-2m53.3-1.4c6.8 2.2 12 7.9 14.3 14.6c6.1 14.7 5.5 33.1-4.4 45.9c-4.5 4.8-10.2 9.1-17 9.1c-12.5-.1-22.4-11.1-24.8-22.8c-3.1-13.4-1.8-28.7 6.9-39.8c6.8-7.6 16-10.3 25-7m156.1 8.1c-1.6 5.9-3.3 13.4-.7 19.3c5.1-2 5.4-9.6 6.6-14.5c.9-6.1-3.5-12.6-5.9-4.8m-176.2 21.1c.6 10.5 1.7 22.8 9.7 28.2c4.9 1.8 9.7-2.2 11.1-6.7c1.9-6.3 2.3-12.9 2.4-19.4c-.2-7.1-1.5-15-6.7-20.1c-12.2-4.4-15.3 10.9-16.5 18M434 266.8V328l-4.4 6.7v-42.3c-4.6 7.5-9.1 9.1-6.1-.9c6.1-7.1 4.8-17.4 10.5-24.7M83.85 279c.8 3.6 5.12 17.8 2.04 14.8c-1.97-1.3-3.62-4.9-3.41-6.1c-1.55-3-2.96-6.1-4.21-9.2c-2.95 4-3.96 8.3-3.14 13.4c.2-1.6 1.18-2.3 3.39-.7c7.84 12.6 12.17 29.1 7.29 43.5l-2.22 1.1c-10.36-5.8-11.4-19.4-13.43-30c-1.55-12.3-.79-24.7 2.3-36.7c5.2-3.8 9.16 5.4 11.39 9.9m-7.05 20.2c-4.06 4.7-2.26 12.8-.38 18.4c1.11 5.5 6.92 10.2 6.06 1.6c.69-11.1-2.33-12.7-5.68-20m66.4 69.4L256 491.7l112.8-123.1zm-21.4.3l-53.84 4.9l64.24 41.1c-2.6-2.7-4.9-5.7-7.1-8.8c-5.2-6.9-10.5-13.6-18.9-16.6c-8.75-6.5-4.2-5.3 2.9-2.6c-1-1.8-.7-2.6.1-2.6c2.2-.2 8.4 4.2 9.8 6.3l24.7 31.6l65.1 41.7zm268.4 0l-42.4 46.3c6.4-3.1 11.3-8.5 17-12.4c2.4-1.4 3.7-1.9 4.3-1.9c2.1 0-5.4 7.1-7.7 10.3c-9.4 9.8-16 23-28.6 29.1l18.9-24.5c-2.3 1.3-6 3.2-8.2 4.1l-40.3 44l74.5-47.6c5.4-6.7 1.9-5.6-5.7-.9l-11.4 6c11.4-13.7 30.8-28.3 40-35.6s15.9-9.8 8.2-1.5l-12.6 16c10-7.6.9 3.9-4.5 5.5c-.7 1-1.4 2-2.2 2.9l54.5-34.9zM236 385.8v43.4h-13.4v-30c-5-1.4-10.4 1.7-15.3-.3c-3.8-2.9 1-6.8 4.5-5.9c3.3-.1 7.6.2 9.3-3.2c4.4-4.5 9.6-4.4 14.9-4m29 .5c12.1 1.2 24.2.6 36.6.6c1.5 3 .8 7.8-3.3 7.9c-7.7.3-21-1.6-25.9.6c-8.2 10.5 5.7 3.8 11.4 5.2c7 1.1 15 2.9 19.1 9.2c2.1 3.1 2.7 7.3.7 10.7c-5.8 6.8-17 11.5-25.3 10.9c-7.3-.6-15.6-1.1-20.6-7.1c-6.4-10.6 10.5-6.7 12.2-3.2c6 5.3 20.3 1.9 20.7-4.7c.6-4.2-2.1-6.3-6.9-7.8s-12.6 1-17.3 1.8s-9.6.5-9-4.4c.8-4.2 2.7-8.1 2.7-12.5c.1-3 1.7-7 4.9-7.2m133.5 5c-.2-.2-7 5.8-9.9 8.1l-15.8 13.1c10.6-6.5 19.3-12 25.7-21.2m-247 14.2c2.4 0 7.5 4.6 9.4 7l26.1 31.1c-7.7-2.1-13.3-7.1-17.6-13.7c-6.5-7.3-11.3-16.6-21.2-19.6c-9-5-5.2-6.4 2.1-2.2c-.3-1.9.2-2.6 1.2-2.6"/>
				</svg>
			</span>
		</button>`
			.onn("click", () => {
				Renderer.dice._showBox();
				Renderer.dice._iptRoll.focuse();
			});
		const eleHead = ee`<div class="head-roll"><span class="hdr-roll">Dice Roller</span><span class="p-2 glyphicon glyphicon-remove"></span></div>`
			.onn("click", () => {
				if (!Renderer.dice._panel) Renderer.dice._hideBox();
			});
		const outRoll = ee`<div class="out-roll"></div>`;
		const iptRoll = ee`<input class="ipt-roll form-control" autocomplete="off" spellcheck="false">`
			.onn("keypress", async evt => {
				evt.stopPropagation();
				if (evt.key !== "Enter") return;

				const strDice = iptRoll.val();
				const result = await Renderer.dice.pRoll2(
					strDice,
					{
						isUser: true,
						name: "Anon",
					},
				);
				iptRoll.val("");

				if (result === Renderer.dice._SYMBOL_PARSE_FAILED) {
					Renderer.dice._showInvalid();
					iptRoll.addClass("form-control--error");
				}
			})
			.onn("keydown", (evt) => {
				iptRoll.removeClass("form-control--error");

				// arrow keys only work on keydown
				if (evt.key === "ArrowUp") {
					evt.preventDefault();
					Renderer.dice._prevHistory();
					return;
				}

				if (evt.key === "ArrowDown") {
					evt.preventDefault();
					Renderer.dice._nextHistory();
				}
			});
		const wrpRoll = ee`<div class="rollbox ve-flex-col min-h-0">
			${eleHead}
			${outRoll}
			${iptRoll}
		</div>`.hideVe();

		Renderer.dice._wrpRoll = wrpRoll;
		Renderer.dice._eleRollboxMinimized = minRoll;
		Renderer.dice._eleHead = eleHead;
		Renderer.dice._eleOutRoll = outRoll;
		Renderer.dice._iptRoll = iptRoll;

		e_({ele: document.body}).appends(minRoll).appends(wrpRoll);

		wrpRoll
			.onn("click", (evt) => {
				const tgt = e_({ele: evt.target});
				if (!tgt.hasClass("out-roll-item-code")) return;
				Renderer.dice._iptRoll.val(tgt.txt()).focuse();
			});
		Renderer.dice.storage = await StorageUtil.pGet(VeCt.STORAGE_ROLLER_MACRO) || {};
	},

	_prevHistory () { Renderer.dice._histIndex--; Renderer.dice._prevNextHistory_load(); },
	_nextHistory () { Renderer.dice._histIndex++; Renderer.dice._prevNextHistory_load(); },

	_prevNextHistory_load () {
		Renderer.dice._cleanHistoryIndex();
		const nxtVal = Renderer.dice._hist[Renderer.dice._histIndex];
		Renderer.dice._iptRoll.val(nxtVal);
		if (nxtVal) Renderer.dice._iptRoll[0].selectionStart = Renderer.dice._iptRoll[0].selectionEnd = nxtVal.length;
	},

	_cleanHistoryIndex: () => {
		if (!Renderer.dice._hist.length) {
			Renderer.dice._histIndex = null;
		} else {
			Renderer.dice._histIndex = Math.min(Renderer.dice._hist.length, Math.max(Renderer.dice._histIndex, 0));
		}
	},

	_addHistory: (str) => {
		Renderer.dice._hist.push(str);
		// point index at the top of the stack
		Renderer.dice._histIndex = Renderer.dice._hist.length;
	},

	_scrollBottom: () => {
		Renderer.dice._eleOutRoll.scrollTope(1e10);
	},
	// endregion

	// region Event handling
	RE_PROMPT: /#\$prompt_number:?([^$]*)\$#/g,

	async pRollerClickUseData (evt, ele) {
		evt.stopPropagation();
		evt.preventDefault();

		ele = e_({ele});
		const rollData = JSON.parse(ele.attr("data-packed-dice"));
		let name = ele.attr("data-roll-name");
		let shiftKey = evt.shiftKey;
		let ctrlKey = EventUtil.isCtrlMetaKey(evt);

		const options = rollData.toRoll.split(";").map(it => it.trim()).filter(Boolean);

		let chosenRollData;
		if (options.length > 1) {
			const cpyRollData = MiscUtil.copyFast(rollData);
			const menu = ContextUtil.getMenu([
				new ContextUtil.Action(
					"Choose Roll",
					null,
					{isDisabled: true},
				),
				null,
				...options.map(rollOption => {
					return new ContextUtil.Action(
						`Roll ${rollOption.replace(/#\$prompt_number[^$]*\$#/g, "(𝑛)")}`,
						evt => {
							shiftKey = shiftKey || evt.shiftKey;
							ctrlKey = ctrlKey || (EventUtil.isCtrlMetaKey(evt));
							cpyRollData.toRoll = rollOption;
							return cpyRollData;
						},
					);
				}),
			]);

			chosenRollData = await ContextUtil.pOpenMenu(evt, menu);
		} else chosenRollData = rollData;

		if (!chosenRollData) return;

		const results = [];
		for (const m of chosenRollData.toRoll.matchAll(Renderer.dice.RE_PROMPT)) {
			const optionsRaw = m[1];
			const opts = {};
			if (optionsRaw) {
				const spl = optionsRaw.split(",");
				spl.map(it => it.trim()).forEach(part => {
					const [k, v] = part.split("=").map(it => it.trim());
					switch (k) {
						case "min":
						case "max":
							opts[k] = Number(v); break;
						default:
							opts[k] = v; break;
					}
				});
			}

			if (opts.min == null) opts.min = 0;
			if (opts.max == null) opts.max = Renderer.dice.POS_INFINITE;
			if (opts.default == null) opts.default = 0;

			const input = await InputUiUtil.pGetUserNumber(opts);
			if (input == null) return;
			results.push(input);
		}

		const rollDataCpy = MiscUtil.copyFast(chosenRollData);
		rollDataCpy.toRoll = rollDataCpy.toRoll.replace(Renderer.dice.RE_PROMPT, () => results.shift());

		// If there's a prompt, prompt the user to select the dice
		let rollDataCpyToRoll;
		if (rollData.prompt) {
			const sortedKeys = Object.keys(rollDataCpy.prompt.options).sort(SortUtil.ascSortLower);
			const menu = ContextUtil.getMenu([
				new ContextUtil.Action(rollDataCpy.prompt.entry, null, {isDisabled: true}),
				null,
				...sortedKeys
					.map(it => {
						const title = rollDataCpy.prompt.mode === "psi"
							? `${it} point${it === "1" ? "" : "s"}`
							: `${Parser.spLevelToFull(it)} level`;

						return new ContextUtil.Action(
							title,
							evt => {
								shiftKey = shiftKey || evt.shiftKey;
								ctrlKey = ctrlKey || (EventUtil.isCtrlMetaKey(evt));

								const fromScaling = rollDataCpy.prompt.options[it];
								if (!fromScaling) {
									name = "";
									return rollDataCpy;
								} else {
									name = rollDataCpy.prompt.mode === "psi" ? `${it} psi activation` : `${Parser.spLevelToFull(it)}-level cast`;
									rollDataCpy.toRoll += `+${fromScaling}`;
									return rollDataCpy;
								}
							},
						);
					}),
			]);

			rollDataCpyToRoll = await ContextUtil.pOpenMenu(evt, menu);
		} else rollDataCpyToRoll = rollDataCpy;

		if (!rollDataCpyToRoll) return;
		await Renderer.dice.pRollerClick({shiftKey, ctrlKey}, ele, JSON.stringify(rollDataCpyToRoll), name);
	},

	__rerollNextInlineResult (ele) {
		ele = e_({ele});
		const result = ele.next(`.result`);
		const r = Renderer.dice.__rollPackedData(ele);
		result.txt(r);
	},

	__rollPackedData (ele) {
		// Note that this does not support dynamic variables (e.g. user proficiency bonus)
		const wrpTree = Renderer.dice.lang.getTree3(ele.attr("data-packed-dice").toRoll);
		return wrpTree.tree.evl({});
	},

	getEleUnknownTableRoll (total) { return e_({outer: Renderer.dice._pRollerClick_getMsgBug(total)}); },

	_pRollerClick_getMsgBug (total) { return `<span class="message">No result found matching roll ${total}?! <span class="help-subtle" title="Bug!">🐛</span></span>`; },

	async pRollerClick (evtMock, ele, packed, name) {
		ele = e_({ele});
		const entry = JSON.parse(packed);
		const additionalData = {...ele.dataset};

		const rolledBy = {
			name: Renderer.dice._pRollerClick_attemptToGetNameOfRoller({ele}),
			label: name != null ? name : Renderer.dice._pRollerClick_attemptToGetNameOfRoll({entry, ele}),
		};

		const modRollMeta = Renderer.dice.getEventModifiedRollMeta(evtMock, entry);
		const parent = ele.closeste("th, p, table");

		const rollResult = await this._pRollerClick_pGetResult({
			parent,
			ele,
			entry,
			modRollMeta,
			rolledBy,
			additionalData,
		});

		if (!entry.autoRoll) return;

		const tgt = ele.next(`[data-rd-is-autodice-result="true"]`);
		const curTxt = tgt.txt();
		tgt.txt(rollResult);
		JqueryUtil.showCopiedEffect(tgt, curTxt, true);
	},

	async _pRollerClick_pGetResult ({parent = null, ele, entry, modRollMeta, rolledBy, additionalData}) {
		const sharedRollOpts = {
			rollCount: modRollMeta.rollCount,
			additionalData,
			isHidden: !!entry.autoRoll,
		};

		if (parent?.is("th") && parent.attr("data-rd-isroller") === "true") {
			if (parent.attr("data-rd-namegeneratorrolls")) {
				return Renderer.dice._pRollerClick_pRollGeneratorTable({
					parent,
					ele,
					rolledBy,
					modRollMeta,
					rollOpts: sharedRollOpts,
				});
			}

			return Renderer.dice.pRollEntry(
				modRollMeta.entry,
				rolledBy,
				{
					...sharedRollOpts,
					fnGetMessage: Renderer.dice._pRollerClick_fnGetMessageTable.bind(Renderer.dice, ele),
				},
			);
		}

		return Renderer.dice.pRollEntry(
			modRollMeta.entry,
			rolledBy,
			{
				...sharedRollOpts,
			},
		);
	},

	_pRollerClick_fnGetMessageTable (ele, total) {
		const elesTd = Renderer.dice._pRollerClick_getTdsFromTotal(ele, total);
		if (elesTd) {
			const tableRow = elesTd.map(ele => ele.innerHTML.trim()).filter(Boolean).join(" | ");
			const row = ee`<span class="message">${tableRow}</span>`;
			Renderer.dice._pRollerClick_rollInlineRollers(ele);
			return row.html();
		}
		return Renderer.dice._pRollerClick_getMsgBug(total);
	},

	// Aka "getTableName", probably
	_pRollerClick_attemptToGetNameOfRoll ({entry, ele}) {
		// Try to use the entry's built-in name
		if (entry.name) return entry.name;

		const eleNameAncestor = ele.closeste(`[data-roll-name-ancestor]`);
		if (!eleNameAncestor) return "";

		const dataName = eleNameAncestor.attr("data-roll-name-ancestor");
		if (dataName) return dataName;

		return eleNameAncestor.txt().trim().replace(/[.,:]$/, "");
	},

	_pRollerClick_attemptToGetNameOfRoller ({ele}) {
		const eleNameAncestor = ele.closeste(`[data-roll-name-ancestor-roller]`);
		if (eleNameAncestor) return eleNameAncestor.attr("data-roll-name-ancestor-roller");

		const roll = ele.closeste(`[data-rollbox-last-rolled-by-name]`);
		if (roll) return roll.attr("data-rollbox-last-rolled-by-name");

		const name = document.title.replace("- 5etools", "").trim();
		return name === "DM Screen" ? "Dungeon Master" : name;
	},

	_pRollerClick_getTdsFromTotal (ele, total) {
		const table = ele.closeste(`table`);
		const tdRolls = table.findAll("td")
			.filter(eleSub => {
				if (!eleSub.closeste(`table`).is(table)) return false;
				return total >= Number(eleSub.attr("data-roll-min")) && total <= Number(eleSub.attr("data-roll-max"));
			});
		if (!tdRolls.length) return null;
		const [tdRoll] = tdRolls;
		const nxtAll = tdRoll.nextAll();
		if (nxtAll.length) return nxtAll;
		return null;
	},

	_pRollerClick_rollInlineRollers (ele) {
		ele.findAll(`.render-roller`)
			.forEach(eleSub => {
				const r = Renderer.dice.__rollPackedData(eleSub);
				eleSub.attr("onclick", `Renderer.dice.__rerollNextInlineResult(this)`);
				eleSub.aftere(` (<span class="result">${r}</span>)`);
			});
	},

	_pRollerClick_fnGetMessageGeneratorTable (ele, ix, total) {
		const elesTd = Renderer.dice._pRollerClick_getTdsFromTotal(ele, total);
		if (elesTd) {
			const row = ee`<span class="message">${elesTd[ix].innerHTML.trim()}</span>`;
			Renderer.dice._pRollerClick_rollInlineRollers(ele);
			return row.html();
		}
		return Renderer.dice._pRollerClick_getMsgBug(total);
	},

	async _pRollerClick_pRollGeneratorTable ({parent, ele, rolledBy, modRollMeta, rollOpts}) {
		Renderer.dice.addElement({rolledBy, html: `<i>${rolledBy.label}:</i>`, isMessage: true});

		// Track a total of all rolls--this is a bit meaningless, but this method is expected to return a result value
		let total = 0;

		const out = [];
		const numRolls = Number(parent.attr("data-rd-namegeneratorrolls"));
		const ths = ele.closeste("table").findAll("th");
		for (let i = 0; i < numRolls; ++i) {
			const cpyRolledBy = MiscUtil.copyFast(rolledBy);
			cpyRolledBy.label = ths[i + 1].txt().trim();

			const result = await Renderer.dice.pRollEntry(
				modRollMeta.entry,
				cpyRolledBy,
				{
					...rollOpts,
					fnGetMessage: Renderer.dice._pRollerClick_fnGetMessageGeneratorTable.bind(Renderer.dice, ele, i),
				},
			);
			total += result;
			const elesTd = Renderer.dice._pRollerClick_getTdsFromTotal(ele, result);

			if (!elesTd) {
				out.push(`(no result)`);
				continue;
			}

			out.push(elesTd[i].innerHTML.trim());
		}

		Renderer.dice.addElement({rolledBy, html: `= ${out.join(" ")}`, isMessage: true});

		return total;
	},

	getEventModifiedRollMeta (evt, entry) {
		// Change roll type/count depending on CTRL/SHIFT status
		const out = {rollCount: 1, entry};

		if (evt.shiftKey) {
			if (entry.subType === "damage") { // If SHIFT is held, roll crit
				const dice = [];
				// TODO(future) in order for this to correctly catch everything, would need to parse the toRoll as a tree and then pull all dice expressions from the first level of that tree
				entry.toRoll
					.replace(/\s+/g, "") // clean whitespace
					.replace(/\d*?d\d+/gi, m0 => dice.push(m0));
				entry.toRoll = `${entry.toRoll}${dice.length ? `+${dice.join("+")}` : ""}`;
			} else if (entry.subType === "d20") { // If SHIFT is held, roll advantage
				// If we have a cached d20mod value, use it
				if (entry.d20mod != null) entry.toRoll = `2d20dl1${entry.d20mod}`;
				else entry.toRoll = entry.toRoll.replace(/^\s*1?\s*d\s*20/, "2d20dl1");
			} else out.rollCount = 2; // otherwise, just roll twice
		}

		if (EventUtil.isCtrlMetaKey(evt)) {
			if (entry.subType === "damage") { // If CTRL is held, half the damage
				entry.toRoll = `floor((${entry.toRoll}) / 2)`;
			} else if (entry.subType === "d20") { // If CTRL is held, roll disadvantage (assuming SHIFT is not held)
				// If we have a cached d20mod value, use it
				if (entry.d20mod != null) entry.toRoll = `2d20dh1${entry.d20mod}`;
				else entry.toRoll = entry.toRoll.replace(/^\s*1?\s*d\s*20/, "2d20dh1");
			} else out.rollCount = 2; // otherwise, just roll twice
		}

		return out;
	},
	// endregion

	/**
	 * Parse and roll a string, and display the result in the roll box.
	 * Returns the total rolled, if available.
	 * @param str
	 * @param rolledBy
	 * @param rolledBy.isUser
	 * @param rolledBy.name The name of the roller.
	 * @param rolledBy.label The label for this roll.
	 * @param [opts] Options object.
	 * @param [opts.isResultUsed] If an input box should be provided for the user to enter the result (manual mode only).
	 */
	async pRoll2 (str, rolledBy, opts) {
		opts = opts || {};
		str = str
			.trim()
			.replace(/\/r(?:oll)? /gi, "").trim() // Remove any leading "/r"s, for ease of use
		;
		if (!str) return;
		if (rolledBy.isUser) Renderer.dice._addHistory(str);

		if (str.startsWith("/")) return Renderer.dice._pHandleCommand(str, rolledBy);
		if (str.startsWith("#")) return Renderer.dice._pHandleSavedRoll(str, rolledBy, opts);

		const [head, ...tail] = str.split(":");
		if (tail.length) {
			str = tail.join(":");
			rolledBy.label = head;
		}
		const wrpTree = Renderer.dice.lang.getTree3(str);
		if (!wrpTree) return Renderer.dice._SYMBOL_PARSE_FAILED;
		return Renderer.dice._pHandleRoll2(wrpTree, rolledBy, opts);
	},

	/**
	 * Parse and roll an entry, and display the result in the roll box.
	 * Returns the total rolled, if available.
	 * @param entry
	 * @param rolledBy
	 * @param [opts] Options object.
	 * @param [opts.isResultUsed] If an input box should be provided for the user to enter the result (manual mode only).
	 * @param [opts.rollCount]
	 * @param [opts.additionalData]
	 * @param [opts.isHidden] If the result should not be posted to the rollbox.
	 */
	async pRollEntry (entry, rolledBy, opts) {
		opts = opts || {};

		const rollCount = Math.round(opts.rollCount || 1);
		delete opts.rollCount;
		if (rollCount <= 0) throw new Error(`Invalid roll count: ${rollCount} (must be a positive integer)`);

		const wrpTree = Renderer.dice.lang.getTree3(entry.toRoll);
		wrpTree.tree.successThresh = entry.successThresh;
		wrpTree.tree.successMax = entry.successMax;
		wrpTree.tree.chanceSuccessText = entry.chanceSuccessText;
		wrpTree.tree.chanceFailureText = entry.chanceFailureText;
		wrpTree.tree.isColorSuccessFail = entry.isColorSuccessFail;

		// arbitrarily return the result of the highest roll if we roll multiple times
		const results = [];
		if (rollCount > 1 && !opts.isHidden) Renderer.dice._showMessage(`Rolling twice...`, rolledBy);
		for (let i = 0; i < rollCount; ++i) {
			const result = await Renderer.dice._pHandleRoll2(wrpTree, rolledBy, opts);
			if (result == null) return null;
			results.push(result);
		}
		return Math.max(...results);
	},

	/**
	 * @param wrpTree
	 * @param rolledBy
	 * @param [opts] Options object.
	 * @param [opts.fnGetMessage]
	 * @param [opts.isResultUsed]
	 * @param [opts.additionalData]
	 */
	async _pHandleRoll2 (wrpTree, rolledBy, opts) {
		opts = {...opts};

		if (wrpTree.meta && wrpTree.meta.hasPb) {
			const userPb = await InputUiUtil.pGetUserNumber({
				min: 0,
				int: true,
				title: "Enter Proficiency Bonus",
				default: 2,
				storageKey_default: "dice.playerProficiencyBonus",
				isGlobal_default: true,
			});
			if (userPb == null) return null;
			opts.pb = userPb;
		}

		if (wrpTree.meta && wrpTree.meta.hasSummonSpellLevel) {
			const predefinedSpellLevel = opts.additionalData?.summonedBySpellLevel != null && !isNaN(opts.additionalData?.summonedBySpellLevel)
				? Number(opts.additionalData.summonedBySpellLevel)
				: null;

			const userSummonSpellLevel = await InputUiUtil.pGetUserNumber({
				min: predefinedSpellLevel ?? 0,
				int: true,
				title: "Enter Spell Level",
				default: predefinedSpellLevel ?? 1,
			});
			if (userSummonSpellLevel == null) return null;
			opts.summonSpellLevel = userSummonSpellLevel;
		}

		if (wrpTree.meta && wrpTree.meta.hasSummonClassLevel) {
			const predefinedClassLevel = opts.additionalData?.summonedByClassLevel != null && !isNaN(opts.additionalData?.summonedByClassLevel)
				? Number(opts.additionalData.summonedByClassLevel)
				: null;

			const userSummonClassLevel = await InputUiUtil.pGetUserNumber({
				min: predefinedClassLevel ?? 0,
				int: true,
				title: "Enter Class Level",
				default: predefinedClassLevel ?? 1,
			});
			if (userSummonClassLevel == null) return null;
			opts.summonClassLevel = userSummonClassLevel;
		}

		if (Renderer.dice._isManualMode) return Renderer.dice._pHandleRoll2_manual(wrpTree.tree, rolledBy, opts);
		else return Renderer.dice._pHandleRoll2_automatic(wrpTree.tree, rolledBy, opts);
	},

	/**
	 * @param tree
	 * @param rolledBy
	 * @param [opts] Options object.
	 * @param [opts.fnGetMessage]
	 * @param [opts.pb] User-entered proficiency bonus, to be propagated to the meta.
	 * @param [opts.summonSpellLevel] User-entered summon spell level, to be propagated to the meta.
	 * @param [opts.summonClassLevel] User-entered summon class level, to be propagated to the meta.
	 * @param [opts.target] Generic target number (e.g. save DC, AC) to meet/beat.
	 * @param [opts.isHidden] If the result should not be posted to the rollbox.
	 */
	_pHandleRoll2_automatic (tree, rolledBy, opts) {
		opts = opts || {};

		if (!opts.isHidden) Renderer.dice._showBox();
		Renderer.dice._checkHandleName(rolledBy.name);
		const eleOut = Renderer.dice._eleLastRolledBy;

		if (tree) {
			const meta = {};
			if (opts.pb) meta.pb = opts.pb;
			if (opts.summonSpellLevel) meta.summonSpellLevel = opts.summonSpellLevel;
			if (opts.summonClassLevel) meta.summonClassLevel = opts.summonClassLevel;

			const result = tree.evl(meta);
			const fullHtml = (meta.html || []).join("");
			const allMax = meta.allMax && meta.allMax.length && !(meta.allMax.filter(it => !it).length);
			const allMin = meta.allMin && meta.allMin.length && !(meta.allMin.filter(it => !it).length);

			const lbl = rolledBy.label && (!rolledBy.name || rolledBy.label.trim().toLowerCase() !== rolledBy.name.trim().toLowerCase()) ? rolledBy.label : null;

			const ptTarget = opts.target != null
				? result >= opts.target ? ` <b>&geq;${opts.target}</b>` : ` <span class="ve-muted">&lt;${opts.target}</span>`
				: "";

			const isThreshSuccess = tree.successThresh != null && result > (tree.successMax || 100) - tree.successThresh;
			const isColorSuccess = tree.isColorSuccessFail || !tree.chanceSuccessText;
			const isColorFail = tree.isColorSuccessFail || !tree.chanceFailureText;
			const totalPart = tree.successThresh != null
				? `<span class="roll ${isThreshSuccess && isColorSuccess ? "roll-max" : !isThreshSuccess && isColorFail ? "roll-min" : ""}">${isThreshSuccess ? Renderer.get().render(tree.chanceSuccessText || "Success!") : Renderer.get().render(tree.chanceFailureText || "Failure")}</span>`
				: `<span class="roll ${allMax ? "roll-max" : allMin ? "roll-min" : ""}">${result}</span>`;

			const title = `${rolledBy.name ? `${rolledBy.name} \u2014 ` : ""}${lbl ? `${lbl}: ` : ""}${tree}`;

			const message = opts.fnGetMessage ? opts.fnGetMessage(result) : null;
			ExtensionUtil.doSendRoll({
				dice: tree.toString(),
				result,
				rolledBy: rolledBy.name,
				label: [lbl, message].filter(Boolean).join(" \u2013 "),
			});

			if (!opts.isHidden) {
				const btnCopyToInput = ee`<button title="Copy to Input" class="ve-btn ve-btn-default ve-btn-xs ve-btn-copy-roll"><span class="glyphicon glyphicon-pencil"></span></button>`
					.onn("click", () => {
						Renderer.dice._iptRoll
							.val(tree.toString().replace(/s+/g, ""))
							.focuse();
					});

				ee`<div class="out-roll-item" title="${title}">
					<div>
						${lbl ? `<span class="roll-label">${lbl}: </span>` : ""}
						${totalPart}
						${ptTarget}
						<span class="all-rolls ve-muted">${fullHtml}</span>
						${message ? `<span class="message">${message}</span>` : ""}
					</div>
					<div class="out-roll-item-button-wrp">${btnCopyToInput}</div>
				</div>`
					.appendTo(eleOut);

				Renderer.dice._scrollBottom();
			}

			return result;
		} else {
			if (!opts.isHidden) {
				eleOut.appends(`<div class="out-roll-item">Invalid input! Try &quot;/help&quot;</div>`);
				Renderer.dice._scrollBottom();
			}
			return null;
		}
	},

	_pHandleRoll2_manual (tree, rolledBy, opts) {
		opts = opts || {};

		if (!tree) return JqueryUtil.doToast({type: "danger", content: `Invalid roll input!`});

		const title = (rolledBy.label || "").toTitleCase() || "Roll Dice";
		const dispDice = ee`<div class="p-2 bold ve-flex-vh-center rll__prompt-header">${tree.toString()}</div>`;
		if (opts.isResultUsed) {
			return InputUiUtil.pGetUserNumber({
				title,
				elePre: dispDice,
			});
		} else {
			const {eleModalInner} = UiUtil.getShowModal({
				title,
				isMinHeight0: true,
			});
			dispDice.appendTo(eleModalInner);
			return null;
		}
	},

	_showMessage (message, rolledBy) {
		Renderer.dice._showBox();
		Renderer.dice._checkHandleName(rolledBy.name);
		const eleOut = Renderer.dice._eleLastRolledBy;
		eleOut.appends(`<div class="out-roll-item out-roll-item--message">${message}</div>`);
		Renderer.dice._scrollBottom();
	},

	_showInvalid () {
		Renderer.dice._showMessage("Invalid input! Try &quot;/help&quot;", Renderer.dice.SYSTEM_USER);
	},

	_validCommands: new Set(["/c", "/cls", "/clear", "/iterroll"]),
	async _pHandleCommand (com, rolledBy) {
		Renderer.dice._showMessage(`<span class="out-roll-item-code">${com}</span>`, rolledBy); // parrot the user's command back to them

		const comParsed = Renderer.dice._getParsedCommand(com);
		const [comOp] = comParsed;

		if (comOp === "/help" || comOp === "/h") {
			Renderer.dice._showMessage(
				`<ul class="rll__list">
					<li>Keep highest; <span class="out-roll-item-code">4d6kh3</span></li>
					<li>Drop lowest; <span class="out-roll-item-code">4d6dl1</span></li>
					<li>Drop highest; <span class="out-roll-item-code">3d4dh1</span></li>
					<li>Keep lowest; <span class="out-roll-item-code">3d4kl1</span></li>

					<li>Reroll equal; <span class="out-roll-item-code">2d4r1</span></li>
					<li>Reroll less; <span class="out-roll-item-code">2d4r&lt;2</span></li>
					<li>Reroll less or equal; <span class="out-roll-item-code">2d4r&lt;=2</span></li>
					<li>Reroll greater; <span class="out-roll-item-code">2d4r&gt;2</span></li>
					<li>Reroll greater equal; <span class="out-roll-item-code">2d4r&gt;=3</span></li>

					<li>Explode equal; <span class="out-roll-item-code">2d4x4</span></li>
					<li>Explode less; <span class="out-roll-item-code">2d4x&lt;2</span></li>
					<li>Explode less or equal; <span class="out-roll-item-code">2d4x&lt;=2</span></li>
					<li>Explode greater; <span class="out-roll-item-code">2d4x&gt;2</span></li>
					<li>Explode greater equal; <span class="out-roll-item-code">2d4x&gt;=3</span></li>

					<li>Count Successes equal; <span class="out-roll-item-code">2d4cs=4</span></li>
					<li>Count Successes less; <span class="out-roll-item-code">2d4cs&lt;2</span></li>
					<li>Count Successes less or equal; <span class="out-roll-item-code">2d4cs&lt;=2</span></li>
					<li>Count Successes greater; <span class="out-roll-item-code">2d4cs&gt;2</span></li>
					<li>Count Successes greater equal; <span class="out-roll-item-code">2d4cs&gt;=3</span></li>

					<li>Margin of Success; <span class="out-roll-item-code">2d4ms=4</span></li>

					<li>Dice pools; <span class="out-roll-item-code">{2d8, 1d6}</span></li>
					<li>Dice pools with modifiers; <span class="out-roll-item-code">{1d20+7, 10}kh1</span></li>

					<li>Rounding; <span class="out-roll-item-code">floor(1.5)</span>, <span class="out-roll-item-code">ceil(1.5)</span>, <span class="out-roll-item-code">round(1.5)</span></li>

					<li>Average; <span class="out-roll-item-code">avg(8d6)</span></li>
					<li>Maximize dice; <span class="out-roll-item-code">dmax(8d6)</span></li>
					<li>Minimize dice; <span class="out-roll-item-code">dmin(8d6)</span></li>

					<li>Other functions; <span class="out-roll-item-code">sign(1d6-3)</span>, <span class="out-roll-item-code">abs(1d6-3)</span>, ...etc.</li>
				</ul>
				Up and down arrow keys cycle input history.<br>
				Anything before a colon is treated as a label (<span class="out-roll-item-code">Fireball: 8d6</span>)<br>
Use <span class="out-roll-item-code">/macro list</span> to list saved macros.<br>
				Use <span class="out-roll-item-code">/macro add myName 1d2+3</span> to add (or update) a macro. Macro names should not contain spaces or hashes.<br>
				Use <span class="out-roll-item-code">/macro remove myName</span> to remove a macro.<br>
				Use <span class="out-roll-item-code">#myName</span> to roll a macro.<br>
				Use <span class="out-roll-item-code">/iterroll roll count [target]</span> to roll multiple times, optionally against a target.
				Use <span class="out-roll-item-code">/clear</span> to clear the roller.`,
				Renderer.dice.SYSTEM_USER,
			);
			return;
		}

		if (comOp === "/macro") {
			const [, mode, ...others] = comParsed;

			if (!["list", "add", "remove", "clear"].includes(mode)) Renderer.dice._showInvalid();
			else {
				switch (mode) {
					case "list":
						if (!others.length) {
							Object.keys(Renderer.dice.storage).forEach(name => {
								Renderer.dice._showMessage(`<span class="out-roll-item-code">#${name}</span> \u2014 ${Renderer.dice.storage[name]}`, Renderer.dice.SYSTEM_USER);
							});
						} else {
							Renderer.dice._showInvalid();
						}
						break;
					case "add": {
						if (others.length === 2) {
							const [name, macro] = others;
							if (name.includes(" ") || name.includes("#")) Renderer.dice._showInvalid();
							else {
								Renderer.dice.storage[name] = macro;
								await Renderer.dice._pSaveMacros();
								Renderer.dice._showMessage(`Saved macro <span class="out-roll-item-code">#${name}</span>`, Renderer.dice.SYSTEM_USER);
							}
						} else {
							Renderer.dice._showInvalid();
						}
						break;
					}
					case "remove":
						if (others.length === 1) {
							if (Renderer.dice.storage[others[0]]) {
								delete Renderer.dice.storage[others[0]];
								await Renderer.dice._pSaveMacros();
								Renderer.dice._showMessage(`Removed macro <span class="out-roll-item-code">#${others[0]}</span>`, Renderer.dice.SYSTEM_USER);
							} else {
								Renderer.dice._showMessage(`Macro <span class="out-roll-item-code">#${others[0]}</span> not found`, Renderer.dice.SYSTEM_USER);
							}
						} else {
							Renderer.dice._showInvalid();
						}
						break;
				}
			}
			return;
		}

		if (Renderer.dice._validCommands.has(comOp)) {
			switch (comOp) {
				case "/c":
				case "/cls":
				case "/clear":
					Renderer.dice._eleOutRoll.empty();
					Renderer.dice._eleLastRolledBy.empty();
					Renderer.dice._eleLastRolledBy = null;
					return;

				case "/iterroll": {
					let [, exp, count, target] = comParsed;

					if (!exp) return Renderer.dice._showInvalid();
					const wrpTree = Renderer.dice.lang.getTree3(exp);
					if (!wrpTree) return Renderer.dice._showInvalid();

					count = count && !isNaN(count) ? Number(count) : 1;
					target = target && !isNaN(target) ? Number(target) : undefined;

					for (let i = 0; i < count; ++i) {
						await Renderer.dice.pRoll2(
							exp,
							{
								name: "Anon",
							},
							{
								target,
							},
						);
					}
				}
			}
			return;
		}

		Renderer.dice._showInvalid();
	},

	async _pSaveMacros () {
		await StorageUtil.pSet(VeCt.STORAGE_ROLLER_MACRO, Renderer.dice.storage);
	},

	_getParsedCommand (str) {
		// TODO(Future) this is probably too naive
		return str.split(/\s+/);
	},

	_pHandleSavedRoll (id, rolledBy, opts) {
		id = id.replace(/^#/, "");
		const macro = Renderer.dice.storage[id];
		if (macro) {
			rolledBy.label = id;
			const wrpTree = Renderer.dice.lang.getTree3(macro);
			return Renderer.dice._pHandleRoll2(wrpTree, rolledBy, opts);
		} else Renderer.dice._showMessage(`Macro <span class="out-roll-item-code">#${id}</span> not found`, Renderer.dice.SYSTEM_USER);
	},

	addRoll ({rolledBy, html, ele}) {
		if ([html, ele].filter(Boolean).length !== 1) throw new Error(`Must specify one of html or ele!`);

		if (html != null && !html.trim()) return;

		Renderer.dice._showBox();
		Renderer.dice._checkHandleName(rolledBy.name);

		if (html) {
			Renderer.dice._eleLastRolledBy.appends(`<div class="out-roll-item" title="${(rolledBy.name || "").qq()}">${html}</div>`);
		} else {
			ee`<div class="out-roll-item" title="${(rolledBy.name || "").qq()}">${ele}</div>`
				.appendTo(Renderer.dice._eleLastRolledBy);
		}

		Renderer.dice._scrollBottom();
	},

	addElement ({rolledBy, html, ele}) {
		if (html && ele) throw new Error(`Must specify one of html or ele!`);

		if (html != null && !html.trim()) return;

		Renderer.dice._showBox();
		Renderer.dice._checkHandleName(rolledBy.name);

		if (html) {
			Renderer.dice._eleLastRolledBy.appends(`<div class="out-roll-item out-roll-item--message" title="${(rolledBy.name || "").qq()}">${html}</div>`);
		} else {
			ee`<div class="out-roll-item out-roll-item--message" title="${(rolledBy.name || "").qq()}">${ele}</div>`
				.appendTo(Renderer.dice._eleLastRolledBy);
		}

		Renderer.dice._scrollBottom();
	},

	_checkHandleName (name) {
		if (!Renderer.dice._eleLastRolledBy || Renderer.dice._eleLastRolledBy.attr("data-rollbox-last-rolled-by-name") !== name) {
			Renderer.dice._eleOutRoll.prepends(`<div class="ve-muted out-roll-id">${name}</div>`);
			Renderer.dice._eleLastRolledBy = ee`<div class="out-roll-wrp" data-rollbox-last-rolled-by-name="${name.qq()}"></div>`;
			Renderer.dice._eleOutRoll.prepends(Renderer.dice._eleLastRolledBy);
		}
	},
};

Renderer.dice.util = {
	getReducedMeta (meta) {
		return {
			pb: meta.pb,
			summonSpellLevel: meta.summonSpellLevel,
			summonClassLevel: meta.summonClassLevel,
		};
	},
};

Renderer.dice.lang = {
	// region Public API
	validate3 (str) {
		str = str.trim();

		// region Lexing
		let lexed;
		try {
			lexed = Renderer.dice.lang._lex3(str).lexed;
		} catch (e) {
			return e.message;
		}
		// endregion

		// region Parsing
		try {
			Renderer.dice.lang._parse3(lexed);
		} catch (e) {
			return e.message;
		}
		// endregion

		return null;
	},

	getTree3 (str, isSilent = true) {
		str = str.trim();
		if (isSilent) {
			try {
				const {lexed, lexedMeta} = Renderer.dice.lang._lex3(str);
				return {tree: Renderer.dice.lang._parse3(lexed), meta: lexedMeta};
			} catch (e) {
				return null;
			}
		} else {
			const {lexed, lexedMeta} = Renderer.dice.lang._lex3(str);
			return {tree: Renderer.dice.lang._parse3(lexed), meta: lexedMeta};
		}
	},
	// endregion

	// region Lexer
	_M_NUMBER_CHAR: /[0-9.]/,
	_M_SYMBOL_CHAR: /[-+/*^=><florceidhkxunavgsmpbtqw,]/,

	_M_NUMBER: /^[\d.,]+$/,
	_lex3 (str) {
		const self = {
			tokenStack: [],
			parenCount: 0,
			braceCount: 0,
			mode: null,
			token: "",
			hasPb: false,
			hasSummonSpellLevel: false,
			hasSummonClassLevel: false,
		};

		str = str
			.trim()
			.replace(/\bPBd(?=\d)/g, "(PB)d") // Convert case-sensitive leading PB
			.toLowerCase()
			// region Convert some natural language
			.replace(/\s*?\bplus\b\s*?/g, " + ")
			.replace(/\s*?\bminus\b\s*?/g, " - ")
			.replace(/\s*?\btimes\b\s*?/g, " * ")
			.replace(/\s*?\bover\b\s*?/g, " / ")
			.replace(/\s*?\bdivided by\b\s*?/g, " / ")
			// endregion
			.replace(/\s+/g, "")
			.replace(/[\u2012-\u2014\u2212]/g, "-") // convert dashes
			.replace(/[×]/g, "*") // convert mult signs
			.replace(/\*\*/g, "^") // convert ** to ^
			.replace(/÷/g, "/") // convert div signs
			.replace(/--/g, "+") // convert double negatives
			.replace(/\+-|-\+/g, "-") // convert negatives
		;

		if (!str) return {lexed: [], lexedMeta: {}};

		this._lex3_lex(self, str);

		return {lexed: self.tokenStack, lexedMeta: {hasPb: self.hasPb, hasSummonSpellLevel: self.hasSummonSpellLevel, hasSummonClassLevel: self.hasSummonClassLevel}};
	},

	_lex3_lex (self, l) {
		const len = l.length;

		for (let i = 0; i < len; ++i) {
			const c = l[i];

			switch (c) {
				case "(":
					self.parenCount++;
					this._lex3_outputToken(self);
					self.token = "(";
					this._lex3_outputToken(self);
					break;
				case ")":
					self.parenCount--;
					if (self.parenCount < 0) throw new Error(`Syntax error: closing <code>)</code> without opening <code>(</code>`);
					this._lex3_outputToken(self);
					self.token = ")";
					this._lex3_outputToken(self);
					break;
				case "{":
					self.braceCount++;
					this._lex3_outputToken(self);
					self.token = "{";
					this._lex3_outputToken(self);
					break;
				case "}":
					self.braceCount--;
					if (self.parenCount < 0) throw new Error(`Syntax error: closing <code>}</code> without opening <code>(</code>`);
					this._lex3_outputToken(self);
					self.token = "}";
					this._lex3_outputToken(self);
					break;
				// single-character operators
				case "+": case "-": case "*": case "/": case "^": case ",":
					this._lex3_outputToken(self);
					self.token += c;
					this._lex3_outputToken(self);
					break;
				default: {
					if (Renderer.dice.lang._M_NUMBER_CHAR.test(c)) {
						if (self.mode === "symbol") this._lex3_outputToken(self);
						self.token += c;
						self.mode = "text";
					} else if (Renderer.dice.lang._M_SYMBOL_CHAR.test(c)) {
						if (self.mode === "text") this._lex3_outputToken(self);
						self.token += c;
						self.mode = "symbol";
					} else throw new Error(`Syntax error: unexpected character <code>${c}</code>`);
					break;
				}
			}
		}

		// empty the stack of any remaining content
		this._lex3_outputToken(self);
	},

	_lex3_outputToken (self) {
		if (!self.token) return;

		switch (self.token) {
			case "(": self.tokenStack.push(Renderer.dice.tk.PAREN_OPEN); break;
			case ")": self.tokenStack.push(Renderer.dice.tk.PAREN_CLOSE); break;
			case "{": self.tokenStack.push(Renderer.dice.tk.BRACE_OPEN); break;
			case "}": self.tokenStack.push(Renderer.dice.tk.BRACE_CLOSE); break;
			case ",": self.tokenStack.push(Renderer.dice.tk.COMMA); break;
			case "+": self.tokenStack.push(Renderer.dice.tk.ADD); break;
			case "-": self.tokenStack.push(Renderer.dice.tk.SUB); break;
			case "*": self.tokenStack.push(Renderer.dice.tk.MULT); break;
			case "/": self.tokenStack.push(Renderer.dice.tk.DIV); break;
			case "^": self.tokenStack.push(Renderer.dice.tk.POW); break;
			case "pb": self.tokenStack.push(Renderer.dice.tk.PB); self.hasPb = true; break;
			case "summonspelllevel": self.tokenStack.push(Renderer.dice.tk.SUMMON_SPELL_LEVEL); self.hasSummonSpellLevel = true; break;
			case "summonclasslevel": self.tokenStack.push(Renderer.dice.tk.SUMMON_CLASS_LEVEL); self.hasSummonClassLevel = true; break;
			case "floor": self.tokenStack.push(Renderer.dice.tk.FLOOR); break;
			case "ceil": self.tokenStack.push(Renderer.dice.tk.CEIL); break;
			case "round": self.tokenStack.push(Renderer.dice.tk.ROUND); break;
			case "avg": self.tokenStack.push(Renderer.dice.tk.AVERAGE); break;
			case "dmax": self.tokenStack.push(Renderer.dice.tk.DMAX); break;
			case "dmin": self.tokenStack.push(Renderer.dice.tk.DMIN); break;
			case "sign": self.tokenStack.push(Renderer.dice.tk.SIGN); break;
			case "abs": self.tokenStack.push(Renderer.dice.tk.ABS); break;
			case "cbrt": self.tokenStack.push(Renderer.dice.tk.CBRT); break;
			case "sqrt": self.tokenStack.push(Renderer.dice.tk.SQRT); break;
			case "exp": self.tokenStack.push(Renderer.dice.tk.EXP); break;
			case "log": self.tokenStack.push(Renderer.dice.tk.LOG); break;
			case "random": self.tokenStack.push(Renderer.dice.tk.RANDOM); break;
			case "trunc": self.tokenStack.push(Renderer.dice.tk.TRUNC); break;
			case "pow": self.tokenStack.push(Renderer.dice.tk.POW); break;
			case "max": self.tokenStack.push(Renderer.dice.tk.MAX); break;
			case "min": self.tokenStack.push(Renderer.dice.tk.MIN); break;
			case "d": self.tokenStack.push(Renderer.dice.tk.DICE); break;
			case "dh": self.tokenStack.push(Renderer.dice.tk.DROP_HIGHEST); break;
			case "kh": self.tokenStack.push(Renderer.dice.tk.KEEP_HIGHEST); break;
			case "dl": self.tokenStack.push(Renderer.dice.tk.DROP_LOWEST); break;
			case "kl": self.tokenStack.push(Renderer.dice.tk.KEEP_LOWEST); break;
			case "r": self.tokenStack.push(Renderer.dice.tk.REROLL_EXACT); break;
			case "r>": self.tokenStack.push(Renderer.dice.tk.REROLL_GT); break;
			case "r>=": self.tokenStack.push(Renderer.dice.tk.REROLL_GTEQ); break;
			case "r<": self.tokenStack.push(Renderer.dice.tk.REROLL_LT); break;
			case "r<=": self.tokenStack.push(Renderer.dice.tk.REROLL_LTEQ); break;
			case "x": self.tokenStack.push(Renderer.dice.tk.EXPLODE_EXACT); break;
			case "x>": self.tokenStack.push(Renderer.dice.tk.EXPLODE_GT); break;
			case "x>=": self.tokenStack.push(Renderer.dice.tk.EXPLODE_GTEQ); break;
			case "x<": self.tokenStack.push(Renderer.dice.tk.EXPLODE_LT); break;
			case "x<=": self.tokenStack.push(Renderer.dice.tk.EXPLODE_LTEQ); break;
			case "cs=": self.tokenStack.push(Renderer.dice.tk.COUNT_SUCCESS_EXACT); break;
			case "cs>": self.tokenStack.push(Renderer.dice.tk.COUNT_SUCCESS_GT); break;
			case "cs>=": self.tokenStack.push(Renderer.dice.tk.COUNT_SUCCESS_GTEQ); break;
			case "cs<": self.tokenStack.push(Renderer.dice.tk.COUNT_SUCCESS_LT); break;
			case "cs<=": self.tokenStack.push(Renderer.dice.tk.COUNT_SUCCESS_LTEQ); break;
			case "ms=": self.tokenStack.push(Renderer.dice.tk.MARGIN_SUCCESS_EXACT); break;
			case "ms>": self.tokenStack.push(Renderer.dice.tk.MARGIN_SUCCESS_GT); break;
			case "ms>=": self.tokenStack.push(Renderer.dice.tk.MARGIN_SUCCESS_GTEQ); break;
			case "ms<": self.tokenStack.push(Renderer.dice.tk.MARGIN_SUCCESS_LT); break;
			case "ms<=": self.tokenStack.push(Renderer.dice.tk.MARGIN_SUCCESS_LTEQ); break;
			default: {
				if (Renderer.dice.lang._M_NUMBER.test(self.token)) {
					if (self.token.split(Parser._decimalSeparator).length > 2) throw new Error(`Syntax error: too many decimal separators <code>${self.token}</code>`);
					self.tokenStack.push(Renderer.dice.tk.NUMBER(self.token));
				} else throw new Error(`Syntax error: unexpected token <code>${self.token}</code>`);
			}
		}

		self.token = "";
	},
	// endregion

	// region Parser
	_parse3 (lexed) {
		const self = {
			ixSym: -1,
			syms: lexed,
			sym: null,
			lastAccepted: null,
			// Workaround for comma-separated numbers--if we're e.g. inside a dice pool, treat the commas as dice pool
			//   separators. Otherwise, merge together adjacent numbers, to convert e.g. "1,000,000" to "1000000".
			isIgnoreCommas: true,
		};

		this._parse3_nextSym(self);
		return this._parse3_expression(self);
	},

	_parse3_nextSym (self) {
		const cur = self.syms[self.ixSym];
		self.ixSym++;
		self.sym = self.syms[self.ixSym];
		return cur;
	},

	_parse3_match (self, symbol) {
		if (self.sym == null) return false;
		if (symbol.type) symbol = symbol.type; // If it's a typed token, convert it to its underlying type
		return self.sym.type === symbol;
	},

	_parse3_accept (self, symbol) {
		if (this._parse3_match(self, symbol)) {
			const out = self.sym;
			this._parse3_nextSym(self);
			self.lastAccepted = out;
			return out;
		}
		return false;
	},

	_parse3_expect (self, symbol) {
		const accepted = this._parse3_accept(self, symbol);
		if (accepted) return accepted;
		if (self.sym) throw new Error(`Unexpected input: Expected <code>${symbol}</code> but found <code>${self.sym}</code>`);
		else throw new Error(`Unexpected end of input: Expected <code>${symbol}</code>`);
	},

	_parse3_factor (self, {isSilent = false} = {}) {
		if (this._parse3_accept(self, Renderer.dice.tk.TYP_NUMBER)) {
			// Workaround for comma-separated numbers
			if (self.isIgnoreCommas) {
				// Combine comma-separated parts
				const syms = [self.lastAccepted];
				while (this._parse3_accept(self, Renderer.dice.tk.COMMA)) {
					const sym = this._parse3_expect(self, Renderer.dice.tk.TYP_NUMBER);
					syms.push(sym);
				}
				const sym = Renderer.dice.tk.NUMBER(syms.map(it => it.value).join(""));
				return new Renderer.dice.parsed.Factor(sym);
			}

			return new Renderer.dice.parsed.Factor(self.lastAccepted);
		} else if (this._parse3_accept(self, Renderer.dice.tk.PB)) {
			return new Renderer.dice.parsed.Factor(Renderer.dice.tk.PB);
		} else if (this._parse3_accept(self, Renderer.dice.tk.SUMMON_SPELL_LEVEL)) {
			return new Renderer.dice.parsed.Factor(Renderer.dice.tk.SUMMON_SPELL_LEVEL);
		} else if (this._parse3_accept(self, Renderer.dice.tk.SUMMON_CLASS_LEVEL)) {
			return new Renderer.dice.parsed.Factor(Renderer.dice.tk.SUMMON_CLASS_LEVEL);
		} else if (
			// Single-arg functions
			this._parse3_match(self, Renderer.dice.tk.FLOOR)
			|| this._parse3_match(self, Renderer.dice.tk.CEIL)
			|| this._parse3_match(self, Renderer.dice.tk.ROUND)
			|| this._parse3_match(self, Renderer.dice.tk.AVERAGE)
			|| this._parse3_match(self, Renderer.dice.tk.DMAX)
			|| this._parse3_match(self, Renderer.dice.tk.DMIN)
			|| this._parse3_match(self, Renderer.dice.tk.SIGN)
			|| this._parse3_match(self, Renderer.dice.tk.ABS)
			|| this._parse3_match(self, Renderer.dice.tk.CBRT)
			|| this._parse3_match(self, Renderer.dice.tk.SQRT)
			|| this._parse3_match(self, Renderer.dice.tk.EXP)
			|| this._parse3_match(self, Renderer.dice.tk.LOG)
			|| this._parse3_match(self, Renderer.dice.tk.RANDOM)
			|| this._parse3_match(self, Renderer.dice.tk.TRUNC)
		) {
			const children = [];

			children.push(this._parse3_nextSym(self));
			this._parse3_expect(self, Renderer.dice.tk.PAREN_OPEN);
			children.push(this._parse3_expression(self));
			this._parse3_expect(self, Renderer.dice.tk.PAREN_CLOSE);

			return new Renderer.dice.parsed.Function(children);
		} else if (
			// 2-arg functions
			this._parse3_match(self, Renderer.dice.tk.POW)
		) {
			self.isIgnoreCommas = false;

			const children = [];

			children.push(this._parse3_nextSym(self));
			this._parse3_expect(self, Renderer.dice.tk.PAREN_OPEN);
			children.push(this._parse3_expression(self));
			this._parse3_expect(self, Renderer.dice.tk.COMMA);
			children.push(this._parse3_expression(self));
			this._parse3_expect(self, Renderer.dice.tk.PAREN_CLOSE);

			self.isIgnoreCommas = true;

			return new Renderer.dice.parsed.Function(children);
		} else if (
			// N-arg functions
			this._parse3_match(self, Renderer.dice.tk.MAX)
			|| this._parse3_match(self, Renderer.dice.tk.MIN)
		) {
			self.isIgnoreCommas = false;

			const children = [];

			children.push(this._parse3_nextSym(self));
			this._parse3_expect(self, Renderer.dice.tk.PAREN_OPEN);
			children.push(this._parse3_expression(self));
			while (this._parse3_accept(self, Renderer.dice.tk.COMMA)) children.push(this._parse3_expression(self));
			this._parse3_expect(self, Renderer.dice.tk.PAREN_CLOSE);

			self.isIgnoreCommas = true;

			return new Renderer.dice.parsed.Function(children);
		} else if (this._parse3_accept(self, Renderer.dice.tk.PAREN_OPEN)) {
			const exp = this._parse3_expression(self);
			this._parse3_expect(self, Renderer.dice.tk.PAREN_CLOSE);
			return new Renderer.dice.parsed.Factor(exp, {hasParens: true});
		} else if (this._parse3_accept(self, Renderer.dice.tk.BRACE_OPEN)) {
			self.isIgnoreCommas = false;

			const children = [];

			children.push(this._parse3_expression(self));
			while (this._parse3_accept(self, Renderer.dice.tk.COMMA)) children.push(this._parse3_expression(self));

			this._parse3_expect(self, Renderer.dice.tk.BRACE_CLOSE);

			self.isIgnoreCommas = true;

			const modPart = [];
			this._parse3__dice_modifiers(self, modPart);

			return new Renderer.dice.parsed.Pool(children, modPart[0]);
		} else {
			if (isSilent) return null;

			if (self.sym) throw new Error(`Unexpected input: <code>${self.sym}</code>`);
			else throw new Error(`Unexpected end of input`);
		}
	},

	_parse3_dice (self) {
		const children = [];

		// if we've omitted the X in XdY, add it here
		if (this._parse3_match(self, Renderer.dice.tk.DICE)) children.push(new Renderer.dice.parsed.Factor(Renderer.dice.tk.NUMBER(1)));
		else children.push(this._parse3_factor(self));

		while (this._parse3_match(self, Renderer.dice.tk.DICE)) {
			this._parse3_nextSym(self);
			children.push(this._parse3_factor(self));
			this._parse3__dice_modifiers(self, children);
		}
		return new Renderer.dice.parsed.Dice(children);
	},

	_parse3__dice_modifiers (self, children) { // used in both dice and dice pools
		// Collect together all dice mods
		const modsMeta = new Renderer.dice.lang.DiceModMeta();

		while (
			this._parse3_match(self, Renderer.dice.tk.DROP_HIGHEST)
			|| this._parse3_match(self, Renderer.dice.tk.KEEP_HIGHEST)
			|| this._parse3_match(self, Renderer.dice.tk.DROP_LOWEST)
			|| this._parse3_match(self, Renderer.dice.tk.KEEP_LOWEST)
			|| this._parse3_match(self, Renderer.dice.tk.REROLL_EXACT)
			|| this._parse3_match(self, Renderer.dice.tk.REROLL_GT)
			|| this._parse3_match(self, Renderer.dice.tk.REROLL_GTEQ)
			|| this._parse3_match(self, Renderer.dice.tk.REROLL_LT)
			|| this._parse3_match(self, Renderer.dice.tk.REROLL_LTEQ)
			|| this._parse3_match(self, Renderer.dice.tk.EXPLODE_EXACT)
			|| this._parse3_match(self, Renderer.dice.tk.EXPLODE_GT)
			|| this._parse3_match(self, Renderer.dice.tk.EXPLODE_GTEQ)
			|| this._parse3_match(self, Renderer.dice.tk.EXPLODE_LT)
			|| this._parse3_match(self, Renderer.dice.tk.EXPLODE_LTEQ)
			|| this._parse3_match(self, Renderer.dice.tk.COUNT_SUCCESS_EXACT)
			|| this._parse3_match(self, Renderer.dice.tk.COUNT_SUCCESS_GT)
			|| this._parse3_match(self, Renderer.dice.tk.COUNT_SUCCESS_GTEQ)
			|| this._parse3_match(self, Renderer.dice.tk.COUNT_SUCCESS_LT)
			|| this._parse3_match(self, Renderer.dice.tk.COUNT_SUCCESS_LTEQ)
			|| this._parse3_match(self, Renderer.dice.tk.MARGIN_SUCCESS_EXACT)
			|| this._parse3_match(self, Renderer.dice.tk.MARGIN_SUCCESS_GT)
			|| this._parse3_match(self, Renderer.dice.tk.MARGIN_SUCCESS_GTEQ)
			|| this._parse3_match(self, Renderer.dice.tk.MARGIN_SUCCESS_LT)
			|| this._parse3_match(self, Renderer.dice.tk.MARGIN_SUCCESS_LTEQ)
		) {
			const nxtSym = this._parse3_nextSym(self);
			const nxtFactor = this._parse3__dice_modifiers_nxtFactor(self, nxtSym);

			if (nxtSym.isSuccessMode) modsMeta.isSuccessMode = true;
			modsMeta.mods.push({modSym: nxtSym, numSym: nxtFactor});
		}

		if (modsMeta.mods.length) children.push(modsMeta);
	},

	_parse3__dice_modifiers_nxtFactor (self, nxtSym) {
		if (nxtSym.diceModifierImplicit == null) return this._parse3_factor(self, {isSilent: true});

		const fallback = new Renderer.dice.parsed.Factor(Renderer.dice.tk.NUMBER(nxtSym.diceModifierImplicit));
		if (self.sym == null) return fallback;

		const out = this._parse3_factor(self, {isSilent: true});
		if (out) return out;

		return fallback;
	},

	_parse3_exponent (self) {
		const children = [];
		children.push(this._parse3_dice(self));
		while (this._parse3_match(self, Renderer.dice.tk.POW)) {
			this._parse3_nextSym(self);
			children.push(this._parse3_dice(self));
		}
		return new Renderer.dice.parsed.Exponent(children);
	},

	_parse3_term (self) {
		const children = [];
		children.push(this._parse3_exponent(self));
		while (this._parse3_match(self, Renderer.dice.tk.MULT) || this._parse3_match(self, Renderer.dice.tk.DIV)) {
			children.push(this._parse3_nextSym(self));
			children.push(this._parse3_exponent(self));
		}
		return new Renderer.dice.parsed.Term(children);
	},

	_parse3_expression (self) {
		const children = [];
		if (this._parse3_match(self, Renderer.dice.tk.ADD) || this._parse3_match(self, Renderer.dice.tk.SUB)) children.push(this._parse3_nextSym(self));
		children.push(this._parse3_term(self));
		while (this._parse3_match(self, Renderer.dice.tk.ADD) || this._parse3_match(self, Renderer.dice.tk.SUB)) {
			children.push(this._parse3_nextSym(self));
			children.push(this._parse3_term(self));
		}
		return new Renderer.dice.parsed.Expression(children);
	},
	// endregion

	// region Utilities
	DiceModMeta: class {
		constructor () {
			this.isDiceModifierGroup = true;
			this.isSuccessMode = false;
			this.mods = [];
		}
	},
	// endregion
};

Renderer.dice.tk = {
	Token: class {
		/**
		 * @param type
		 * @param value
		 * @param asString
		 * @param [opts] Options object.
		 * @param [opts.isDiceModifier] If the token is a dice modifier, e.g. "dl"
		 * @param [opts.diceModifierImplicit] If the dice modifier has an implicit value (e.g. "kh" is shorthand for "kh1")
		 * @param [opts.isSuccessMode] If the token is a "success"-based dice modifier, e.g. "cs="
		 */
		constructor (type, value, asString, opts) {
			opts = opts || {};
			this.type = type;
			this.value = value;
			this._asString = asString;
			if (opts.isDiceModifier) this.isDiceModifier = true;
			if (opts.diceModifierImplicit) this.diceModifierImplicit = true;
			if (opts.isSuccessMode) this.isSuccessMode = true;
		}

		eq (other) { return other && other.type === this.type; }

		toString () {
			if (this._asString) return this._asString;
			return this.toDebugString();
		}

		toDebugString () { return `${this.type}${this.value ? ` :: ${this.value}` : ""}`; }
	},

	_new (type, asString, opts) { return new Renderer.dice.tk.Token(type, null, asString, opts); },

	TYP_NUMBER: "NUMBER",
	TYP_DICE: "DICE",
	TYP_SYMBOL: "SYMBOL", // Cannot be created by lexing, only parsing

	NUMBER (val) { return new Renderer.dice.tk.Token(Renderer.dice.tk.TYP_NUMBER, val); },
};
Renderer.dice.tk.PAREN_OPEN = Renderer.dice.tk._new("PAREN_OPEN", "(");
Renderer.dice.tk.PAREN_CLOSE = Renderer.dice.tk._new("PAREN_CLOSE", ")");
Renderer.dice.tk.BRACE_OPEN = Renderer.dice.tk._new("BRACE_OPEN", "{");
Renderer.dice.tk.BRACE_CLOSE = Renderer.dice.tk._new("BRACE_CLOSE", "}");
Renderer.dice.tk.COMMA = Renderer.dice.tk._new("COMMA", ",");
Renderer.dice.tk.ADD = Renderer.dice.tk._new("ADD", "+");
Renderer.dice.tk.SUB = Renderer.dice.tk._new("SUB", "-");
Renderer.dice.tk.MULT = Renderer.dice.tk._new("MULT", "*");
Renderer.dice.tk.DIV = Renderer.dice.tk._new("DIV", "/");
Renderer.dice.tk.POW = Renderer.dice.tk._new("POW", "^");
Renderer.dice.tk.PB = Renderer.dice.tk._new("PB", "pb");
Renderer.dice.tk.SUMMON_SPELL_LEVEL = Renderer.dice.tk._new("SUMMON_SPELL_LEVEL", "summonspelllevel");
Renderer.dice.tk.SUMMON_CLASS_LEVEL = Renderer.dice.tk._new("SUMMON_CLASS_LEVEL", "summonclasslevel");
Renderer.dice.tk.FLOOR = Renderer.dice.tk._new("FLOOR", "floor");
Renderer.dice.tk.CEIL = Renderer.dice.tk._new("CEIL", "ceil");
Renderer.dice.tk.ROUND = Renderer.dice.tk._new("ROUND", "round");
Renderer.dice.tk.AVERAGE = Renderer.dice.tk._new("AVERAGE", "avg");
Renderer.dice.tk.DMAX = Renderer.dice.tk._new("DMAX", "avg");
Renderer.dice.tk.DMIN = Renderer.dice.tk._new("DMIN", "avg");
Renderer.dice.tk.SIGN = Renderer.dice.tk._new("SIGN", "sign");
Renderer.dice.tk.ABS = Renderer.dice.tk._new("ABS", "abs");
Renderer.dice.tk.CBRT = Renderer.dice.tk._new("CBRT", "cbrt");
Renderer.dice.tk.SQRT = Renderer.dice.tk._new("SQRT", "sqrt");
Renderer.dice.tk.EXP = Renderer.dice.tk._new("EXP", "exp");
Renderer.dice.tk.LOG = Renderer.dice.tk._new("LOG", "log");
Renderer.dice.tk.RANDOM = Renderer.dice.tk._new("RANDOM", "random");
Renderer.dice.tk.TRUNC = Renderer.dice.tk._new("TRUNC", "trunc");
Renderer.dice.tk.POW = Renderer.dice.tk._new("POW", "pow");
Renderer.dice.tk.MAX = Renderer.dice.tk._new("MAX", "max");
Renderer.dice.tk.MIN = Renderer.dice.tk._new("MIN", "min");
Renderer.dice.tk.DICE = Renderer.dice.tk._new("DICE", "d");
Renderer.dice.tk.DROP_HIGHEST = Renderer.dice.tk._new("DH", "dh", {isDiceModifier: true, diceModifierImplicit: 1});
Renderer.dice.tk.KEEP_HIGHEST = Renderer.dice.tk._new("KH", "kh", {isDiceModifier: true, diceModifierImplicit: 1});
Renderer.dice.tk.DROP_LOWEST = Renderer.dice.tk._new("DL", "dl", {isDiceModifier: true, diceModifierImplicit: 1});
Renderer.dice.tk.KEEP_LOWEST = Renderer.dice.tk._new("KL", "kl", {isDiceModifier: true, diceModifierImplicit: 1});
Renderer.dice.tk.REROLL_EXACT = Renderer.dice.tk._new("REROLL", "r", {isDiceModifier: true});
Renderer.dice.tk.REROLL_GT = Renderer.dice.tk._new("REROLL_GT", "r>", {isDiceModifier: true});
Renderer.dice.tk.REROLL_GTEQ = Renderer.dice.tk._new("REROLL_GTEQ", "r>=", {isDiceModifier: true});
Renderer.dice.tk.REROLL_LT = Renderer.dice.tk._new("REROLL_LT", "r<", {isDiceModifier: true});
Renderer.dice.tk.REROLL_LTEQ = Renderer.dice.tk._new("REROLL_LTEQ", "r<=", {isDiceModifier: true});
Renderer.dice.tk.EXPLODE_EXACT = Renderer.dice.tk._new("EXPLODE", "x", {isDiceModifier: true});
Renderer.dice.tk.EXPLODE_GT = Renderer.dice.tk._new("EXPLODE_GT", "x>", {isDiceModifier: true});
Renderer.dice.tk.EXPLODE_GTEQ = Renderer.dice.tk._new("EXPLODE_GTEQ", "x>=", {isDiceModifier: true});
Renderer.dice.tk.EXPLODE_LT = Renderer.dice.tk._new("EXPLODE_LT", "x<", {isDiceModifier: true});
Renderer.dice.tk.EXPLODE_LTEQ = Renderer.dice.tk._new("EXPLODE_LTEQ", "x<=", {isDiceModifier: true});
Renderer.dice.tk.COUNT_SUCCESS_EXACT = Renderer.dice.tk._new("COUNT_SUCCESS_EXACT", "cs=", {isDiceModifier: true, isSuccessMode: true});
Renderer.dice.tk.COUNT_SUCCESS_GT = Renderer.dice.tk._new("COUNT_SUCCESS_GT", "cs>", {isDiceModifier: true, isSuccessMode: true});
Renderer.dice.tk.COUNT_SUCCESS_GTEQ = Renderer.dice.tk._new("COUNT_SUCCESS_GTEQ", "cs>=", {isDiceModifier: true, isSuccessMode: true});
Renderer.dice.tk.COUNT_SUCCESS_LT = Renderer.dice.tk._new("COUNT_SUCCESS_LT", "cs<", {isDiceModifier: true, isSuccessMode: true});
Renderer.dice.tk.COUNT_SUCCESS_LTEQ = Renderer.dice.tk._new("COUNT_SUCCESS_LTEQ", "cs<=", {isDiceModifier: true, isSuccessMode: true});
Renderer.dice.tk.MARGIN_SUCCESS_EXACT = Renderer.dice.tk._new("MARGIN_SUCCESS_EXACT", "ms=", {isDiceModifier: true});
Renderer.dice.tk.MARGIN_SUCCESS_GT = Renderer.dice.tk._new("MARGIN_SUCCESS_GT", "ms>", {isDiceModifier: true});
Renderer.dice.tk.MARGIN_SUCCESS_GTEQ = Renderer.dice.tk._new("MARGIN_SUCCESS_GTEQ", "ms>=", {isDiceModifier: true});
Renderer.dice.tk.MARGIN_SUCCESS_LT = Renderer.dice.tk._new("MARGIN_SUCCESS_LT", "ms<", {isDiceModifier: true});
Renderer.dice.tk.MARGIN_SUCCESS_LTEQ = Renderer.dice.tk._new("MARGIN_SUCCESS_LTEQ", "ms<=", {isDiceModifier: true});

Renderer.dice.AbstractSymbol = class {
	constructor () { this.type = Renderer.dice.tk.TYP_SYMBOL; }
	eq (symbol) { return symbol && this.type === symbol.type; }
	evl (meta) { this.meta = meta; return this._evl(meta); }
	avg (meta) { this.meta = meta; return this._avg(meta); }
	min (meta) { this.meta = meta; return this._min(meta); } // minimum value of all _rolls_, not the minimum possible result
	max (meta) { this.meta = meta; return this._max(meta); } // maximum value of all _rolls_, not the maximum possible result
	_evl () { throw new Error("Unimplemented!"); }
	_avg () { throw new Error("Unimplemented!"); }
	_min () { throw new Error("Unimplemented!"); } // minimum value of all _rolls_, not the minimum possible result
	_max () { throw new Error("Unimplemented!"); } // maximum value of all _rolls_, not the maximum possible result
	toString () { throw new Error("Unimplemented!"); }
	addToMeta (meta, {text, html = null, md = null} = {}) {
		if (!meta) return;
		html = html || text;
		md = md || text;
		(meta.html = meta.html || []).push(html);
		(meta.text = meta.text || []).push(text);
		(meta.md = meta.md || []).push(md);
	}
};

Renderer.dice.parsed = {
	_PARTITION_EQ: (r, compareTo) => r === compareTo,
	_PARTITION_GT: (r, compareTo) => r > compareTo,
	_PARTITION_GTEQ: (r, compareTo) => r >= compareTo,
	_PARTITION_LT: (r, compareTo) => r < compareTo,
	_PARTITION_LTEQ: (r, compareTo) => r <= compareTo,

	/**
	 * @param fnName
	 * @param meta
	 * @param vals
	 * @param nodeMod
	 * @param opts Options object.
	 * @param [opts.fnGetRerolls] Function which takes a set of rolls to be rerolled and generates the next set of rolls.
	 * @param [opts.fnGetExplosions] Function which takes a set of rolls to be exploded and generates the next set of rolls.
	 * @param [opts.faces]
	 */
	_handleModifiers (fnName, meta, vals, nodeMod, opts) {
		opts = opts || {};

		const displayVals = vals.slice(); // copy the array so we can sort the original

		const {mods} = nodeMod;

		for (const mod of mods) {
			vals.sort(SortUtil.ascSortProp.bind(null, "val")).reverse();
			const valsAlive = vals.filter(it => !it.isDropped);

			const modNum = mod.numSym[fnName]();

			switch (mod.modSym.type) {
				case Renderer.dice.tk.DROP_HIGHEST.type:
				case Renderer.dice.tk.KEEP_HIGHEST.type:
				case Renderer.dice.tk.DROP_LOWEST.type:
				case Renderer.dice.tk.KEEP_LOWEST.type: {
					const isHighest = mod.modSym.type.endsWith("H");

					const splitPoint = isHighest ? modNum : valsAlive.length - modNum;

					const highSlice = valsAlive.slice(0, splitPoint);
					const lowSlice = valsAlive.slice(splitPoint, valsAlive.length);

					switch (mod.modSym.type) {
						case Renderer.dice.tk.DROP_HIGHEST.type:
						case Renderer.dice.tk.KEEP_LOWEST.type:
							highSlice.forEach(val => val.isDropped = true);
							break;
						case Renderer.dice.tk.KEEP_HIGHEST.type:
						case Renderer.dice.tk.DROP_LOWEST.type:
							lowSlice.forEach(val => val.isDropped = true);
							break;
						default: throw new Error(`Unimplemented!`);
					}
					break;
				}

				case Renderer.dice.tk.REROLL_EXACT.type:
				case Renderer.dice.tk.REROLL_GT.type:
				case Renderer.dice.tk.REROLL_GTEQ.type:
				case Renderer.dice.tk.REROLL_LT.type:
				case Renderer.dice.tk.REROLL_LTEQ.type: {
					let fnPartition;
					switch (mod.modSym.type) {
						case Renderer.dice.tk.REROLL_EXACT.type: fnPartition = Renderer.dice.parsed._PARTITION_EQ; break;
						case Renderer.dice.tk.REROLL_GT.type: fnPartition = Renderer.dice.parsed._PARTITION_GT; break;
						case Renderer.dice.tk.REROLL_GTEQ.type: fnPartition = Renderer.dice.parsed._PARTITION_GTEQ; break;
						case Renderer.dice.tk.REROLL_LT.type: fnPartition = Renderer.dice.parsed._PARTITION_LT; break;
						case Renderer.dice.tk.REROLL_LTEQ.type: fnPartition = Renderer.dice.parsed._PARTITION_LTEQ; break;
						default: throw new Error(`Unimplemented!`);
					}

					const toReroll = valsAlive.filter(val => fnPartition(val.val, modNum));
					toReroll.forEach(val => val.isDropped = true);

					const nuVals = opts.fnGetRerolls(toReroll);

					vals.push(...nuVals);
					displayVals.push(...nuVals);
					break;
				}

				case Renderer.dice.tk.EXPLODE_EXACT.type:
				case Renderer.dice.tk.EXPLODE_GT.type:
				case Renderer.dice.tk.EXPLODE_GTEQ.type:
				case Renderer.dice.tk.EXPLODE_LT.type:
				case Renderer.dice.tk.EXPLODE_LTEQ.type: {
					let fnPartition;
					switch (mod.modSym.type) {
						case Renderer.dice.tk.EXPLODE_EXACT.type: fnPartition = Renderer.dice.parsed._PARTITION_EQ; break;
						case Renderer.dice.tk.EXPLODE_GT.type: fnPartition = Renderer.dice.parsed._PARTITION_GT; break;
						case Renderer.dice.tk.EXPLODE_GTEQ.type: fnPartition = Renderer.dice.parsed._PARTITION_GTEQ; break;
						case Renderer.dice.tk.EXPLODE_LT.type: fnPartition = Renderer.dice.parsed._PARTITION_LT; break;
						case Renderer.dice.tk.EXPLODE_LTEQ.type: fnPartition = Renderer.dice.parsed._PARTITION_LTEQ; break;
						default: throw new Error(`Unimplemented!`);
					}

					let tries = 999; // limit the maximum explosions to a sane amount
					let lastLen;
					let toExplodeNext = valsAlive;
					do {
						lastLen = vals.length;

						const [toExplode] = toExplodeNext.partition(roll => !roll.isExploded && fnPartition(roll.val, modNum));
						toExplode.forEach(roll => roll.isExploded = true);

						const nuVals = opts.fnGetExplosions(toExplode);

						// cache the new rolls, to improve performance over massive explosion sets
						toExplodeNext = nuVals;

						vals.push(...nuVals);
						displayVals.push(...nuVals);
					} while (tries-- > 0 && vals.length !== lastLen);

					if (!~tries) JqueryUtil.doToast({type: "warning", content: `Stopped exploding after 999 additional rolls.`});

					break;
				}

				case Renderer.dice.tk.COUNT_SUCCESS_EXACT.type:
				case Renderer.dice.tk.COUNT_SUCCESS_GT.type:
				case Renderer.dice.tk.COUNT_SUCCESS_GTEQ.type:
				case Renderer.dice.tk.COUNT_SUCCESS_LT.type:
				case Renderer.dice.tk.COUNT_SUCCESS_LTEQ.type: {
					let fnPartition;
					switch (mod.modSym.type) {
						case Renderer.dice.tk.COUNT_SUCCESS_EXACT.type: fnPartition = Renderer.dice.parsed._PARTITION_EQ; break;
						case Renderer.dice.tk.COUNT_SUCCESS_GT.type: fnPartition = Renderer.dice.parsed._PARTITION_GT; break;
						case Renderer.dice.tk.COUNT_SUCCESS_GTEQ.type: fnPartition = Renderer.dice.parsed._PARTITION_GTEQ; break;
						case Renderer.dice.tk.COUNT_SUCCESS_LT.type: fnPartition = Renderer.dice.parsed._PARTITION_LT; break;
						case Renderer.dice.tk.COUNT_SUCCESS_LTEQ.type: fnPartition = Renderer.dice.parsed._PARTITION_LTEQ; break;
						default: throw new Error(`Unimplemented!`);
					}

					const successes = valsAlive.filter(val => fnPartition(val.val, modNum));
					successes.forEach(val => val.isSuccess = true);

					break;
				}

				case Renderer.dice.tk.MARGIN_SUCCESS_EXACT.type:
				case Renderer.dice.tk.MARGIN_SUCCESS_GT.type:
				case Renderer.dice.tk.MARGIN_SUCCESS_GTEQ.type:
				case Renderer.dice.tk.MARGIN_SUCCESS_LT.type:
				case Renderer.dice.tk.MARGIN_SUCCESS_LTEQ.type: {
					const total = valsAlive.map(it => it.val).reduce((valA, valB) => valA + valB, 0);

					const subDisplayDice = displayVals.map(r => `[${Renderer.dice.parsed._rollToNumPart_html(r, opts.faces)}]`).join("+");

					let delta;
					let subDisplay;
					switch (mod.modSym.type) {
						case Renderer.dice.tk.MARGIN_SUCCESS_EXACT.type:
						case Renderer.dice.tk.MARGIN_SUCCESS_GT.type:
						case Renderer.dice.tk.MARGIN_SUCCESS_GTEQ.type: {
							delta = total - modNum;

							subDisplay = `(${subDisplayDice})-${modNum}`;

							break;
						}
						case Renderer.dice.tk.MARGIN_SUCCESS_LT.type:
						case Renderer.dice.tk.MARGIN_SUCCESS_LTEQ.type: {
							delta = modNum - total;

							subDisplay = `${modNum}-(${subDisplayDice})`;

							break;
						}
						default: throw new Error(`Unimplemented!`);
					}

					while (vals.length) {
						vals.pop();
						displayVals.pop();
					}

					vals.push({val: delta});
					displayVals.push({val: delta, htmlDisplay: subDisplay});

					break;
				}

				default: throw new Error(`Unimplemented!`);
			}
		}

		return displayVals;
	},

	_rollToNumPart_html (r, faces) {
		if (faces == null) return r.val;
		return r.val === faces ? `<span class="rll__max--muted">${r.val}</span>` : r.val === 1 ? `<span class="rll__min--muted">${r.val}</span>` : r.val;
	},

	Function: class extends Renderer.dice.AbstractSymbol {
		constructor (nodes) {
			super();
			this._nodes = nodes;
		}

		_evl (meta) { return this._invoke("evl", meta); }
		_avg (meta) { return this._invoke("avg", meta); }
		_min (meta) { return this._invoke("min", meta); }
		_max (meta) { return this._invoke("max", meta); }

		_invoke (fnName, meta) {
			const [symFunc] = this._nodes;
			switch (symFunc.type) {
				case Renderer.dice.tk.FLOOR.type:
				case Renderer.dice.tk.CEIL.type:
				case Renderer.dice.tk.ROUND.type:
				case Renderer.dice.tk.SIGN.type:
				case Renderer.dice.tk.CBRT.type:
				case Renderer.dice.tk.SQRT.type:
				case Renderer.dice.tk.EXP.type:
				case Renderer.dice.tk.LOG.type:
				case Renderer.dice.tk.RANDOM.type:
				case Renderer.dice.tk.TRUNC.type:
				case Renderer.dice.tk.POW.type:
				case Renderer.dice.tk.MAX.type:
				case Renderer.dice.tk.MIN.type: {
					const [, ...symExps] = this._nodes;
					this.addToMeta(meta, {text: `${symFunc.toString()}(`});
					const args = [];
					symExps.forEach((symExp, i) => {
						if (i !== 0) this.addToMeta(meta, {text: `, `});
						args.push(symExp[fnName](meta));
					});
					const out = Math[symFunc.toString()](...args);
					this.addToMeta(meta, {text: ")"});
					return out;
				}
				case Renderer.dice.tk.AVERAGE.type: {
					const [, symExp] = this._nodes;
					return symExp.avg(meta);
				}
				case Renderer.dice.tk.DMAX.type: {
					const [, symExp] = this._nodes;
					return symExp.max(meta);
				}
				case Renderer.dice.tk.DMIN.type: {
					const [, symExp] = this._nodes;
					return symExp.min(meta);
				}
				default: throw new Error(`Unimplemented!`);
			}
		}

		toString () {
			let out;
			const [symFunc, symExp] = this._nodes;
			switch (symFunc.type) {
				case Renderer.dice.tk.FLOOR.type:
				case Renderer.dice.tk.CEIL.type:
				case Renderer.dice.tk.ROUND.type:
				case Renderer.dice.tk.AVERAGE.type:
				case Renderer.dice.tk.DMAX.type:
				case Renderer.dice.tk.DMIN.type:
				case Renderer.dice.tk.SIGN.type:
				case Renderer.dice.tk.ABS.type:
				case Renderer.dice.tk.CBRT.type:
				case Renderer.dice.tk.SQRT.type:
				case Renderer.dice.tk.EXP.type:
				case Renderer.dice.tk.LOG.type:
				case Renderer.dice.tk.RANDOM.type:
				case Renderer.dice.tk.TRUNC.type:
				case Renderer.dice.tk.POW.type:
				case Renderer.dice.tk.MAX.type:
				case Renderer.dice.tk.MIN.type:
					out = symFunc.toString(); break;
				default: throw new Error(`Unimplemented!`);
			}
			out += `(${symExp.toString()})`;
			return out;
		}
	},

	Pool: class extends Renderer.dice.AbstractSymbol {
		constructor (nodesPool, nodeMod) {
			super();
			this._nodesPool = nodesPool;
			this._nodeMod = nodeMod;
		}

		_evl (meta) { return this._invoke("evl", meta); }
		_avg (meta) { return this._invoke("avg", meta); }
		_min (meta) { return this._invoke("min", meta); }
		_max (meta) { return this._invoke("max", meta); }

		_invoke (fnName, meta) {
			const vals = this._nodesPool.map(it => {
				const subMeta = {};
				return {node: it, val: it[fnName](subMeta), meta: subMeta};
			});

			if (this._nodeMod && vals.length) {
				const isSuccessMode = this._nodeMod.isSuccessMode;

				const modOpts = {
					fnGetRerolls: toReroll => toReroll.map(val => {
						const subMeta = {};
						return {node: val.node, val: val.node[fnName](subMeta), meta: subMeta};
					}),
					fnGetExplosions: toExplode => toExplode.map(val => {
						const subMeta = {};
						return {node: val.node, val: val.node[fnName](subMeta), meta: subMeta};
					}),
				};

				const displayVals = Renderer.dice.parsed._handleModifiers(fnName, meta, vals, this._nodeMod, modOpts);

				const asHtml = displayVals.map(v => {
					const html = v.meta.html.join("");
					if (v.isDropped) return `<span class="rll__dropped">(${html})</span>`;
					else if (v.isExploded) return `<span class="rll__exploded">(</span>${html}<span class="rll__exploded">)</span>`;
					else if (v.isSuccess) return `<span class="rll__success">(${html})</span>`;
					else return `(${html})`;
				}).join("+");

				const asText = displayVals.map(v => `(${v.meta.text.join("")})`).join("+");
				const asMd = displayVals.map(v => `(${v.meta.md.join("")})`).join("+");

				this.addToMeta(meta, {html: asHtml, text: asText, md: asMd});

				if (isSuccessMode) {
					return vals.filter(it => !it.isDropped && it.isSuccess).length;
				} else {
					return vals.filter(it => !it.isDropped).map(it => it.val).sum();
				}
			} else {
				this.addToMeta(
					meta,
					["html", "text", "md"].mergeMap(prop => ({
						[prop]: `${vals.map(it => `(${it.meta[prop].join("")})`).join("+")}`,
					})),
				);
				return vals.map(it => it.val).sum();
			}
		}

		toString () {
			return `{${this._nodesPool.map(it => it.toString()).join(", ")}}${this._nodeMod ? this._nodeMod.toString() : ""}`;
		}
	},

	Factor: class extends Renderer.dice.AbstractSymbol {
		constructor (node, opts) {
			super();
			opts = opts || {};
			this._node = node;
			this._hasParens = !!opts.hasParens;
		}

		_evl (meta) { return this._invoke("evl", meta); }
		_avg (meta) { return this._invoke("avg", meta); }
		_min (meta) { return this._invoke("min", meta); }
		_max (meta) { return this._invoke("max", meta); }

		_invoke (fnName, meta) {
			switch (this._node.type) {
				case Renderer.dice.tk.TYP_NUMBER: {
					this.addToMeta(meta, {text: this.toString()});
					return Number(this._node.value);
				}
				case Renderer.dice.tk.TYP_SYMBOL: {
					if (this._hasParens) this.addToMeta(meta, {text: "("});
					const out = this._node[fnName](meta);
					if (this._hasParens) this.addToMeta(meta, {text: ")"});
					return out;
				}
				case Renderer.dice.tk.PB.type: {
					this.addToMeta(meta, {text: this.toString(meta)});
					return meta.pb == null ? 0 : meta.pb;
				}
				case Renderer.dice.tk.SUMMON_SPELL_LEVEL.type: {
					this.addToMeta(meta, {text: this.toString(meta)});
					return meta.summonSpellLevel == null ? 0 : meta.summonSpellLevel;
				}
				case Renderer.dice.tk.SUMMON_CLASS_LEVEL.type: {
					this.addToMeta(meta, {text: this.toString(meta)});
					return meta.summonClassLevel == null ? 0 : meta.summonClassLevel;
				}
				default: throw new Error(`Unimplemented!`);
			}
		}

		toString (indent) {
			let out;
			switch (this._node.type) {
				case Renderer.dice.tk.TYP_NUMBER: out = this._node.value; break;
				case Renderer.dice.tk.TYP_SYMBOL: out = this._node.toString(); break;
				case Renderer.dice.tk.PB.type: out = this.meta ? (this.meta.pb || 0) : "PB"; break;
				case Renderer.dice.tk.SUMMON_SPELL_LEVEL.type: out = this.meta ? (this.meta.summonSpellLevel || 0) : "the spell's level"; break;
				case Renderer.dice.tk.SUMMON_CLASS_LEVEL.type: out = this.meta ? (this.meta.summonClassLevel || 0) : "your class level"; break;
				default: throw new Error(`Unimplemented!`);
			}
			return this._hasParens ? `(${out})` : out;
		}
	},

	Dice: class extends Renderer.dice.AbstractSymbol {
		static _facesToValue (faces, fnName) {
			switch (fnName) {
				case "evl": return RollerUtil.randomise(faces);
				case "avg": return (faces + 1) / 2;
				case "min": return 1;
				case "max": return faces;
			}
		}

		constructor (nodes) {
			super();
			this._nodes = nodes;
		}

		_evl (meta) { return this._invoke("evl", meta); }
		_avg (meta) { return this._invoke("avg", meta); }
		_min (meta) { return this._invoke("min", meta); }
		_max (meta) { return this._invoke("max", meta); }

		_invoke (fnName, meta) {
			if (this._nodes.length === 1) return this._nodes[0][fnName](meta); // if it's just a factor

			// N.B. we don't pass the full "meta" to symbol evaluation inside the dice expression--we therefore won't see
			//   the metadata from the nested rolls, but that's OK.

			const view = this._nodes.slice();
			// Shift the first symbol and use that as our initial number of dice
			//   e.g. the "2" in 2d3d5
			const numSym = view.shift();
			let tmp = numSym[fnName](Renderer.dice.util.getReducedMeta(meta));

			while (view.length) {
				if (Math.round(tmp) !== tmp) throw new Error(`Number of dice to roll (${tmp}) was not an integer!`);

				// Use the next symbol as our number of faces
				//   e.g. the "3" in `2d3d5`
				// When looping, the number of dice may have been a complex expression with modifiers; take the next
				//   non-modifier symbol as the faces.
				//   e.g. the "20" in `(2d3kh1r1)d20` (parentheses for emphasis)
				const facesSym = view.shift();
				const faces = facesSym[fnName]();
				if (Math.round(faces) !== faces) throw new Error(`Dice face count (${faces}) was not an integer!`);

				const isLast = view.length === 0 || (view.length === 1 && view.last().isDiceModifierGroup);
				tmp = this._invoke_handlePart(fnName, meta, view, tmp, faces, isLast);
			}

			return tmp;
		}

		_invoke_handlePart (fnName, meta, view, num, faces, isLast) {
			const rolls = Array.from({length: num}, () => ({val: Renderer.dice.parsed.Dice._facesToValue(faces, fnName)}));
			if (!rolls.length) rolls.push({val: 0});

			let displayRolls;
			let isSuccessMode = false;

			if (view.length && view[0].isDiceModifierGroup) {
				const nodeMod = view[0];

				if (fnName === "evl" || fnName === "min" || fnName === "max") { // avoid handling dice modifiers in "average" mode
					isSuccessMode = nodeMod.isSuccessMode;

					const modOpts = {
						faces,
						fnGetRerolls: toReroll => [...new Array(toReroll.length)].map(() => ({val: Renderer.dice.parsed.Dice._facesToValue(faces, fnName)})),
						fnGetExplosions: toExplode => [...new Array(toExplode.length)].map(() => ({val: Renderer.dice.parsed.Dice._facesToValue(faces, fnName)})),
					};

					displayRolls = Renderer.dice.parsed._handleModifiers(fnName, meta, rolls, nodeMod, modOpts);
				}

				view.shift();
			} else displayRolls = rolls;

			if (isLast) { // only display the dice for the final roll, e.g. in 2d3d4 show the Xd4
				const asHtml = displayRolls.map(r => {
					if (r.htmlDisplay) return r.htmlDisplay;

					const numPart = Renderer.dice.parsed._rollToNumPart_html(r, faces);

					if (r.isDropped) return `<span class="rll__dropped">[${numPart}]</span>`;
					else if (r.isExploded) return `<span class="rll__exploded">[</span>${numPart}<span class="rll__exploded">]</span>`;
					else if (r.isSuccess) return `<span class="rll__success">[${numPart}]</span>`;
					else return `[${numPart}]`;
				}).join("+");

				const asText = displayRolls.map(r => `[${r.val}]`).join("+");

				const asMd = displayRolls.map(r => {
					if (r.isDropped) return `~~[${r.val}]~~`;
					else if (r.isExploded) return `_[${r.val}]_`;
					else if (r.isSuccess) return `**[${r.val}]**`;
					else return `[${r.val}]`;
				}).join("+");

				this.addToMeta(
					meta,
					{
						html: asHtml,
						text: asText,
						md: asMd,
					},
				);
			}

			if (fnName === "evl") {
				const maxRolls = rolls.filter(it => it.val === faces && !it.isDropped);
				const minRolls = rolls.filter(it => it.val === 1 && !it.isDropped);
				meta.allMax = meta.allMax || [];
				meta.allMin = meta.allMin || [];
				meta.allMax.push(maxRolls.length && maxRolls.length === rolls.length);
				meta.allMin.push(minRolls.length && minRolls.length === rolls.length);
			}

			if (isSuccessMode) {
				return rolls.filter(it => !it.isDropped && it.isSuccess).length;
			} else {
				return rolls.filter(it => !it.isDropped).map(it => it.val).sum();
			}
		}

		toString () {
			if (this._nodes.length === 1) return this._nodes[0].toString(); // if it's just a factor

			const [numSym, facesSym] = this._nodes;
			let out = `${numSym.toString()}d${facesSym.toString()}`;

			for (let i = 2; i < this._nodes.length; ++i) {
				const n = this._nodes[i];
				if (n.isDiceModifierGroup) out += n.mods.map(it => `${it.modSym.toString()}${it.numSym.toString()}`).join("");
				else out += `d${n.toString()}`;
			}

			return out;
		}
	},

	Exponent: class extends Renderer.dice.AbstractSymbol {
		constructor (nodes) {
			super();
			this._nodes = nodes;
		}

		_evl (meta) { return this._invoke("evl", meta); }
		_avg (meta) { return this._invoke("avg", meta); }
		_min (meta) { return this._invoke("min", meta); }
		_max (meta) { return this._invoke("max", meta); }

		_invoke (fnName, meta) {
			const view = this._nodes.slice();
			let val = view.pop()[fnName](meta);
			while (view.length) {
				this.addToMeta(meta, {text: "^"});
				val = view.pop()[fnName](meta) ** val;
			}
			return val;
		}

		toString () {
			const view = this._nodes.slice();
			let out = view.pop().toString();
			while (view.length) out = `${view.pop().toString()}^${out}`;
			return out;
		}
	},

	Term: class extends Renderer.dice.AbstractSymbol {
		constructor (nodes) {
			super();
			this._nodes = nodes;
		}

		_evl (meta) { return this._invoke("evl", meta); }
		_avg (meta) { return this._invoke("avg", meta); }
		_min (meta) { return this._invoke("min", meta); }
		_max (meta) { return this._invoke("max", meta); }

		_invoke (fnName, meta) {
			let out = this._nodes[0][fnName](meta);

			for (let i = 1; i < this._nodes.length; i += 2) {
				if (this._nodes[i].eq(Renderer.dice.tk.MULT)) {
					this.addToMeta(meta, {text: " × "});
					out *= this._nodes[i + 1][fnName](meta);
				} else if (this._nodes[i].eq(Renderer.dice.tk.DIV)) {
					this.addToMeta(meta, {text: " ÷ "});
					out /= this._nodes[i + 1][fnName](meta);
				} else throw new Error(`Unimplemented!`);
			}

			return out;
		}

		toString () {
			let out = this._nodes[0].toString();
			for (let i = 1; i < this._nodes.length; i += 2) {
				if (this._nodes[i].eq(Renderer.dice.tk.MULT)) out += ` * ${this._nodes[i + 1].toString()}`;
				else if (this._nodes[i].eq(Renderer.dice.tk.DIV)) out += ` / ${this._nodes[i + 1].toString()}`;
				else throw new Error(`Unimplemented!`);
			}
			return out;
		}
	},

	Expression: class extends Renderer.dice.AbstractSymbol {
		constructor (nodes) {
			super();
			this._nodes = nodes;
		}

		_evl (meta) { return this._invoke("evl", meta); }
		_avg (meta) { return this._invoke("avg", meta); }
		_min (meta) { return this._invoke("min", meta); }
		_max (meta) { return this._invoke("max", meta); }

		_invoke (fnName, meta) {
			const view = this._nodes.slice();

			let isNeg = false;
			if (view[0].eq(Renderer.dice.tk.ADD) || view[0].eq(Renderer.dice.tk.SUB)) {
				isNeg = view.shift().eq(Renderer.dice.tk.SUB);
				if (isNeg) this.addToMeta(meta, {text: "-"});
			}

			let out = view[0][fnName](meta);
			if (isNeg) out = -out;

			for (let i = 1; i < view.length; i += 2) {
				if (view[i].eq(Renderer.dice.tk.ADD)) {
					this.addToMeta(meta, {text: " + "});
					out += view[i + 1][fnName](meta);
				} else if (view[i].eq(Renderer.dice.tk.SUB)) {
					this.addToMeta(meta, {text: " - "});
					out -= view[i + 1][fnName](meta);
				} else throw new Error(`Unimplemented!`);
			}

			return out;
		}

		toString (indent = 0) {
			let out = "";
			const view = this._nodes.slice();

			let isNeg = false;
			if (view[0].eq(Renderer.dice.tk.ADD) || view[0].eq(Renderer.dice.tk.SUB)) {
				isNeg = view.shift().eq(Renderer.dice.tk.SUB);
				if (isNeg) out += "-";
			}

			out += view[0].toString(indent);
			for (let i = 1; i < view.length; i += 2) {
				if (view[i].eq(Renderer.dice.tk.ADD)) out += ` + ${view[i + 1].toString(indent)}`;
				else if (view[i].eq(Renderer.dice.tk.SUB)) out += ` - ${view[i + 1].toString(indent)}`;
				else throw new Error(`Unimplemented!`);
			}
			return out;
		}
	},
};

if (!globalThis.IS_VTT && typeof window !== "undefined") {
	window.addEventListener("load", Renderer.dice._pInit);
}
