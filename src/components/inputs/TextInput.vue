<template>
  <div v-if="inputField !== undefined && inputField !== null">
    <div class="form-group row py-1 d-flex align-items-center">
      <span class="col-8">{{inputField.label}}</span>
      <input type="text" class="border col-16"
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
  import {Component} from "vue-property-decorator";
  import InputErrorMessages from "@/components/inputs/InputErrorMessages.vue";
  import AbstractInput from "@/components/inputs/AbstractInput";

  @Component({
    components: {InputErrorMessages}
  })
  export default class TextInput extends AbstractInput {}
</script>

<style scoped>

</style>