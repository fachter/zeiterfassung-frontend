<template>
  <div v-if="showModal">
    <div class="modal fade" id="projectSelectionModal" tabindex="-1" role="dialog"
         aria-labelledby="projectSelectionModalLabel"
         aria-hidden="true">
      <div class="modal-dialog  modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Hinzufügen</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <SelectInput :input-field="viewModel.kunde" :suffix="'kunde'"/>
            <SelectInput :input-field="viewModel.projekt" :suffix="'projekt'"/>
            <TextAreaInput :input-field="viewModel.beschreibung"/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success"
                    @click="saveTimeViewModel()"
                    :data-dismiss="dataDismiss">
              Hinzufügen
            </button>
            <button type="button" class="btn btn-outline-danger" data-dismiss="modal">Schließen</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from "vue-property-decorator";
  import SelectInput from "@/components/inputs/SelectInput.vue";
  import EnterTimeViewModel from "@/components/view-models/EnterTimeViewModel";
  import ApplicationState from "@/components/state/ApplicationState";
  import TextAreaInput from "@/components/inputs/TextAreaInput.vue";
  import FieldViewModel from "@/components/view-models/FieldViewModel";
  import KundenViewModel from "@/components/view-models/configs/KundenViewModel";
  import ProjektViewModel from "@/components/view-models/configs/ProjektViewModel";
  import AxiosCaller from "@/components/utils/AxiosCaller";
  import LocalStore from "@/components/state/LocalStore";
  import Synchronizer from "@/components/utils/Synchronizer";
  import WorkedTimeRequestResponseViewModel
    from "@/components/view-models/savedTimes/WorkedTimeRequestResponseViewModel";

  @Component({
    components: {TextAreaInput, SelectInput}
  })
  export default class ProjectSelectionModal extends Vue {
    private dataDismiss = "";
    private showModal = true;
    private axiosCaller = new AxiosCaller();
    private synchronizer = new Synchronizer();
    @Prop() viewModel!: EnterTimeViewModel;

    async saveTimeViewModel() {
      this.setFieldViewModelErrors(this.viewModel.kunde, "Bitte wählen sie einen Kunden aus");
      this.setFieldViewModelErrors(this.viewModel.projekt, "Bitte wählen sie ein Projekt aus");
      this.setFieldViewModelErrors(this.viewModel.beschreibung, "Bitte geben Sie eine Beschreibung zu ihrere Tätigkeit ein");

      if (this.inputFieldsHaveNoErrors()) {
        localStorage.setItem(LocalStore.LAST_UNSAVED_TIME, JSON.stringify(this.viewModel));
        await localStorage.setItem(LocalStore.ADD_ACTION_CALLED, JSON.stringify(true));
        this.dataDismiss = "modal";
        this.axiosCaller.postRequest("/add-times", [this.getWorkedTimeResponseViewModel()])
          .then(() => {
            localStorage.removeItem(LocalStore.LAST_UNSAVED_TIME);
            this.synchronizer.fetchTimesForUser();
          })
          .catch((err) => {
            console.log(err);
            console.log(err.response);
            alert("Es hab ein Problem mit dem Speichern dieser Zeit, bitte laden Sie die Seite erneut");
          });
        this.resetViewModelValues();
      } else {
        alert("Die Eingabefelder haben Fehler")
        this.dataDismiss = "";
      }
    }

    private setFieldViewModelErrors(fieldViewModel: FieldViewModel, errorMessage: string): void {
      if (fieldViewModel.value === "")
        fieldViewModel.errors = [errorMessage];
      else
        fieldViewModel.errors = [];
    }

    inputFieldsHaveNoErrors(): boolean {
      return this.fieldHasNoErrors(this.viewModel.projekt)
        && this.fieldHasNoErrors(this.viewModel.kunde)
        && this.fieldHasNoErrors(this.viewModel.beschreibung)
        && this.fieldHasNoErrors(this.viewModel.startTime)
        && this.fieldHasNoErrors(this.viewModel.endTime)
        && this.fieldHasNoErrors(this.viewModel.break);
    }

    fieldHasNoErrors(fieldViewModel: FieldViewModel): boolean {
      return fieldViewModel.errors.length === 0;
    }

    private getWorkedTimeResponseViewModel(): WorkedTimeRequestResponseViewModel {
      const workedTime = new WorkedTimeRequestResponseViewModel();
      workedTime.beschreibung = this.viewModel.beschreibung.value;
      workedTime.startTimestamp = this.getTimestampFromDateString(this.viewModel.startTime);
      workedTime.endTimestamp = this.getTimestampFromDateString(this.viewModel.endTime);
      workedTime.kundenViewModel = this.getKundenViewModel(this.viewModel.kunde.value);
      workedTime.projektViewModel = this.getProjektViewModel(this.viewModel.projekt.value);
      workedTime.breakInMinutes = +this.viewModel.break.value;
      return workedTime;
    }

    private getTimestampFromDateString(fieldViewModel: FieldViewModel) {
      return new Date(fieldViewModel.value).getTime();
    }

    private getKundenViewModel(value: number|string): KundenViewModel | null {
      for (const kundenViewModel of ApplicationState.data.configs.kunden) {
        if (kundenViewModel.id === value)
          return kundenViewModel;
      }
      return null;
    }

    private getProjektViewModel(value: number|string): ProjektViewModel | null {
      for (const projektViewModel of ApplicationState.data.configs.projekte) {
        if (projektViewModel.id === value)
          return projektViewModel;
      }
      return null;
    }

    resetViewModelValues() {
      this.viewModel.startTime.value = "";
      this.viewModel.endTime.value = "";
      this.viewModel.projekt.value = "";
      this.viewModel.kunde.value = "";
      this.viewModel.beschreibung.value = "";
      this.viewModel.fullTime.value = "";
      this.viewModel.timeWithoutBreak.value = "";
      this.viewModel.break.value = "";
    }

    beforeDestroy() {
      localStorage.setItem(LocalStore.LAST_UNSAVED_TIME, JSON.stringify(this.viewModel));
    }
  }
</script>