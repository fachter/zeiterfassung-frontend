<template>
  <div>
    <div class="mt-3" v-if="!applicationState.loggedIn">
      <toggle-button v-model="isRegister"
                     :width="100"
                     :color="{checked: '#007bff', unchecked: '#28a745', disabled: '#CCCCCC'}"
                     :labels="{checked: 'Register', unchecked: 'Login'}"/>

      <Register v-if="isRegister"/>
      <Login v-else/>
    </div>
    <div v-else>
      <AccountInformation/>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import ApplicationState from "@/components/state/ApplicationState";
  import AccountInformation from "@/components/inputs/AccountInformation.vue";
  import Login from "@/components/vue-components/Login.vue";
  import Register from "@/components/vue-components/Register.vue";

  @Component({
    components: {Register, Login, AccountInformation}
  })
  export default class Account extends Vue {
    private applicationState = ApplicationState.accountInfo;
    private isRegister = false;
  }
</script>

<style scoped>

</style>