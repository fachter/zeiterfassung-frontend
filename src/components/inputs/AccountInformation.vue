<template>
  <div class="container row d-flex justify-content-center">
    <div class="col-18">
      <h1>Profile</h1>
      <TextInput class="pb-2" :input-field="applicationState.accountInformation.fullName"/>
      <TextInput class="pb-2" :input-field="applicationState.accountInformation.email"/>
      <TextInput class="pb-2" :input-field="applicationState.accountInformation.username"/>
      <div class="row d-flex justify-content-end">
        <button class="col-8 mt-3 btn btn-danger" @click="logOut()">Logout</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import ApplicationState from "../state/ApplicationState";
  import TextInput from "@/components/inputs/TextInput.vue";
  import ChangeAuthenticationState from "@/components/utils/ChangeAuthenticationState";

  @Component({
    components: {TextInput}
  })
  export default class AccountInformation extends Vue {
    applicationState = ApplicationState.accountInfo;

    logOut(): void {
      ChangeAuthenticationState.logout(this.applicationState);
    }
  }
</script>

<style scoped>

</style>