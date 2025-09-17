// Extractor module. Responsible for extracting a subset of road
// segments that intersect with an area of interest (AOI). It works
// together with the spatial index. This is a stub implementation.

import { queryIndex } from './indexer.js';

/**
 * Extract the road features intersecting a given polygon. In a full
 * implementation this function would compute the bounding box of the
 * polygon, query the spatial index and then filter the candidate
 * features with a precise geometry intersection test.
 *
 * @param {*} index The spatial index built by buildIndex().
 * @param {Array<Array<number>>} polygonCoordinates An array of [lng, lat]
 *        coordinates defining the AOI polygon.
 * @param {Object} roadsGeojson The full roads GeoJSON.
 * @returns {Object} A GeoJSON FeatureCollection containing only the
 *          intersecting features. Currently returns an empty
 *          collection.
 */
export function extractIntersecting(index, polygonCoordinates, roadsGeojson) {
    // TODO: implement extraction logic based on spatial index.
    return { type: 'FeatureCollection', features: [] };
}