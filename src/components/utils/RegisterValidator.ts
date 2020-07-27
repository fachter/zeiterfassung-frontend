import RegisterViewModel from "@/components/view-models/RegisterViewModel";
import ErrorMessages from "@/components/state/ErrorMessages";
import FieldViewModel from "@/components/view-models/FieldViewModel";

export default class RegisterValidator {

  private viewModel: RegisterViewModel;
  private viewModelIsValid = true;

  constructor(viewModel: RegisterViewModel) {
    this.viewModel = viewModel;
  }

  isValid(): boolean {
    this.viewModelIsValid = true;
    this.validateFieldValueNotEmpty(this.viewModel.username);
    this.validateFieldValueNotEmpty(this.viewModel.fullName);
    this.validateFieldValueNotEmpty(this.viewModel.email);
    this.validatePassword();

    return this.viewModelIsValid;
  }

  private validatePassword() {
    if (this.viewModel.password.value !== this.viewModel.repeatPassword.value) {
      this.viewModel.repeatPassword.errors = [ErrorMessages.PASSWORDS_NOT_IDENTICAL];
      this.viewModelIsValid = false;
    }
    if (this.viewModel.password.value.length < 6) {
      this.viewModel.password.errors = [ErrorMessages.WEAK_PASSWORD];
      this.viewModelIsValid = false;
    }
  }

  private validateFieldValueNotEmpty(fieldViewModel: FieldViewModel) {
    if (fieldViewModel.value === "") {
      fieldViewModel.errors = [ErrorMessages.EMPTY_FIELD];
      this.viewModelIsValid = false;
    }
  }
}