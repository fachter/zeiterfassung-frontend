export default class SelectOptionViewModel {

  value: string|number;
  text: string;

  constructor(value: string|number|null, text = "") {
    if (value === null)
      value = text;
    this.value = value;
    this.text = text;
  }
}