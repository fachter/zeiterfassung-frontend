import FieldViewModel from "@/components/view-models/FieldViewModel";

export default class AccountInformationViewModel {

  fullName = new FieldViewModel("fullName");
  username = new FieldViewModel("username");
  email = new FieldViewModel("email");

  constructor() {
    this.username.label = "Username";
    this.email.label = "Email";
    this.fullName.label = "vollständiger Name";
    this.username.readOnly = true;
    this.fullName.readOnly = true;
    this.email.readOnly = true;
  }
}