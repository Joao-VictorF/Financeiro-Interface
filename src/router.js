import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/Login.vue';

import Folhas from './views/Folhas.vue';
import Resumo from './views/Resumo.vue';
import Funcionarios from './views/Funcionarios.vue';
import Perfil from './views/Perfil.vue';
import NovoFuncionario from './views/NovoFuncionario.vue';
import NovaFolha from './views/NovaFolha.vue';
import Movimentos from './views/Movimentos.vue';
import NovoMovimento from './views/NovoMovimento.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Sistema RH',
      component: Login,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/funcionarios',
      name: 'funcionarios',
      component: Funcionarios,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/novo-funcionario',
      name: 'novo-funcionario',
      component: NovoFuncionario,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/folhas',
      name: 'folhas',
      component: Folhas,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/nova-folha',
      name: 'nova-folha',
      component: NovaFolha,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/movimentos',
      name: 'movimentos',
      component: Movimentos,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/novo-movimento',
      name: 'novo-movimento',
      component: NovoMovimento,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/resumo',
      name: 'resumo',
      component: Resumo,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/meu-perfil',
      name: 'meu-perfil',
      component: Perfil,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/funcionario/:id',
      name: 'funcionario-perfil',
      component: NovoFuncionario,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
