<template>
  <label v-if="inputField !== undefined && inputField !== null"
         class="form-group row py-1 d-flex align-items-end">
    <span class="col-8">{{inputField.label}}</span>
    <input type="text" class="border col-10"
           :id="inputField.name"
           v-model="inputField.value"
           :placeholder="inputField.placeholder"
           :readonly="inputField.readOnly"
           @blur="clearFieldErrors()"
           @change="onChangeCommand.execute()">
    <span class="ml-2 col-4"></span>
  </label>
</template>

<script lang="ts">
  import {Component, Prop} from "vue-property-decorator";
  import AbstractInput from "@/components/inputs/AbstractInput";
  import ChangeTimeCommand from "@/components/utils/ChangeTimeCommand";

  @Component
  export default class TextInputWithRightSpace extends AbstractInput {
    @Prop() private onChangeCommand!: ChangeTimeCommand;
  }
</script>

<style scoped>

</style>