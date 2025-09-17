// Threshold definitions for volume-to-capacity (V/C) categories.
// Each entry defines a category name, minimum and maximum values and a display colour.
export const THRESHOLDS = [
    { key: '余裕', min: 0.0, max: 0.7, color: '#00b050' },   // green: ample capacity
    { key: '混雑', min: 0.7, max: 0.9, color: '#ffc000' },   // yellow: congestion
    { key: '飽和', min: 0.9, max: 1.0, color: '#ff0000' },   // red: saturation
    { key: '超飽和', min: 1.0, max: Infinity, color: '#7030a0' } // purple: over-saturation
];