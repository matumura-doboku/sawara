// Legend handling. The legend displays the V/C categories along with
// their associated colours and counts. Use initLegend() to build the
// legend markup and updateLegendCounts() to reflect the number of
// segments in each category.

import { THRESHOLDS } from '../config/thresholds.js';

/**
 * Initialise the legend by creating markup for each category.
 */
export function initLegend() {
    const legendEl = document.getElementById('legend');
    if (!legendEl) return;
    legendEl.innerHTML = '';
    THRESHOLDS.forEach(threshold => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        const colorBox = document.createElement('span');
        colorBox.className = 'legend-color';
        colorBox.style.backgroundColor = threshold.color;
        const label = document.createElement('span');
        label.style.marginRight = '0.25rem';
        label.textContent = threshold.key;
        const count = document.createElement('span');
        count.id = `legend-count-${threshold.key}`;
        count.textContent = '';
        item.appendChild(colorBox);
        item.appendChild(label);
        item.appendChild(count);
        legendEl.appendChild(item);
    });
}

/**
 * Update the counts shown in the legend for each category.
 *
 * @param {Object.<string, number>} counts A mapping from category
 *        names to the number of segments assigned that category.
 */
export function updateLegendCounts(counts) {
    THRESHOLDS.forEach(threshold => {
        const el = document.getElementById(`legend-count-${threshold.key}`);
        if (el) {
            const value = counts && counts[threshold.key] ? counts[threshold.key] : 0;
            el.textContent = ` (${value})`;
        }
    });
}