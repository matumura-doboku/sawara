/*
 * Data loading utilities. This module provides functions to load
 * GeoJSON and CSV files defined in the manifest. In a full
 * implementation, these functions could parse CSV into JSON and join
 * traffic data to road geometries. For now, they simply fetch
 * resources using the Fetch API.
 */

/**
 * Fetch a JSON resource relative to the site root.
 * @param {string} path Relative URL of the JSON file.
 * @returns {Promise<any>} Parsed JSON.
 */
export async function loadJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return res.json();
}

/**
 * Fetch a CSV resource as text. CSV parsing is not implemented
 * here; consumers can parse it using a library like PapaParse.
 * @param {string} path Relative URL of the CSV file.
 * @returns {Promise<string>} Raw CSV text.
 */
export async function loadCSV(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return res.text();
}