<template>
  <div v-if="inputField !== undefined && inputField !== null">
    <div class="form-group row py-1 d-flex align-items-center">
      <div class="mr-sm-2 col-10 d-flex justify-content-end align-items-center pr-3">
        {{inputField.label}}
      </div>
      <textarea type="text" class="border col-14"
                rows="3"
                :id="inputField.name"
                v-model="inputField.value"
                :placeholder="inputField.placeholder"
                :readonly="inputField.readOnly"
                @blur="clearFieldErrors()" />
    </div>


    <InputErrorMessages :errors="inputField.errors"/>
  </div>
</template>

<script lang="ts">
  import {Component} from "vue-property-decorator";
  import AbstractInput from "@/components/inputs/AbstractInput";
  import InputErrorMessages from "@/components/inputs/InputErrorMessages.vue";

  @Component({
    components: {InputErrorMessages}
  })
  export default class TextAreaInput extends AbstractInput {
  }
</script>

<style scoped>

</style>