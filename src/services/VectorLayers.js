import _ from 'lodash';

const mbTileServer = process.env.VUE_APP_MBTILE_SERVER;

const buildTileUrls = (name, method) => [
  `https://a.${mbTileServer}/services/${method}/${name}/tiles/{z}/{x}/{y}.pbf`,
  `https://b.${mbTileServer}/services/${method}/${name}/tiles/{z}/{x}/{y}.pbf`,
  `https://c.${mbTileServer}/services/${method}/${name}/tiles/{z}/{x}/{y}.pbf`,
  `https://d.${mbTileServer}/services/${method}/${name}/tiles/{z}/{x}/{y}.pbf`,
  `https://e.${mbTileServer}/services/${method}/${name}/tiles/{z}/{x}/{y}.pbf`,
  `https://f.${mbTileServer}/services/${method}/${name}/tiles/{z}/{x}/{y}.pbf`,
  `https://g.${mbTileServer}/services/${method}/${name}/tiles/{z}/{x}/{y}.pbf`,
  `https://h.${mbTileServer}/services/${method}/${name}/tiles/{z}/{x}/{y}.pbf`,
  `https://i.${mbTileServer}/services/${method}/${name}/tiles/{z}/{x}/{y}.pbf`,
  `https://j.${mbTileServer}/services/${method}/${name}/tiles/{z}/{x}/{y}.pbf`,
  `https://k.${mbTileServer}/services/${method}/${name}/tiles/{z}/{x}/{y}.pbf`,
  `https://l.${mbTileServer}/services/${method}/${name}/tiles/{z}/{x}/{y}.pbf`,
];

const defaultStyle = {
  id: null,
  source: {
    type: 'vector',
    tiles: null,
    minzoom: 0,
    maxzoom: 16,
  },
  layout: {
    visibility: 'none',
  },
  paint: {},
};

const layers = [
  {
    id: 'elevation',
    name: 'elevation-final',
    layer: 'elevationfinal',
    method: 'elevation',
    type: 'fill',
    color: 'rgba(0, 255, 255, 0.65)',
    zIndex: 10,
  },
  {
    id: 'vegetation_sp',
    name: 'sage-pine-final-combined',
    layer: 'sagepinefinalcombined',
    method: 'vegetation',
    type: 'fill',
    color: 'rgba(0, 255, 0, 0.65)',
    zIndex: 20,
  },
  {
    id: 'vegetation_spp',
    name: 'sage-pine-pinyon-final-combined',
    layer: 'sagepinepinyonfinalcombined',
    method: 'vegetation',
    type: 'fill',
    color: 'rgba(0, 255, 0, 0.65)',
    zIndex: 21,
  },
  {
    id: 'vegetation_sp_nofeds',
    name: 'sage-pine-final-no-federal-land-combined',
    layer: 'sagepinefinalnofederallandcombined',
    method: 'vegetation',
    type: 'fill',
    color: 'rgba(0, 255, 0, 0.65)',
    zIndex: 22,
  },
  {
    id: 'vegetation_spp_nofeds',
    name: 'sage-pine-pinyon-final-no-federal-land-combined',
    layer: 'sagepinepinyonfinalnofederallandcombined',
    method: 'vegetation',
    type: 'fill',
    color: 'rgba(0, 255, 0, 0.65)',
    zIndex: 23,
  },
  {
    id: 'roads_sp',
    name: 'sage-pine-final-combined',
    layer: 'sagepinefinalcombined',
    method: 'roads',
    type: 'fill',
    color: 'rgba(255, 255, 0, 0.65)',
    zIndex: 30,
  },
  {
    id: 'roads_spp',
    name: 'sage-pine-pinyon-final-combined',
    layer: 'sagepinepinyonfinalcombined',
    method: 'roads',
    type: 'fill',
    color: 'rgba(255, 255, 0, 0.65)',
    zIndex: 31,
  },
  {
    id: 'roads_sp_nofeds',
    name: 'sage-pine-final-no-federal-land-combined',
    layer: 'sagepinefinalnofederallandcombined',
    method: 'roads',
    type: 'fill',
    color: 'rgba(255, 255, 0, 0.65)',
    zIndex: 32,
  },
  {
    id: 'roads_spp_nofeds',
    name: 'sage-pine-pinyon-final-no-federal-land-combined',
    layer: 'sagepinepinyonfinalnofederallandcombined',
    method: 'roads',
    type: 'fill',
    color: 'rgba(255, 255, 0, 0.65)',
    zIndex: 33,
  },
  {
    id: 'trails_sp',
    name: 'sage-pine-final-combined',
    layer: 'sagepinefinalcombined',
    method: 'trails',
    type: 'fill',
    color: 'rgba(255, 0, 255, 0.65)',
    zIndex: 40,
  },
  {
    id: 'trails_spp',
    name: 'sage-pine-pinyon-final-combined',
    layer: 'sagepinepinyonfinalcombined',
    method: 'trails',
    type: 'fill',
    color: 'rgba(255, 0, 255, 0.65)',
    zIndex: 41,
  },
  {
    id: 'trails_sp_nofeds',
    name: 'sage-pine-final-no-federal-land-combined',
    layer: 'sagepinefinalnofederallandcombined',
    method: 'trails',
    type: 'fill',
    color: 'rgba(255, 0, 255, 0.65)',
    zIndex: 42,
  },
  {
    id: 'trails_spp_nofeds',
    name: 'sage-pine-pinyon-final-no-federal-land-combined',
    layer: 'sagepinepinyonfinalnofederallandcombined',
    method: 'trails',
    type: 'fill',
    color: 'rgba(255, 0, 255, 0.65)',
    zIndex: 43,
  },
  {
    id: 'blm',
    name: 'blm',
    layer: 'blm',
    method: 'federal-lands',
    type: 'fill',
    color: 'rgba(204, 0, 255, 0.65)',
    zIndex: 1,
  },
  {
    id: 'forest',
    name: 'national-forest',
    layer: 'nationalforest',
    method: 'federal-lands',
    type: 'fill',
    color: 'rgba(255, 51, 0, 0.65)',
    zIndex: 2,
  },
  {
    id: 'wilderness',
    name: 'national-wilderness-areas',
    layer: 'nationalwildernessareas',
    method: 'federal-lands',
    type: 'fill',
    color: 'rgba(255, 115, 0, 0.65)',
    zIndex: 3,
  },
  {
    id: 'parks',
    name: 'national-parks',
    layer: 'nationalparks',
    method: 'federal-lands',
    type: 'fill',
    color: 'rgba(255, 145, 118, 0.65)',
    zIndex: 4,
  },
  {
    id: 'divide',
    name: 'continental-divide',
    layer: 'continentaldivide',
    method: 'continental-divide',
    type: 'line',
    color: 'rgba(255, 185, 123, 0.65)',
    zIndex: 50,
  },
  {
    id: 'boiling',
    name: 'boiling',
    source: 'boiling',
    type: 'circle',
    color: 'rgba(255, 0, 0, 0.65)',
    zIndex: 60,
  },
  {
    id: 'hot',
    name: 'hot',
    source: 'hot',
    type: 'circle',
    color: 'rgba(255, 165, 0, 0.65)',
    zIndex: 61,
  },
  {
    id: 'warm',
    name: 'warm',
    source: 'warm',
    type: 'circle',
    color: 'rgba(255, 255, 0, 0.65)',
    zIndex: 62,
  },
];

const BuildLayers = () => _.orderBy(_.map(layers, (layer) => {
  const layerStyle = _.cloneDeep(defaultStyle);

  layerStyle.id = layer.id;
  layerStyle.zIndex = layer.zIndex;
  layerStyle.type = layer.type;

  if (layer.type !== 'circle') {
    layerStyle['source-layer'] = layer.layer;
    layerStyle.source.tiles = buildTileUrls(layer.name, layer.method);
  } else {
    layerStyle.source = layer.source;
  }

  if (layer.type === 'fill') {
    layerStyle.paint['fill-color'] = layer.color;
    layerStyle.paint['fill-opacity'] = 0.65;
  } else if (layer.type === 'line') {
    layerStyle.paint['line-width'] = 4;
    layerStyle.paint['line-color'] = layer.color;
  } else {
    layerStyle.paint['circle-color'] = layer.color;
    layerStyle.paint['circle-opacity'] = 0.65;
    layerStyle.paint['circle-radius'] = 10;
  }

  return layerStyle;
}), 'zIndex');

export default BuildLayers;
