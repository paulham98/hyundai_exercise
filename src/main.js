import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/dashboard.js'
import $ from 'jquery'
import MyPlugins from '@/plugin'
import VueCompositionApi from '@vue/composition-api'
import {store} from './store'

// import "../public/css/reset.css";
// import { fn } from '/public/js/myFunc.js';
//
// Vue.prototype.$fn = fn
// import slick from 'public/js/slick.js'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

// import ECharts modules manually to reduce bundle size
import {
    CanvasRenderer
} from 'echarts/renderers'
import {
    BarChart,
    PieChart,
    LineChart
} from 'echarts/charts'
import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
    LegendComponent,
    DataZoomComponent,
    ToolboxComponent
} from 'echarts/components'

use([
    CanvasRenderer,
    BarChart,
    PieChart,
    LineChart,
    GridComponent,
    TooltipComponent,
    TitleComponent,
    LegendComponent,
    DataZoomComponent,
    ToolboxComponent,

]);

// register globally (or you can do it locally)
Vue.component('v-chart', ECharts)
$

Vue.use(MyPlugins)
Vue.use(VueCompositionApi)


Vue.component('modal', {
    // template: '#madal-template'
})

Vue.config.productionTip = false
new Vue({
    render: h => h(App),
    router,
    store,
    template: '<App/>',
    data: {
        showModal: false
    }
}).$mount('#app')
