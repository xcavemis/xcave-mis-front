import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { gsap } from "gsap";

Vue.config.productionTip = false

window.gtagEvent = function(category, action, label){
  gtag('event', action, {
    'event_category': category,
    'event_label': label
  });
};
window.gtagPageView = function(title, path){
  gtag('config', 'UA-175794911-1', {
    'page_title' : title,
    'page_path': path
  });
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
