<template>
  <div v-if="inputField !== undefined && inputField !== null">
    <div class="form-group row py-1 d-flex align-items-center">
      <label class="col-8" :for="inputField.name">{{inputField.label}}</label>
      <input type="password" class="border col-16"
             :id="inputField.name"
             v-model="inputField.value"
             :placeholder="inputField.placeholder"
             :readonly="inputField.readOnly"
             @blur="clearFieldErrors()">

    </div>
    <InputErrorMessages :errors="inputField.errors"/>
  </div>
</template>

<script lang="ts">
  import {Component, Prop} from "vue-property-decorator";
  import FieldViewModel from "@/components/view-models/FieldViewModel";
  import InputErrorMessages from "@/components/inputs/InputErrorMessages.vue";
  import AbstractInput from "@/components/inputs/AbstractInput";

  @Component({
    components: {InputErrorMessages}
  })
  export default class PasswordInput extends AbstractInput {
    @Prop() inputField!: FieldViewModel;
  }
</script>

<style scoped>
</style>