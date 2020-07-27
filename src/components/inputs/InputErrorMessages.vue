<template>
  <div v-if="hasErrors()" class="row">
    <div class="col-8"></div>
    <div class="col-16">
      <input type="hidden" class="is-invalid">

      <ul class="invalid-feedback mb-0 text-left">
        <li v-for="errorMessage in errors" :key="errorMessage" class="ml-0 pl-0">
          {{ errorMessage }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";

  @Component
  export default class InputErrorMessages extends Vue {

    @Prop() errors!: string[];

    hasErrors(): boolean {
      return (this.errors !== null && Array.isArray(this.errors) && this.errors.length > 0);
    }
  }
</script>

<style scoped>
  ul {
    padding-left: 0;
  }
</style>