<template>
  <div id="app">
    <div id="nav" v-if="state.loggedIn">
      <router-link :to="links.HOME">Dashboard</router-link> |
      <router-link :to="links.ZEITERFASSUNG">Erfassen</router-link> |
      <router-link :to="links.ALL_TIMES">Zeiten</router-link> |
      <router-link :to="links.STATISTIK">Statistik</router-link>
      <div>
        <router-link :to="links.SETTINGS">Einstellungen</router-link> |
        <router-link :to="links.ACCOUNT">Account</router-link>

      </div>
    </div>
    <router-view :key="this.$route.path"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from "vue-property-decorator";
  import ApplicationState from "@/components/state/ApplicationState";
  import RouterLink from "@/components/state/RouterLink";
  import Synchronizer from "@/components/utils/Synchronizer";

  @Component
  export default class App extends Vue {
    private state = ApplicationState.accountInfo;
    private links = RouterLink;
    private dataFetched = false;

    updated() {
      this.redirectToLoginIfNotLoggedIn()
    }

    redirectToLoginIfNotLoggedIn() {
      if (this.$route.path !== RouterLink.ACCOUNT && (!ApplicationState.accountInfo.loggedIn)) {
        this.$router.replace(RouterLink.ACCOUNT);
      } else if (!this.dataFetched && ApplicationState.accountInfo.loggedIn) {
        this.fetchData();
      }
    }

    created() {
      this.redirectToLoginIfNotLoggedIn()
    }

    private fetchData() {
      this.dataFetched = true;
      const synchronizer = new Synchronizer();
      synchronizer.fetchTimesForUser();
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 25px;
    background-color: lightgray;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
    font-size: large;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
