import Vue from 'vue';
import clarityIconsVue from 'clarity-icons-vue';
import { AllShapes } from '@clr/icons/shapes/all-shapes';

import App from './App.vue';

clarityIconsVue.install(Vue);
clarityIconsVue.addShapes(AllShapes);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
