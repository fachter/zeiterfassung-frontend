<template>
  <div class="time-management">
    <h1>Zeit eingeben</h1>
    <div v-if="noCustomerOrProjectConfigured()">
      <span class="largerSpan">!</span><br>
      <span>Sie müssen zuerst mind. einen Kunden und mind. ein Projekt unter dem Menüpunkt Einstellungen konfigurieren</span><br>
      <span class="largerSpan">!</span>
    </div>
    <div class="row d-flex justify-content-start">
      <div class="col-24">
        <DateTimeWithNowButton :input-field="viewModel.startTime" :on-change-command="changeTimeCommand"/>
      </div>
      <div class="col-24">
        <DateTimeWithNowButton :input-field="viewModel.endTime" :on-change-command="changeTimeCommand"/>
      </div>
      <TextInputWithRightSpace class="col-24" :input-field="viewModel.break" :on-change-command="changeTimeCommand"/>
    </div>

    <hr>
    <div>
      <TextInputWithRightSpace class="col-24" :input-field="viewModel.fullTime"/>
      <TextInputWithRightSpace class="col-24" :input-field="viewModel.timeWithoutBreak"/>
    </div>
    <hr>
    <button class="ml-2 btn btn-outline-success" :data-toggle="getDataToggle()" data-target="#projectSelectionModal"
            @click="clickHinzufuegen()" :class="{disabled: !timeIsFilled()}">Hinzufügen
    </button>
    <ProjectSelectionModal :view-model="viewModel"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import EnterTimeViewModel from "@/components/view-models/EnterTimeViewModel";
  import ProjectSelectionModal from "@/components/vue-components/ProjectSelectionModal.vue";
  import TextInputWithRightSpace from "@/components/inputs/TextInputWithRightSpace.vue";
  import DateTimeWithNowButton from "@/components/inputs/DateTimeWithNowButton.vue";
  import ChangeTimeCommand from "@/components/utils/ChangeTimeCommand";
  import LocalStore from "@/components/state/LocalStore";
  import ApplicationState from "@/components/state/ApplicationState";

  @Component({
    components: {DateTimeWithNowButton, TextInputWithRightSpace, ProjectSelectionModal}
  })
  export default class Zeiterfassung extends Vue {
    viewModel: EnterTimeViewModel = new EnterTimeViewModel();
    private changeTimeCommand = new ChangeTimeCommand(this.viewModel);

    noCustomerOrProjectConfigured(): boolean {
      return ApplicationState.data.configs.kunden.length === 0
        || ApplicationState.data.configs.projekte.length === 0
    }

    created() {
      const lastUnsavedTimeJson = localStorage.getItem(LocalStore.LAST_UNSAVED_TIME);
      if (lastUnsavedTimeJson)
        this.changeViewModelToLastUnsaveState(lastUnsavedTimeJson);
    }

    updated() {
      const kundenOptions = this.viewModel.getKundeOptions();
      if (kundenOptions !== this.viewModel.kunde.options)
        this.viewModel.kunde.options = kundenOptions;
      const projektOptions = this.viewModel.getProjekteOptions();
      if (projektOptions !== this.viewModel.projekt.options)
        this.viewModel.projekt.options = projektOptions;
    }

    private changeViewModelToLastUnsaveState(lastUnsavedTimeJson: string) {
      const lastUnsaveTime: EnterTimeViewModel = JSON.parse(lastUnsavedTimeJson);
      this.viewModel.startTime.value = lastUnsaveTime.startTime.value;
      this.viewModel.endTime.value = lastUnsaveTime.endTime.value;
      this.viewModel.projekt.value = lastUnsaveTime.projekt.value;
      this.viewModel.kunde.value = lastUnsaveTime.kunde.value;
      this.viewModel.beschreibung.value = lastUnsaveTime.beschreibung.value;
      this.viewModel.fullTime.value = lastUnsaveTime.fullTime.value;
      this.viewModel.timeWithoutBreak.value = lastUnsaveTime.timeWithoutBreak.value;
      this.viewModel.break.value = lastUnsaveTime.break.value;
    }

    clickHinzufuegen() {
      if (!this.timeIsFilled())
        alert("Bitte befüllen Sie zuerst Start und End Zeit");
    }

    timeIsFilled(): boolean {
      return this.viewModel.startTime && this.viewModel.startTime.value !== ""
        && this.viewModel.endTime && this.viewModel.endTime.value !== "";
    }

    getDataToggle() {
      if (this.timeIsFilled())
        return "modal";
      return "";
    }
  }
</script>

<style scoped>
  .largerSpan {
    font-size: x-large;
  }
  span {
    color: red;
  }
</style>