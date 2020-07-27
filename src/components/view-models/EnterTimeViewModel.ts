import FieldViewModel from "@/components/view-models/FieldViewModel";
import SelectOptionViewModel from "@/components/view-models/SelectOptionViewModel";
import ApplicationState from "@/components/state/ApplicationState";

export default class EnterTimeViewModel {

  id: number|null = null;
  beschreibung: FieldViewModel = new FieldViewModel("beschreibung");
  startTime: FieldViewModel = new FieldViewModel("startTime");
  endTime: FieldViewModel = new FieldViewModel("endTime");
  break: FieldViewModel = new FieldViewModel("break");
  fullTime: FieldViewModel = new FieldViewModel("fullTime");
  timeWithoutBreak: FieldViewModel = new FieldViewModel("timeWithoutBreak");
  kunde: FieldViewModel = new FieldViewModel("kunde");
  projekt: FieldViewModel = new FieldViewModel("projekt");

  constructor() {
    this.beschreibung.label = "Beschreibung";
    this.startTime.label = "Beginn";
    this.endTime.label = "Ende";
    this.break.label = "Pause (in Minuten)";
    this.fullTime.label = "Gesamt";
    this.fullTime.readOnly = true;
    this.timeWithoutBreak.label = "mit Abzug Pause";
    this.timeWithoutBreak.readOnly = true;
    this.kunde.label = "Kunde";
    this.kunde.options = this.getKundeOptions();
    this.projekt.label = "Projekt";
    this.projekt.options = this.getProjekteOptions();
  }

  public getKundeOptions(): SelectOptionViewModel[] {
    const kundeOptions: SelectOptionViewModel[] = [];
    for (const kundenViewModel of ApplicationState.data.configs.kunden)
      kundeOptions.push(new SelectOptionViewModel(kundenViewModel.id, kundenViewModel.kundenName));
    return kundeOptions;
  }

  public getProjekteOptions(): SelectOptionViewModel[] {
    const projekteOptions: SelectOptionViewModel[] = [];
    for (const projektViewModel of ApplicationState.data.configs.projekte)
      projekteOptions.push(new SelectOptionViewModel(projektViewModel.id, projektViewModel.projektName));
    return projekteOptions;
  }

}
