// layers.js
// 道路レイヤの追加・更新処理（MVP安定版）
// - GeoJSON（manifest.json で参照）を読み込み、"roads" ソースとして登録
// - "vc_ratio" プロパティに基づく色分け（未定義は 0.2 を既定値）
// - 既存ソース/レイヤがある場合は置き換え

import { loadJSON } from '../data/loader.js';
import manifest from '../data/manifest.json' assert { type: 'json' };
import { THRESHOLDS } from '../config/thresholds.js';

/** しきい値配列から MapLibre の step 式を作る */
function buildStepExpression() {
  // 既定値（最初の色）: 最も低いカテゴリーの色を使用
  const defaultColor = THRESHOLDS[0].color || '#00b050';
  const expr = ['step', ['coalesce', ['get', 'vc_ratio'], 0.2], defaultColor];
  // min の昇順になるように並んでいる前提で step を構築
  // 例: 0.7→黄色, 0.9→赤, 1.0→紫
  for (let i = 1; i < THRESHOLDS.length; i++) {
    const t = THRESHOLDS[i];
    expr.push(t.min);
    expr.push(t.color);
  }
  return expr;
}

/** GeoJSONの道路データを読み込み、ベースレイヤを追加 */
export async function addBaseLayers(map) {
  try {
    const hiroPath = manifest["34"]; // 34=広島
    const roads = await loadJSON(`data/${hiroPath}`);

    // "vc_ratio" がない場合に備えて既定値を入れておく（表示の安定化）
    if (roads && Array.isArray(roads.features)) {
      for (const f of roads.features) {
        if (!f.properties) f.properties = {};
        if (typeof f.properties.vc_ratio !== 'number') {
          f.properties.vc_ratio = 0.2;
        }
      }
    }

    // 既存のソース/レイヤを安全に差し替え
    if (map.getLayer('roads-layer')) map.removeLayer('roads-layer');
    if (map.getSource('roads')) map.removeSource('roads');

    map.addSource('roads', {
      type: 'geojson',
      data: roads
    });

    map.addLayer({
      id: 'roads-layer',
      type: 'line',
      source: 'roads',
      paint: {
        'line-width': 2,
        'line-color': buildStepExpression(),
        'line-opacity': 0.9
      }
    });

    console.log('道路レイヤを追加しました');
  } catch (err) {
    console.error('道路レイヤの追加に失敗:', err);
  }
}

/** 計算結果（linkId→vc_ratio）を既存GeoJSONへ反映して再描画する */
export function applyResultsToLayer(map, results) {
  const src = map.getSource('roads');
  if (!src || !src._data || !Array.isArray(src._data.features)) {
    console.warn('roadsソースが見つからないため、反映をスキップします');
    return;
  }
  // results は { [linkId: string]: { vc_ratio: number } } を想定
  let updatedCount = 0;
  for (const f of src._data.features) {
    const id = f.properties && (f.properties.linkId || f.properties.id);
    if (id && results && results[id] && typeof results[id].vc_ratio === 'number') {
      f.properties.vc_ratio = results[id].vc_ratio;
      updatedCount++;
    }
  }
  src.setData(src._data);
  console.log(`計算結果を ${updatedCount} 件反映しました`);
}
