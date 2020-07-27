<template>
  <div class="mx-5">
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">Settings</th>
      </tr>
      </thead>
      <tbody>
      <tr @click="redirectToSettings(links.KUNDEN_CONFIG)">
        <td>Kunden</td>
      </tr>
      <tr @click="redirectToSettings(links.PROJEKTE_CONFIG)">
        <td>Projekte</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import RouterLink from "@/components/state/RouterLink";

  @Component
  export default class Settings extends Vue {
    links = RouterLink;

    redirectToSettings(link: string): void {
      this.$router.push(link);
    }
  }
</script>

<style scoped>

</style>