// Joiner module. In a full implementation this module would join
// traffic CSV data with road GeoJSON features using a common
// identifier (e.g. link ID) and produce combined objects for
// analysis. At present it exports a stub.

/**
 * Join traffic data to road features.
 *
 * @param {Array<Object>} trafficRows Parsed CSV rows.
 * @param {Object} roadsGeojson GeoJSON FeatureCollection of roads.
 * @returns {Array<Object>} A joined array of objects mapping road
 *          identifiers to traffic data. Currently returns an empty array.
 */
export function joinTrafficToRoads(trafficRows, roadsGeojson) {
    // TODO: implement joining logic.
    return [];
}