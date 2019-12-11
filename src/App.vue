<template>
  <v-app v-if="withAuth" id="app">
    <v-navigation-drawer
      app v-model="drawer" clipped
      :mini-variant.sync="mini"
      permanent color="#0a9d7f">

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item class="sidebar-link-box"
          v-for="item in navItems" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon class="sidebar-icons">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="sidebar-link">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left fixed >
      <v-btn icon @click.stop="mini = !mini">
        <v-icon class="icon-color-blue drawer-btn">mdi-menu</v-icon>
      </v-btn>

      <v-divider class="mx-4 vertical-divider" inset vertical></v-divider>

      <v-spacer></v-spacer>

      <v-btn icon @click="fullscreenBtnClick()">
        <v-icon class="icon-color-blue">mdi-arrow-expand-all</v-icon>
      </v-btn>

      <v-divider class="mx-4 vertical-divider" inset vertical></v-divider>

      <v-avatar color="#21bbcd" class="avatar" size="40">
        <img v-if="imgUrl" :src="imgUrl" >
        <span v-else class="white--text">{{nameAbbreviation}}</span>
      </v-avatar>

      <v-menu bottom offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on }">
            <h5 class="full-name" v-on="on">
              {{username}}
              <v-icon class="icon-color-blue">mdi-chevron-down</v-icon>
            </h5>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in subItems" :key="index" :to="item.to" link>
            <v-list-item-title>
              <v-icon>{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-list-item-title>

          </v-list-item>
          <v-list-item link>
            <v-list-item-title @click="logout()">
              <v-icon>mdi-logout</v-icon>
              Sair
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content app>
      <v-container class="main-content" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>

  <v-app v-else id="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      withAuth: true,
      isMobile: false,
      fullscreen: false,
      drawer: false,
      mini: true,
      navItems: [
        { title: 'Folhas de Pagamento', icon: 'mdi-file-outline', to: '/folhas' },
        { title: 'Funcionários', icon: 'mdi-account-badge-outline', to: '/funcionarios' },
        { title: 'Movimentos', icon: 'mdi-credit-card-multiple-outline', to: '/movimentos' },
        { title: 'Resumo', icon: 'mdi-chart-arc', to: '/configuracoes' },
      ],
      subItems: [
        { title: 'Meus Dados', icon: 'mdi-account', to: '/meu-perfil' },
      ],
      username: null,
      imgUrl: null,
      nameAbbreviation: null,
    };
  },
  methods: {
    fullscreenBtnClick() {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    },
    logout() {
      this.$router.push('/login');
      sessionStorage.removeItem('auth');
      sessionStorage.removeItem('name');
      sessionStorage.removeItem('address');
      sessionStorage.removeItem('bio');
      sessionStorage.removeItem('birthday');
      sessionStorage.removeItem('cep');
      sessionStorage.removeItem('country');
      sessionStorage.removeItem('crn');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('gender');
      sessionStorage.removeItem('personalLogo');
      sessionStorage.removeItem('phone');
      sessionStorage.removeItem('photo');
      sessionStorage.removeItem('state');
      sessionStorage.removeItem('firstName');
      sessionStorage.removeItem('lastName');
    },
  },
  mounted() {
    if (this.$route.meta.requiresAuth === true) {
      if (this.username == null) {
        this.username = window.sessionStorage.getItem('name');
        this.imgUrl = window.sessionStorage.getItem('photo');
        const firstName = window.sessionStorage.getItem('firstName');
        const lastName = window.sessionStorage.getItem('lastName');
        this.nameAbbreviation = `${firstName[0]}${lastName[0]}`;
      }
      this.withAuth = true;
    } else {
      this.withAuth = false;
    }
  },
  watch: {
    // eslint-disable-next-line func-names
    '$route.meta.requiresAuth': function (requiresAuth) {
      if (requiresAuth === true) {
        if (this.username == null) {
          this.username = window.sessionStorage.getItem('name');
          this.imgUrl = window.sessionStorage.getItem('photo');
          const firstName = window.sessionStorage.getItem('firstName');
          const lastName = window.sessionStorage.getItem('lastName');
          this.nameAbbreviation = `${firstName[0]}${lastName[0]}`;
        }
        this.withAuth = true;
      } else if (requiresAuth === false) {
        this.withAuth = false;
      }
    },
  },
};
</script>

<style>
  #app {
    font-family: 'Muli', 'Roboto', sans-serif;
  }
  .v-toolbar__content > .v-btn.v-btn--icon:first-child {
    margin-left: -1px !important;
  }
  .v-application ul {
    padding-left: 0px !important;
  }
  .theme--light.v-divider {
    border-width: 1px;
  }
  .theme--light.v-application {
    background: #edf3f4 !important;
  }
  .v-application .title {
    font-size: 36px !important;
  }
  .v-input {
    margin: 8px;
    margin-bottom: -10px;
  }
  .v-expansion-panel {
    margin-bottom: 10px;
    border-radius: 8px !important;
  }
  .v-expansion-panels--popout .v-expansion-panel--active {
    max-width: 100 !important;
  }
  .v-tab {
    border: 1px solid #989898;
    border-bottom: 0;
    border-radius: 8px;
    margin: 0 4px;
    font-size: 15px !important;
    font-weight: 800 !important;
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  }
  .v-tab--active {
    color: white !important;
    background-color: #21bbcd;
    border: 1px solid #21bbcd;
  }
  .v-tab:first-child {
    margin-left: 0px !important;
  }
  .v-stepper, .v-stepper__header {
    box-shadow: none !important;
  }
  .v-stepper .v-stepper__label {
    text-align: center;
  }
  /* SIDEBAR */
  .logo-box {
    display: flex;
    justify-content: center;
  }
  .logo {
    margin-top: 25px;
    margin-bottom: 25px;
    min-width: 70px;
  }
  .sidebar-icons {
    color: #ffffff !important;
  }
  .sidebar-link {
    color: #ffffff;
    font-size: 18px !important;
    font-weight: bold;
  }
  .v-list-item {
    width: 90%;
    margin: 0 auto;
  }
  .v-list-item--active {
    background-color: #e7eced !important;
    border-radius: 8px !important;
  }
  .v-list-item--active .v-list-item__icon i{
    color: #4a4a4a !important;
  }
  .v-list-item--active .v-list-item__content .sidebar-link{
    color: #4a4a4a !important;
  }
  /* NAVBAR */
  .nav-search-input .v-input__slot {
    background-color: #edf3f4 !important;
    border-radius: 8px !important;
    margin: .5rem;
  }
  .v-menu__content {
    width: 190px;
  }
  .search-input:focus {
    outline: none;
  }
  .drawer-btn {
    margin-left: -1px !important;
  }
  .icon-color-blue {
    color: #21bbcd !important;
  }
  .workspace-icon {
    margin-right: 30px;
  }
  .vertical-divider {
    color: #979797 !important;
  }
  .avatar {
    margin-left: 20px;
    margin-right: 10px;
  }
  .full-name {
    height: 26px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.44;
    letter-spacing: normal;
    color: #4a4a4a;
  }
  .main-content {
    padding: 0!important;
  }
  .emoji {
    font-size: 20pt;
  }
  .restaurantStatus {
    align-items: center;
  }
  .restaurantStatus span {
    color: #4a4a4a;
  }
  .restaurantStatus .v-select .v-input__control .v-input__slot {
    margin: 20px 0 0 20px;
    min-height: 35px !important;
  }
  @media(max-width: 500px) {
    .full-name {
      font-size: 13px;
    }
  }
</style>
