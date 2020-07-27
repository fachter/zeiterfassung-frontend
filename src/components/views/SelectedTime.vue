<template>
  <div class="m-2">
    <TextInput :input-field="viewModel.startTime"/>
    <TextInput :input-field="viewModel.endTime"/>
    <TextInput :input-field="viewModel.break"/>
    <TextInput :input-field="viewModel.beschreibung"/>
    <TextInput :input-field="viewModel.kunde"/>
    <TextInput :input-field="viewModel.projekt"/>

    <button @click="removeWorkedTime()" class="mt-2 btn btn-outline-danger">Löschen</button>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import TextInput from "../inputs/TextInput.vue";
  import ApplicationState from "@/components/state/ApplicationState";
  import SelectInput from "@/components/inputs/SelectInput.vue";
  import EnterTimeViewModel from "@/components/view-models/EnterTimeViewModel";
  import RouterLink from "@/components/state/RouterLink";
  import moment from "moment";
  import AxiosCaller from "@/components/utils/AxiosCaller";
  import Synchronizer from "@/components/utils/Synchronizer";

  @Component({
    components: {SelectInput, TextInput}
  })
  export default class SelectedTime extends Vue {
    private viewModel: EnterTimeViewModel = new EnterTimeViewModel();
    private data = ApplicationState.data;
    private axiosCaller = new AxiosCaller();

    created() {
      if (ApplicationState.data.selectedTime === null) {
        this.$router.push(RouterLink.ALL_TIMES);
      } else {
        this.setAllFieldsToReadOnly();
        this.setViewModelFromState();
      }
    }

    setViewModelFromState(): void {
      const state = this.data.selectedTime;
      if (state !== null && this.data.selectedTime) {
        this.viewModel.id = this.data.selectedTime.id;
        this.viewModel.startTime.value = moment(this.data.selectedTime.startTime).format("HH:mm");
        this.viewModel.endTime.value = moment(this.data.selectedTime.endTime).format("HH:mm");
        this.viewModel.break.value = this.data.selectedTime.breakInMinutes.toString();
        this.viewModel.beschreibung.value =
          this.data.selectedTime.beschreibung;
        this.viewModel.kunde.value =
          (this.data.selectedTime.kundenViewModel)
            ? this.data.selectedTime.kundenViewModel.kundenName : "";
        this.viewModel.projekt.value =
          (this.data.selectedTime.projektViewModel)
            ? this.data.selectedTime.projektViewModel.projektName : "";
      }
    }

    setAllFieldsToReadOnly(): void {
      this.viewModel.startTime.readOnly = true;
      this.viewModel.endTime.readOnly = true;
      this.viewModel.break.readOnly = true;
      this.viewModel.beschreibung.readOnly = true;
      this.viewModel.kunde.readOnly = true;
      this.viewModel.projekt.readOnly = true;
    }

    async removeWorkedTime() {
      await this.axiosCaller.asyncPostRequest("/delete-times", [this.viewModel.id]);
      const synchronizer = new Synchronizer();
      await synchronizer.fetchTimesForUserAsync();
      ApplicationState.data.selectedTime = null;
      ApplicationState.data.oneDayTimes = [];
      await this.$router.push(RouterLink.ALL_TIMES);
    }
  }
</script>

<style scoped>

</style>