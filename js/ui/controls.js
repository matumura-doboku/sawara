// UI control logic. This module wires up the buttons and inputs
// defined in index.html to update the application state and trigger
// computations. It relies on the global map instance passed in
// by app.js.

import { state, updateState } from '../state/store.js';
import { updateLegendCounts } from '../map/legend.js';
import { runCompute } from '../../compute/redistribute.js';

/**
 * Attach event listeners to UI controls. The map instance is passed
 * so that the AOI drawing tools and other features can interact with it.
 *
 * @param {maplibregl.Map} map The map instance created in app.js.
 */
export function setupControls(map) {
    // Helper to toggle a state property and update button appearance.
    function bindToggle(buttonId, stateKey) {
        const btn = document.getElementById(buttonId);
        if (!btn) return;
        btn.addEventListener('click', () => {
            // Flip the boolean state
            const newVal = !state[stateKey];
            updateState(stateKey, newVal);
            btn.classList.toggle('active', newVal);
            // Additional behaviour for AOI toggle can be added here.
            if (stateKey === 'aoiActive' && newVal) {
                // Optionally call aoi draw tool (stub).
                console.debug('AOI drawing activated');
            }
        });
    }
    bindToggle('aoiToggle', 'aoiActive');
    bindToggle('closureToggle', 'closureActive');
    bindToggle('gridToggle', 'gridActive');
    bindToggle('buildingToggle', 'buildingActive');

    // Date/time inputs update the state directly.
    const startEl = document.getElementById('startTime');
    const endEl = document.getElementById('endTime');
    if (startEl) {
        startEl.addEventListener('change', (e) => {
            updateState('startTime', e.target.value);
        });
    }
    if (endEl) {
        endEl.addEventListener('change', (e) => {
            updateState('endTime', e.target.value);
        });
    }

    // Run calculation when the user clicks the calculate button.
    const runBtn = document.getElementById('runCalc');
    if (runBtn) {
        runBtn.addEventListener('click', async () => {
            runBtn.disabled = true;
            runBtn.textContent = '計算中…';
            try {
                const result = await runCompute(state);
                if (result && result.counts) {
                    updateState('results', result);
                    updateLegendCounts(result.counts);
                }
            } catch (err) {
                console.error('計算エラー', err);
                alert('計算中にエラーが発生しました。コンソールを確認してください。');
            } finally {
                runBtn.disabled = false;
                runBtn.textContent = '計算実行';
            }
        });
    }
}