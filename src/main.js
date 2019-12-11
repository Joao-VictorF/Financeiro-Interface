import Vue from 'vue';
// import VeeValidate from 'vee-validate';
import VueTheMask from 'vue-the-mask';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueTheMask);
// Vue.use(VeeValidate);

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const auth = window.sessionStorage.getItem('auth');
    if (auth) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
