import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from "@/components/views/Home.vue";
import Zeiterfassung from "@/components/views/Zeiterfassung.vue";
import AllTimes from "@/components/views/AllTimes.vue";
import Statistik from "@/components/views/Statistik.vue";
import Settings from "@/components/views/Settings.vue";
import SelectedTimes from "@/components/views/SelectedTimes.vue";
import SelectedTime from "@/components/views/SelectedTime.vue";
import Account from "@/components/views/Account.vue";
import KundenConfig from "@/components/views/settings/KundenConfig.vue";
import ProjekteConfig from "@/components/views/settings/ProjekteConfig.vue";
import RouterLink from "@/components/state/RouterLink";

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: RouterLink.HOME,
    name: 'Home',
    component: Home
  },
  {
    path: RouterLink.ZEITERFASSUNG,
    name: 'Zeiterfassung',
    component: Zeiterfassung
  },
  {
    path: RouterLink.ALL_TIMES,
    name: 'Zeiten',
    component: AllTimes
  },
  {
    path: RouterLink.STATISTIK,
    name: 'Statistik',
    component: Statistik
  },
  {
    path: RouterLink.SETTINGS,
    name: 'Settings',
    component: Settings
  },
  {
    path: RouterLink.TIMES_SELECTED,
    name: 'SelectedTimes',
    component: SelectedTimes
  },
  {
    path: RouterLink.TIME_SELECTED,
    name: 'Time',
    component: SelectedTime
  },
  {
    path: RouterLink.ACCOUNT,
    name: 'AccountSettings',
    component: Account
  },
  {
    path: RouterLink.KUNDEN_CONFIG,
    name: 'KundenSettings',
    component: KundenConfig
  },
  {
    path: RouterLink.PROJEKTE_CONFIG,
    name: 'ProjekteSettings',
    component: ProjekteConfig
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
