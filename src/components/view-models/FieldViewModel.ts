import SelectOptionViewModel from "@/components/view-models/SelectOptionViewModel";

export default class FieldViewModel {

  name: string;
  value = "";
  label = "";
  placeholder = "";
  readOnly = false;
  options: SelectOptionViewModel[] = [];
  errors: string[] = [];

  constructor(name: string) {
    this.name = name;
  }
}