<template>
  <div class="container row d-flex justify-content-center">
    <form v-on:submit.prevent="authenticate" class="col-18">
      <h1>Login</h1>
      <TextInput :input-field="viewModel.username"/>
      <PasswodInput :input-field="viewModel.password"/>
      <div class="row d-flex justify-content-end">
        <button class="col-8 mt-3 btn btn-success">Login</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import TextInput from "@/components/inputs/TextInput.vue";
  import AuthenticationViewModel from "@/components/view-models/AuthenticationViewModel";
  import PasswodInput from "@/components/inputs/PasswodInput.vue";
  import axios from "axios";
  import ApplicationState from "@/components/state/ApplicationState";
  import ChangeAuthenticationState from "@/components/utils/ChangeAuthenticationState";

  @Component({
    components: {PasswodInput, TextInput}
  })
  export default class Login extends Vue {
    private viewModel: AuthenticationViewModel = new AuthenticationViewModel();
    private applicationState = ApplicationState.accountInfo;

    authenticate(): void {
      axios.post("/authenticate", {
        username: this.viewModel.username.value,
        password: this.viewModel.password.value
      })
      .then((result) => {
        ChangeAuthenticationState.login(this.applicationState, result.data);
      })
      .catch(() => {
        this.viewModel.password.errors = [
          "Falscher username oder Passwort"
        ];
      })
    }
  }
</script>

<style scoped>

</style>