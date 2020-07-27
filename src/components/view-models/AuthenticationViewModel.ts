import FieldViewModel from "@/components/view-models/FieldViewModel";

export default class AuthenticationViewModel {

  username: FieldViewModel = new FieldViewModel("username");
  password: FieldViewModel = new FieldViewModel("password");


  constructor() {
    this.username.label = "Username";
    this.password.label = "Passwort";
  }
}