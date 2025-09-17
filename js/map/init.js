// Map initialisation logic. This module creates a MapLibre GL map
// instance using the Japanese GSI standard tile service. The returned
// map object can be used by other modules to add layers and handle
// events.

/**
 * Initialise the MapLibre map.
 *
 * @returns {maplibregl.Map} The created map instance.
 */
export function initMap() {
    // Define a simple raster style using the standard GSI tile set. See
    // https://maps.gsi.go.jp/development/ichiran.html for details.
    const gsiStyle = {
        version: 8,
        sources: {
            gsi: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'
                ],
                tileSize: 256,
                attribution: '地理院タイル'
            }
        },
        layers: [
            {
                id: 'gsi',
                type: 'raster',
                source: 'gsi',
                minzoom: 0,
                maxzoom: 18
            }
        ]
    };

    // Create the map. The initial centre is roughly the centre of
    // Hiroshima Prefecture. Adjust as necessary.
    const map = new maplibregl.Map({
        container: 'map',
        style: gsiStyle,
        center: [133.5, 34.5],
        zoom: 10
    });

    // Add map controls (zoom and rotation). You can add more controls
    // such as geolocation or fullscreen if desired.
    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    return map;
}