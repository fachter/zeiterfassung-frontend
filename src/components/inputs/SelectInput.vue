<template>
  <div v-if="inputField !== undefined && inputField !== null">
    <div
        class="form-group row py-2 d-flex align-items-center">
      <div class="mr-sm-2 col-10 d-flex justify-content-end align-items-center pr-3">
        {{inputField.label}}
      </div>
      <select class="custom-select border col-14"
              v-model="inputField.value"
              :id="inputField.name"
              :placeholder="inputField.placeholder"
              :readonly="inputField.readOnly"
              @change="clearFieldErrors()">
        <option value=""/>
        <option v-for="option in inputField.options"
                v-bind:key="getKey(option.value)"
                v-bind:value="option.value">{{ option.text }}
        </option>
      </select>
    </div>
    <InputErrorMessages :errors="inputField.errors"/>
  </div>
</template>

<script lang="ts">
  import {Component, Prop} from "vue-property-decorator";
  import AbstractInput from "@/components/inputs/AbstractInput";
  import InputErrorMessages from "@/components/inputs/InputErrorMessages.vue";

  @Component({
    components: {InputErrorMessages}
  })
  export default class SelectInput extends AbstractInput {
    @Prop() suffix!: string;

    private getKey(value: string|number) {
      if (this.suffix)
        value = this.suffix + value;
      return value;
    }
  }
</script>

<style scoped>

</style>