import Vue from 'vue'

import { Pagination, Slider, Checkbox, Radio, Input, Carousel, message } from 'ant-design-vue';


Vue.use(Pagination);
Vue.use(Slider);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(Input);
Vue.use(Carousel);
Vue.prototype.$message = message;

