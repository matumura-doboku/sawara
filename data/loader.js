// Data loader functions. This module contains helper functions to
// retrieve data files used by the application. Currently the
// implementation is a stub and simply fetches JSON files from the
// repository. Extend these functions to support CSV parsing,
// manifest-based loading and error handling.

/**
 * Load the project manifest which lists available datasets.
 *
 * @returns {Promise<Object>} A promise resolving to the manifest JSON.
 */
export async function loadManifest() {
    const response = await fetch('data/manifest.json');
    if (!response.ok) {
        throw new Error(`Failed to load manifest: ${response.statusText}`);
    }
    return response.json();
}

/**
 * Load roads for a given prefecture code.
 *
 * @param {string} prefCode The prefecture code (e.g. '34').
 * @returns {Promise<Object>} A promise resolving to a GeoJSON FeatureCollection.
 */
export async function loadRoads(prefCode) {
    const path = `data/prefectures/${prefCode}/roads.geojson`;
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to load roads: ${response.statusText}`);
    }
    return response.json();
}

/**
 * Load traffic CSV for a given prefecture and time period. This stub
 * currently returns an empty array. Implement CSV parsing here or use
 * a library such as PapaParse to parse CSV strings into objects.
 *
 * @param {string} prefCode The prefecture code.
 * @param {string} period Either 'AM' or 'PM'.
 * @returns {Promise<Array>} A promise resolving to an array of rows.
 */
export async function loadTraffic(prefCode, period) {
    const path = `data/prefectures/${prefCode}/traffic_${period}.csv`;
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to load traffic CSV: ${response.statusText}`);
    }
    // For now just return an empty array; parse CSV in the future.
    return [];
}