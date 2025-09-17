// Spatial indexing. This module will build and query a spatial index
// (e.g. using an R-tree) to efficiently find road segments within
// a given area of interest. For now it exports stub functions.

/**
 * Build a spatial index for a set of road segments. Returns an
 * opaque structure representing the index. Implementation is not
 * provided.
 *
 * @param {Object} roadsGeojson A GeoJSON FeatureCollection of roads.
 * @returns {*} A spatial index structure.
 */
export function buildIndex(roadsGeojson) {
    // TODO: implement spatial index using Flatbush or RBush.
    return null;
}

/**
 * Query the spatial index for segments intersecting a bounding box or
 * polygon. This stub returns an empty array.
 *
 * @param {*} index The spatial index built by buildIndex().
 * @param {Array<number>} bbox The bounding box [minX, minY, maxX, maxY].
 * @returns {Array<number>} An array of indices of segments.
 */
export function queryIndex(index, bbox) {
    // TODO: implement spatial query.
    return [];
}