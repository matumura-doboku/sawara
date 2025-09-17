// A simple application state store.  This store is a plain object that
// holds UI state (toggle switches, date selections), AOI coordinates and
// any computed results. Functions are provided to update the state.

export const state = {
    aoiActive: false,
    closureActive: false,
    gridActive: false,
    buildingActive: false,
    startTime: null,
    endTime: null,
    // Coordinates defining the Area Of Interest polygon as an array of
    // [lng, lat] pairs. When the AOI is active, the drawing tool
    // populates this array.
    aoiCoordinates: [],
    // Holds the results of the most recent computation (e.g. category
    // counts per segment). It is null until a calculation has been
    // performed.
    results: null
};

/**
 * Update a single key in the application state. This helper
 * centralises all state mutations so that additional behaviour can be
 * added later (e.g. state change listeners).
 *
 * @param {string} key The property on the state to update.
 * @param {*} value The new value to assign.
 */
export function updateState(key, value) {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
        state[key] = value;
    }
}