/*
 * Computation logic for the 影響計算システム. This module assigns
 * random V/C categories to each road segment in the dataset. It is
 * intended as a placeholder: in a real application you would replace
 * this with logic to compute volume-to-capacity ratios based on
 * traffic counts, road lengths and capacities, perhaps using a
 * separate worker script to avoid blocking the UI. The distribution
 * probabilities used here roughly mirror the observed proportions
 * from the provided traffic data (68% 余裕, 8% 混雑, 4% 飽和, 20% 超飽和).
 */

import { THRESHOLDS } from '../config/thresholds.js';

/**
 * Assign a random category to a road segment based on fixed
 * probabilities. Adjust these probabilities to reflect your dataset.
 *
 * @returns {string} One of the category keys defined in THRESHOLDS.
 */
function sampleCategory() {
    const r = Math.random();
    if (r < 0.68) return '余裕';
    if (r < 0.76) return '混雑';
    if (r < 0.80) return '飽和';
    return '超飽和';
}

/**
 * Run the computation. This function loads the road network
 * GeoJSON from the 34_Hiroshima prefecture directory and then
 * assigns a random V/C category to each feature. The counts of
 * segments in each category are returned for updating the legend.
 *
 * @param {Object} state The current application state. Not used in
 * the placeholder implementation but kept for future expansion.
 * @returns {Promise<{counts: Object}>} A promise resolving to an object
 * containing category counts.
 */
export async function runCompute(state) {
    // Load the road network GeoJSON. Using relative path means it
    // works when hosted on GitHub Pages or Cloudflare.
    const response = await fetch('data/prefectures/34_hiroshima/roads.geojson');
    if (!response.ok) {
        throw new Error('Failed to load roads GeoJSON');
    }
    const geojson = await response.json();
    // Initialise counts for each category
    const counts = {};
    THRESHOLDS.forEach(t => {
        counts[t.key] = 0;
    });
    // Iterate through each feature and assign a category
    if (geojson && geojson.features) {
        geojson.features.forEach(feature => {
            const cat = sampleCategory();
            counts[cat]++;
            // Attach the category to the feature for potential future use
            feature.properties = feature.properties || {};
            feature.properties.vc_category = cat;
        });
    }
    return { counts, geojson };
}