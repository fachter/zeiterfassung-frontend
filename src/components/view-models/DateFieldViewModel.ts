import SelectOptionViewModel from "@/components/view-models/SelectOptionViewModel";

export default class DateFieldViewModel {

  name: string;
  value: Date|null = null;
  label = "";
  readOnly = false;
  options: SelectOptionViewModel[] = [];
  errors: string[] = [];

  constructor(name: string) {
    this.name = name;
  }
}