<template>
  <div v-if="inputField !== undefined && inputField !== null"
       class="form-group row py-1 d-flex align-items-end">

    <span class="col-8">{{inputField.label}}</span>
    <div class="col-10">
      <datetime v-model="inputField.value" type="datetime"></datetime>
    </div>

    <button class="ml-2 col-4 btn-sm btn-outline-primary"
            @click="setCurrentTime()">Now
    </button>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import FieldViewModel from "@/components/view-models/FieldViewModel";
  import ChangeTimeCommand from "@/components/utils/ChangeTimeCommand";
  import {Datetime} from "vue-datetime";

  @Component({
    components: {
      datetime: Datetime
    }
  })
  export default class DateTimeWithNowButton extends Vue {
    @Prop() private inputField!: FieldViewModel;
    @Prop() private onChangeCommand!: ChangeTimeCommand;

    updated() {
      this.onChangeCommand.execute();
    }

    setCurrentTime() {
      this.inputField.value = new Date(Date.now()).toISOString();
    }
  }
</script>

<style scoped>
  div.vdatetime-input {
    font-family: arial, sans-serif;
  }
</style>