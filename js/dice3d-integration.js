/**
 * 3D Dice Integration for 5etools
 * Dungeon Church Custom Build
 *
 * Hooks into 5etools dice roller to show 3D animated dice rolling
 * across the viewport. Uses actual rolled values from 5etools.
 */
(function() {
    'use strict';

    const CONFIG = {
        enabled: true,
        libraryPath: 'js/dice3d/',
        maxDice: 20,
        debug: false
    };

    let diceBox = null;
    let isLibraryLoaded = false;
    let isLibraryLoading = false;
    let overlayElement = null;
    let currentRollResolve = null;
    let isRolling = false;

    // =========================================================================
    // UTILITY FUNCTIONS
    // =========================================================================

    function log(...args) {
        if (CONFIG.debug) console.log('[Dice3D]', ...args);
    }

    function error(...args) {
        console.error('[Dice3D]', ...args);
    }

    function hasWebGL() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext &&
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    /**
     * Parse dice notation string into components
     */
    function parseDiceNotation(notation) {
        if (!notation || typeof notation !== 'string') return null;

        notation = notation.toLowerCase().replace(/\s/g, '');

        const result = {
            dice: [],
            modifier: 0,
            original: notation,
            libraryFormat: ''
        };

        const diceRegex = /(\d*)d(\d+)/g;
        let match;
        const diceParts = [];

        while ((match = diceRegex.exec(notation)) !== null) {
            const count = parseInt(match[1] || '1', 10);
            const sides = parseInt(match[2], 10);

            if (sides > 0 && count > 0 && count <= CONFIG.maxDice) {
                result.dice.push({ count, sides });
                diceParts.push(`${count}d${sides}`);
            }
        }

        if (result.dice.length === 0) return null;

        result.libraryFormat = diceParts.join('+');
        return result;
    }

    function isSupported(parsed) {
        if (!parsed || !parsed.dice.length) return false;
        const supportedSides = [4, 6, 8, 10, 12, 20, 100];
        return parsed.dice.every(d => supportedSides.includes(d.sides));
    }

    function getTotalDiceCount(parsed) {
        return parsed.dice.reduce((sum, d) => sum + d.count, 0);
    }

    /**
     * Extract individual die values from 5etools meta.text format
     * e.g., ["[4]+[2]", "+3"] -> [4, 2]
     */
    function extractValuesFromMetaText(textArray) {
        if (!textArray || !Array.isArray(textArray)) return [];

        const values = [];
        const fullText = textArray.join('');

        // Match all [N] patterns where N is a number
        const matches = fullText.matchAll(/\[(\d+)\]/g);
        for (const match of matches) {
            values.push(parseInt(match[1], 10));
        }

        return values;
    }

    /**
     * Map die values to dice types based on parsed notation
     * Returns array of {type: 'd20', value: 15} objects
     */
    function mapValuesToDice(parsed, values) {
        const result = [];
        let valueIndex = 0;

        for (const die of parsed.dice) {
            for (let i = 0; i < die.count && valueIndex < values.length; i++) {
                result.push({
                    type: `d${die.sides}`,
                    sides: die.sides,
                    value: values[valueIndex++]
                });
            }
        }

        return result;
    }

    // =========================================================================
    // LIBRARY LOADING
    // =========================================================================

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[src="${src}"]`);
            if (existing) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Failed to load ${src}`));
            document.head.appendChild(script);
        });
    }

    async function loadLibrary() {
        if (isLibraryLoaded) return true;
        if (isLibraryLoading) {
            return new Promise((resolve) => {
                const check = setInterval(() => {
                    if (isLibraryLoaded || !isLibraryLoading) {
                        clearInterval(check);
                        resolve(isLibraryLoaded);
                    }
                }, 100);
            });
        }

        isLibraryLoading = true;
        log('Loading 3D dice library...');

        try {
            await loadScript(CONFIG.libraryPath + 'three.min.js');
            await loadScript(CONFIG.libraryPath + 'cannon.min.js');
            await loadScript(CONFIG.libraryPath + 'teal.js');
            await loadScript(CONFIG.libraryPath + 'dice.js');

            isLibraryLoaded = true;
            isLibraryLoading = false;
            log('3D dice library loaded successfully');
            return true;
        } catch (e) {
            error('Failed to load library:', e);
            isLibraryLoading = false;
            return false;
        }
    }

    // =========================================================================
    // OVERLAY MANAGEMENT
    // =========================================================================

    function createOverlay() {
        if (overlayElement) return overlayElement;

        overlayElement = document.createElement('div');
        overlayElement.className = 'dice3d-overlay';
        overlayElement.innerHTML = `
            <div class="dice3d-canvas-container" id="dice3d-canvas"></div>
            <button class="dice3d-skip">Skip (Space)</button>
        `;

        document.body.appendChild(overlayElement);

        overlayElement.querySelector('.dice3d-skip').addEventListener('click', (e) => {
            e.stopPropagation();
            skipAnimation();
        });

        overlayElement.addEventListener('click', () => skipAnimation());

        return overlayElement;
    }

    function setupKeyboardHandler() {
        document.addEventListener('keydown', (e) => {
            if (!overlayElement || !overlayElement.classList.contains('active')) return;
            if (e.code === 'Space' || e.code === 'Escape' || e.code === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                skipAnimation();
            }
        }, true);
    }

    function showOverlay() {
        createOverlay().classList.add('active');
    }

    function hideOverlay() {
        if (overlayElement) overlayElement.classList.remove('active');
    }

    function skipAnimation() {
        log('Animation skipped');
        if (currentRollResolve) {
            const resolve = currentRollResolve;
            currentRollResolve = null;
            resolve();
        }
    }

    // =========================================================================
    // 3D DICE ROLLING
    // =========================================================================

    async function initDiceBox() {
        if (diceBox) return diceBox;

        const container = document.getElementById('dice3d-canvas');
        if (!container) throw new Error('Dice canvas container not found');

        if (typeof DICE === 'undefined' || !DICE.dice_box) {
            throw new Error('DICE library not loaded');
        }

        diceBox = new DICE.dice_box(container);
        log('Dice box initialized');
        return diceBox;
    }

    /**
     * Roll 3D dice with specific values - fire and forget
     * @param {string} libraryFormat - e.g., "1d20+2d6"
     * @param {number[]} values - actual values from 5etools
     */
    function roll3DWithValues(libraryFormat, values) {
        if (isRolling || !CONFIG.enabled) {
            log('Skipping 3D roll - already rolling or disabled');
            return;
        }

        if (!values || values.length === 0) {
            log('No values to animate');
            return;
        }

        isRolling = true;
        log('Starting 3D roll:', libraryFormat, 'values:', values);

        (async () => {
            try {
                if (!await loadLibrary()) {
                    log('Library failed to load');
                    return;
                }

                showOverlay();
                await initDiceBox();

                diceBox.setDice(libraryFormat);

                await new Promise((resolve) => {
                    currentRollResolve = resolve;

                    diceBox.start_throw(
                        (notation) => {
                            log('Before roll callback, using values:', values);
                            return values;
                        },
                        (result) => {
                            log('After roll complete');
                            setTimeout(() => {
                                if (currentRollResolve === resolve) {
                                    resolve();
                                    currentRollResolve = null;
                                }
                            }, 300);
                        }
                    );
                });
            } catch (e) {
                error('3D roll failed:', e);
            } finally {
                hideOverlay();
                isRolling = false;
            }
        })();
    }

    // =========================================================================
    // 5ETOOLS INTEGRATION
    // =========================================================================

    /**
     * Hook into _pHandleRoll2_automatic to intercept rolls after they happen
     * This lets us extract actual rolled values from meta.text
     */
    function hookDiceRoller() {
        const attemptHook = () => {
            if (typeof Renderer === 'undefined' || !Renderer.dice) {
                return false;
            }

            if (Renderer.dice._dice3dHooked) return true;

            // Store reference to original function
            const original_pHandleRoll2_automatic = Renderer.dice._pHandleRoll2_automatic.bind(Renderer.dice);

            // Replace with our hooked version
            Renderer.dice._pHandleRoll2_automatic = function(tree, rolledBy, opts) {
                opts = opts || {};

                // Skip if 3D dice disabled or already rolling
                if (!CONFIG.enabled || isRolling) {
                    return original_pHandleRoll2_automatic(tree, rolledBy, opts);
                }

                // Get the dice notation for 3D display
                const notation = tree ? tree.toString() : null;
                if (!notation) {
                    return original_pHandleRoll2_automatic(tree, rolledBy, opts);
                }

                const parsed = parseDiceNotation(notation);
                if (!parsed || !isSupported(parsed) || getTotalDiceCount(parsed) > CONFIG.maxDice) {
                    return original_pHandleRoll2_automatic(tree, rolledBy, opts);
                }

                // We need to manually run the evaluation to get meta.text
                // This mirrors what the original function does
                if (!opts.isHidden) Renderer.dice._showBox();
                Renderer.dice._checkHandleName(rolledBy.name);

                if (tree) {
                    const meta = {};
                    if (opts.pb) meta.pb = opts.pb;
                    if (opts.summonSpellLevel) meta.summonSpellLevel = opts.summonSpellLevel;
                    if (opts.summonClassLevel) meta.summonClassLevel = opts.summonClassLevel;

                    // This is where the actual random values are generated
                    const result = tree.evl(meta);

                    // Extract values from meta.text (e.g., ["[4]+[2]", "+3"])
                    const values = extractValuesFromMetaText(meta.text);
                    log('Extracted values from roll:', values, 'from meta.text:', meta.text);

                    // Trigger 3D animation with actual values (fire and forget)
                    if (values.length > 0) {
                        roll3DWithValues(parsed.libraryFormat, values);
                    }

                    // Continue with the rest of the original function's display logic
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
                    if (typeof ExtensionUtil !== 'undefined' && ExtensionUtil.doSendRoll) {
                        ExtensionUtil.doSendRoll({
                            dice: tree.toString(),
                            result,
                            rolledBy: rolledBy.name,
                            label: [lbl, message].filter(Boolean).join(" \u2013 "),
                        });
                    }

                    if (!opts.isHidden) {
                        const eleOut = Renderer.dice._eleLastRolledBy;
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
                        const eleOut = Renderer.dice._eleLastRolledBy;
                        eleOut.appends(`<div class="out-roll-item">Invalid input! Try &quot;/help&quot;</div>`);
                        Renderer.dice._scrollBottom();
                    }
                    return null;
                }
            };

            Renderer.dice._dice3dHooked = true;
            log('Hooked into Renderer.dice._pHandleRoll2_automatic');
            return true;
        };

        // Try immediately and on intervals
        if (!attemptHook()) {
            setTimeout(attemptHook, 500);
            setTimeout(attemptHook, 1000);
            setTimeout(attemptHook, 2000);
            setTimeout(attemptHook, 3000);
            setTimeout(attemptHook, 5000);
        }
    }

    // =========================================================================
    // PUBLIC API
    // =========================================================================

    window.Dice3D = {
        setEnabled: (enabled) => {
            CONFIG.enabled = !!enabled;
            log('3D dice', enabled ? 'enabled' : 'disabled');
        },

        isEnabled: () => CONFIG.enabled,

        toggle: () => {
            CONFIG.enabled = !CONFIG.enabled;
            log('3D dice', CONFIG.enabled ? 'enabled' : 'disabled');
            return CONFIG.enabled;
        },

        testRoll: async (notation = '1d20') => {
            if (!hasWebGL()) {
                error('WebGL not supported');
                return null;
            }

            const parsed = parseDiceNotation(notation);
            if (!parsed || !isSupported(parsed)) {
                error('Invalid or unsupported notation:', notation);
                return null;
            }

            // Generate test values
            const values = [];
            for (const die of parsed.dice) {
                for (let i = 0; i < die.count; i++) {
                    values.push(Math.floor(Math.random() * die.sides) + 1);
                }
            }
            log(`Testing ${notation}: values=${values}`);

            // For test, we wait for animation
            isRolling = true;
            try {
                if (!await loadLibrary()) return null;
                showOverlay();
                await initDiceBox();
                diceBox.setDice(parsed.libraryFormat);

                await new Promise((resolve) => {
                    currentRollResolve = resolve;
                    diceBox.start_throw(
                        () => values,
                        () => {
                            setTimeout(() => {
                                if (currentRollResolve === resolve) {
                                    resolve();
                                    currentRollResolve = null;
                                }
                            }, 500);
                        }
                    );
                });
            } finally {
                hideOverlay();
                isRolling = false;
            }

            return { values, notation: parsed };
        },

        setDebug: (enabled) => {
            CONFIG.debug = !!enabled;
            log('Debug mode', enabled ? 'enabled' : 'disabled');
        },

        getConfig: () => ({ ...CONFIG }),
        hasWebGL,
        isLibraryLoaded: () => isLibraryLoaded,
        preload: () => loadLibrary()
    };

    // =========================================================================
    // INITIALIZATION
    // =========================================================================

    function init() {
        if (!hasWebGL()) {
            log('WebGL not supported, 3D dice disabled');
            CONFIG.enabled = false;
            return;
        }

        createOverlay();
        setupKeyboardHandler();
        hookDiceRoller();

        log('3D Dice integration initialized');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
