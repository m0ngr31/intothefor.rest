<template>
  <div id="app" class="main-container">
    <header class="header header-2">
      <div class="branding">
        <div class="nav-link">
          <clr-icon-vue shape="map" class="is-solid"></clr-icon-vue>
        </div>
        <div class="title">Into the Forrest</div>
      </div>
    </header>
    <mapbox
      :access-token="appToken"
      :map-options="mapOptions"
      @map-init="mapInit"
    ></mapbox>
    <div class="card layerCard">
      <div class="card-header">
        <div class="row">
          <div class="clr-col-10 inlineBlock">
            <h3 class="modal-title mt-8">Map Controls</h3>
          </div>
          <div class="clr-col-2 text-right inlineBlock">
            <button class="btn btn-link btn-sm" type="button" @click="toggleCard()">
              <clr-icon-vue shape="resize-down"></clr-icon-vue>
            </button>
          </div>
        </div>
      </div>
      <div class="card-block insideBlock" v-show="showMapCard">
        <div class="card-title">
          Map Type
        </div>
        <div class="card-text">
          <div class="checkbox">
            <input type="checkbox" id="map_type" @change="mapToggle()" autocomplete="off">
            <label for="map_type">Satellite</label>
          </div>
        </div>
        <div class="card-title">
          Elevation <span style="color: #00FFFF">&#9632;</span>
          <clr-icon-vue shape="info-circle" :size=16 class="tooltip" title="Everything between 5,000 and 10,200 ft. elevation."></clr-icon-vue>
        </div>
        <div class="card-text mb-10">
          <div class="checkbox">
            <input type="checkbox" id="elevation" @change="layerChanged('elevation')" autocomplete="off">
            <label for="elevation">5,000-10,200 ft.</label>
          </div>
        </div>
        <div class="card-title">
          Vegetation <span style="color: #00FF00">&#9632;</span>
          <clr-icon-vue shape="info-circle" :size=16 class="tooltip" title="Everywhere named vegitation intersects within 500 ft. of each other and falls inside elevation range."></clr-icon-vue>
        </div>
        <div class="card-text">
          <div class="checkbox">
            <input type="checkbox" id="vegetation_sp" @change="layerChanged('vegetation_sp')" autocomplete="off">
            <label for="vegetation_sp">Sage/Pine</label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="vegetation_spp" @change="layerChanged('vegetation_spp')" autocomplete="off">
            <label for="vegetation_spp">Sage/Pine/Pinyon</label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="vegetation_sp_nofeds" @change="layerChanged('vegetation_sp_nofeds')" autocomplete="off">
            <label for="vegetation_sp_nofeds">Sage/Pine - No Federal Lands</label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="vegetation_spp_nofeds" @change="layerChanged('vegetation_spp_nofeds')" autocomplete="off">
            <label for="vegetation_spp_nofeds">Sage/Pine/Pinyon - No Federal Lands</label>
          </div>
        </div>
        <div class="card-title">
          Trails Method <span style="color: #FF00FF">&#9632;</span>
          <clr-icon-vue shape="info-circle" :size=16 class="tooltip" title="Within 500 ft. of a trail with a 300 ft. buffer on each side removed. Inside elevation and vegitation layers."></clr-icon-vue>
        </div>
        <div class="card-text">
          <div class="checkbox">
            <input type="checkbox" id="trails_sp" @change="layerChanged('trails_sp')" autocomplete="off">
            <label for="trails_sp">Sage/Pine</label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="trails_spp" @change="layerChanged('trails_spp')" autocomplete="off">
            <label for="trails_spp">Sage/Pine/Pinyon</label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="trails_sp_nofeds" @change="layerChanged('trails_sp_nofeds')" autocomplete="off">
            <label for="trails_sp_nofeds">Sage/Pine - No Federal Lands</label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="trails_spp_nofeds" @change="layerChanged('trails_spp_nofeds')" autocomplete="off">
            <label for="trails_spp_nofeds">Sage/Pine/Pinyon - No Federal Lands</label>
          </div>
        </div>
        <div class="card-title">
          Roads Method <span style="color: #FFFF00">&#9632;</span>
          <clr-icon-vue shape="info-circle" :size=16 class="tooltip" title="Within 3 miles of a road. Inside elevation and vegitation layers."></clr-icon-vue>
        </div>
        <div class="card-text">
          <div class="checkbox">
            <input type="checkbox" id="roads_sp" @change="layerChanged('roads_sp')" autocomplete="off">
            <label for="roads_sp">Sage/Pine</label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="roads_spp" @change="layerChanged('roads_spp')" autocomplete="off">
            <label for="roads_spp">Sage/Pine/Pinyon</label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="roads_sp_nofeds" @change="layerChanged('roads_sp_nofeds')" autocomplete="off">
            <label for="roads_sp_nofeds">Sage/Pine - No Federal Lands</label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="roads_spp_nofeds" @change="layerChanged('roads_spp_nofeds')" autocomplete="off">
            <label for="roads_spp_nofeds">Sage/Pine/Pinyon - No Federal Lands</label>
          </div>
        </div>
        <div class="card-title">
          Federal Land
          <clr-icon-vue shape="info-circle" :size=16 class="tooltip" title="Areas owned by the Federal Government"></clr-icon-vue>
        </div>
        <div class="card-text">
          <div class="checkbox">
            <input type="checkbox" id="forest" @change="layerChanged('forest')" autocomplete="off">
            <label for="forest">National Forests <span style="color: #FF3300">&#9632;</span></label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="parks" @change="layerChanged('parks')" autocomplete="off">
            <label for="parks">National Parks <span style="color: #FF9176">&#9632;</span></label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="blm" @change="layerChanged('blm')" autocomplete="off">
            <label for="blm">BLM <span style="color: #CC00FF">&#9632;</span></label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="wilderness" @change="layerChanged('wilderness')" autocomplete="off">
            <label for="wilderness">National Wilderness <span style="color: #FF7300">&#9632;</span></label>
          </div>
        </div>
        <div class="card-title">
          Continental Divide <span style="color: #FFB97B">&#9632;</span>
        </div>
        <div class="card-text">
          <div class="checkbox">
            <input type="checkbox" id="divide" @change="layerChanged('divide')" autocomplete="off">
            <label for="divide">Continental Divide</label>
          </div>
        </div>
        <div class="card-title">
           Geo-Thermal Springs
           <clr-icon-vue shape="info-circle" :size=16 class="tooltip" title="Geo-Thermal Springs grouped by Boiling, Hot, and Warm groups"></clr-icon-vue>
        </div>
        <div class="card-text">
          <div class="checkbox">
            <input type="checkbox" id="boiling" @change="layerChanged('boiling')" autocomplete="off">
            <label for="boiling">Boiling <span style="color: red">&#9632;</span></label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="hot" @change="layerChanged('hot')" autocomplete="off">
            <label for="hot">Hot <span style="color: orange">&#9632;</span></label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="warm" @change="layerChanged('warm')" autocomplete="off">
            <label for="warm">Warm <span style="color: yellow">&#9632;</span></label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable class-methods-use-this */

import Vue from 'vue';
import Component from 'vue-class-component';
import Mapbox from 'mapbox-gl-vue';
import _ from 'lodash';

import BuildLayers from '@/services/VectorLayers';

require('tooltipster');

@Component({
  name: 'app',
  components: { Mapbox },
})
export default class App extends Vue {
  showGoogle = false;
  showDropdown = false;
  showMapCard = true;
  showRouterCard = false;
  isLoading = false;
  searchFeature = '';
  searchGoogle = '';
  layers = BuildLayers();
  map = null;

  visibleDict = {
    visible: true,
    none: false,
  };

  mapStyles = [
    {
      style: 'mapbox://styles/mapbox/outdoors-v11',
      active: true,
    },
    {
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      active: false,
    },
  ];

  appToken = process.env.VUE_APP_MAPBOX_TOKEN;

  mapOptions = {
    style: this.mapStyles[0].style,
    center: [-110.655, 42.3223],
    zoom: 5,
    hash: 'map',
  };

  mounted() {
    $('.tooltip').tooltipster({
      theme: 'tooltipster-borderless',
      delay: 150,
      side: 'bottom',
      maxWidth: 200,
    });
  }

  mapInit(map) {
    this.map = map;

    map.on('style.load', () => {
      const waiting = () => {
        if (!map.isStyleLoaded()) {
          setTimeout(waiting, 100);
        } else {
          this.mapLoaded(map);
        }
      };

      waiting();
    });
  }

  mapLoaded(map) {
    map.addSource('boiling', {
      type: 'geojson',
      data: 'https://geojson-forrest.s3.amazonaws.com/boiling-geothermal.geojson',
    });
    map.addSource('hot', {
      type: 'geojson',
      data: 'https://geojson-forrest.s3.amazonaws.com/hot-geothermal.geojson',
    });
    map.addSource('warm', {
      type: 'geojson',
      data: 'https://geojson-forrest.s3.amazonaws.com/warm-geothermal.geojson',
    });

    _.forEach(this.layers, layer => map.addLayer(layer));

    map.on('click', 'boiling', event => this.geothermal(event));
    map.on('click', 'hot', event => this.geothermal(event));
    map.on('click', 'warm', event => this.geothermal(event));

    map.on('mouseenter', 'boiling', () => { this.map.getCanvas().style.cursor = 'pointer'; });
    map.on('mouseenter', 'hot', () => { this.map.getCanvas().style.cursor = 'pointer'; });
    map.on('mouseenter', 'warm', () => { this.map.getCanvas().style.cursor = 'pointer'; });

    map.on('mouseleave', 'boiling', () => { this.map.getCanvas().style.cursor = ''; });
    map.on('mouseleave', 'hot', () => { this.map.getCanvas().style.cursor = ''; });
    map.on('mouseleave', 'warm', () => { this.map.getCanvas().style.cursor = ''; });

    this.parseHash();
  }

  geothermal(e) {
    const features = _.filter(this.map.queryRenderedFeatures(e.point), feature =>
      feature.properties && feature.properties.name);

    if (!features.length) {
      return;
    }

    const featureData = features[0].properties;

    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(`Name: ${featureData.name}<br/>State: ${featureData.state}<br/>Temp: ${featureData.tempF}&#8457;, ${featureData.tempC}&#8451;`)
      .addTo(this.map);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleCard() {
    this.showMapCard = !this.showMapCard;
    this.showRouterCard = !this.showRouterCard;
  }

  layerChanged(layerId) {
    const layer = _.find(this.layers, { id: layerId });

    if (!layer) {
      return;
    }

    _.defer(() => {
      try {
        if (layer.layout.visibility === 'none') {
          this.map.setLayoutProperty(layer.id, 'visibility', 'visible');
          layer.layout.visibility = 'visible';
        } else {
          this.map.setLayoutProperty(layer.id, 'visibility', 'none');
          layer.layout.visibility = 'none';
        }

        this.updateHash();
      } catch (e) {
        // Do nothing
      }
    });
  }

  mapToggle() {
    if (this.mapStyles[0].active) {
      this.mapStyles[0].active = false;
      this.mapStyles[1].active = true;
      this.map.setStyle(this.mapStyles[1].style);
    } else {
      this.mapStyles[0].active = true;
      this.mapStyles[1].active = false;
      this.map.setStyle(this.mapStyles[0].style);
    }
  }

  parseHash() {
    const [, layers] = window.location.hash.split('&layers=');

    if (!layers || !layers.length) {
      return;
    }

    const layerIds = layers.split(',');

    _.forEach(layerIds, (layerId) => {
      const layer = _.find(this.layers, { id: layerId });

      if (layer) {
        try {
          $(`#${layerId}`)[0].checked = true;
          this.map.setLayoutProperty(layerId, 'visibility', 'visible');
          layer.layout.visibility = 'visible';
        } catch (e) {
          // Do nothing
        }
      }
    });
  }

  updateHash() {
    const [mapHash] = window.location.hash.split('&');
    let layersStr = '';

    _.forEach(this.layers, (layer) => {
      if (layer.layout.visibility === 'visible') {
        layersStr += `${layer.id} `;
      }
    });

    if (layersStr.length) {
      layersStr = `&layers=${layersStr.trim().replace(/ /g, ',')}`;
    }

    window.location.hash = `${mapHash}${layersStr}`;
  }
}
</script>

<style>
@import '~@clr/ui/clr-ui.css';
@import '~mapbox-gl/dist/mapbox-gl.css';
@import '~tooltipster/dist/css/tooltipster.bundle.min.css';
@import '~tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-borderless.min.css';

html, body, #map {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-y: hidden;
}
#map {
  position: relative;
}
.layerCard {
  position: absolute;
  top: 50px;
  left: 15px;
  z-index: 8888;
  width:400px;
}
.mt-8 {
  margin-top: 8px;
}
.mb-10 {
  margin-bottom: 10px;
}
.mb-80 {
  margin-bottom: 80px!important;
}
.no-border {
  border: none;
}
.text-right {
  text-align: right;
}
.insideBlock {
  height: 200px;
  overflow-y: auto;
}
.insideRouterBlock {
  max-height: 500px;
  overflow-y: auto;
}
.inlineBlock {
  display: inline-block;
}
button:active, button:focus, clr-icon:active, clr-icon:focus {
  border: none !important;
  outline: none !important;
}
</style>
