import FieldViewModel from "@/components/view-models/FieldViewModel";

export default class RegisterViewModel {

  fullName: FieldViewModel = new FieldViewModel("fullName");
  email: FieldViewModel = new FieldViewModel("email");
  username: FieldViewModel = new FieldViewModel("username");
  password: FieldViewModel = new FieldViewModel("initialPassword");
  repeatPassword: FieldViewModel = new FieldViewModel("repeatPassword");


  constructor() {
    this.fullName.label = "vollständiger Name";
    this.email.label = "Email";
    this.username.label = "Username";
    this.password.label = "Passwort";
    this.repeatPassword.label = "Passwort wiederholen";
  }
}