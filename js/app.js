/*
 * Entry point for the 影響計算システム web application.
 * This module wires together various pieces of the application once the
 * DOM has loaded. It initializes the map, sets up UI controls and
 * prepares the legend and credits. Additional functionality lives in
 * separate modules under the js/ directory tree.
 */

import { initMap } from './map/init.js';
import { setupControls } from './ui/controls.js';
import { initLegend } from './map/legend.js';
import { CREDITS } from './config/credits.js';
import { addBaseLayers } from './map/layers.js';

// Wait for the DOM to fully load before initializing the app.
window.addEventListener('DOMContentLoaded', () => {
    // Initialise the map and store the reference.
    const map = initMap();

    // Setup the legend in the UI.
    initLegend();

    // Insert credits into the UI.
    const creditsEl = document.getElementById('credits');
    if (creditsEl) {
        creditsEl.innerHTML = CREDITS;
    }

    // Setup UI controls and pass the map instance so controls can
    // interact with the map.
    setupControls(map);

    // 地図ロード後に道路レイヤを追加
    map.on('load', () => {
        addBaseLayers(map);
    });
});
