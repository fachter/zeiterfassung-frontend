import FieldViewModel from "@/components/view-models/FieldViewModel";

export default class SelectedTimeViewModel {

  public id = 0;
  public startTime = new FieldViewModel("startTime");
  public endTime = new FieldViewModel("endTime");
  public beschreibung = new FieldViewModel("beschreibung");
  public kunde = new FieldViewModel("kunde");
  public projekt = new FieldViewModel("projekt");
  public aufgabe = new FieldViewModel("aufgabe");
  public aufwand = new FieldViewModel("aufwand");

  public setStartTimeValue(startTimeValue: string): SelectedTimeViewModel {
    this.startTime.value = startTimeValue;
    return this;
  }

  public setEndTimeValue(endTimeValue: string): SelectedTimeViewModel {
    this.endTime.value = endTimeValue;
    return this;
  }

  public setBeschreibungValue(beschreibungValue: string): SelectedTimeViewModel {
    this.beschreibung.value = beschreibungValue;
    return this;
  }

  public setKundeValue(kundeValue: string): SelectedTimeViewModel {
    this.kunde.value = kundeValue;
    return this;
  }

  public setProjektValue(projektValue: string): SelectedTimeViewModel {
    this.projekt.value = projektValue;
    return this;
  }

  public setAufgabeValue(aufgabeValue: string): SelectedTimeViewModel {
    this.aufgabe.value = aufgabeValue;
    return this;
  }

  public setAufwandValue(aufwandValue: string): SelectedTimeViewModel {
    this.aufwand.value = aufwandValue;
    return this;
  }

}