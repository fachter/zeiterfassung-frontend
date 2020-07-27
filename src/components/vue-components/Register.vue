<template>
  <div class="container row d-flex justify-content-center">
    <form @submit.prevent="registerNewUser()" class="col-18">
      <h1>Register</h1>
      <TextInput class="pb-2" :input-field="viewModel.fullName"/>
      <TextInput class="pb-2" :input-field="viewModel.email"/>
      <TextInput class="pb-2" :input-field="viewModel.username"/>
      <PasswodInput :input-field="viewModel.password"/>
      <PasswodInput :input-field="viewModel.repeatPassword"/>
      <div class="row d-flex justify-content-end">
        <button class="col-8 mt-3 btn btn-primary" >Register</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import TextInput from "@/components/inputs/TextInput.vue";
  import PasswodInput from "@/components/inputs/PasswodInput.vue";
  import RegisterViewModel from "@/components/view-models/RegisterViewModel";
  import axios from "axios";
  import RegisterValidator from "@/components/utils/RegisterValidator";
  import ErrorMessages from "@/components/state/ErrorMessages";
  import ViewModelErrors from "@/components/utils/ViewModelErrors";
  import ApplicationState from "@/components/state/ApplicationState";
  import ChangeAuthenticationState from "@/components/utils/ChangeAuthenticationState";

  @Component({
    components: {PasswodInput, TextInput}
  })
  export default class Register extends Vue {
    private viewModel: RegisterViewModel = new RegisterViewModel();
    private registerValidator: RegisterValidator = new RegisterValidator(this.viewModel);
    private applicationState = ApplicationState.accountInfo;

    registerNewUser(): void {
      if (!ViewModelErrors.viewModelHasErrors(this.viewModel) && this.registerValidator.isValid()) {
        axios.post("/register", {
          username: this.viewModel.username.value,
          password: this.viewModel.password.value,
          fullName: this.viewModel.fullName.value,
          email: this.viewModel.email.value
        })
          .then((result) => {
            ChangeAuthenticationState.login(this.applicationState, result.data);
          })
          .catch((err) => {
            alert(ErrorMessages.USERNAME_ALREADY_EXISTS);
            this.viewModel.username.errors.push(ErrorMessages.USERNAME_ALREADY_EXISTS);
            console.log(err);
            console.log(err.response);
          })
      } else {
        alert("Invalid Data");
      }
    }
  }
</script>

<style scoped>

</style>