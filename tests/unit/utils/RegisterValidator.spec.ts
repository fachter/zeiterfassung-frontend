import RegisterValidator from "@/components/utils/RegisterValidator";
import RegisterViewModel from "@/components/view-models/RegisterViewModel";
import ErrorMessages from "@/components/state/ErrorMessages";

describe("RegisterValidator", () => {
  let viewModel: RegisterViewModel;
  let registerValidator: RegisterValidator;

  describe("isValid", () => {
    beforeEach(() => {
      viewModel = new RegisterViewModel();
      registerValidator = new RegisterValidator(viewModel);
    })
    test("given2PasswordsAreNotTheSame_thenFalse", () => {
      viewModel.password.value = "test";
      viewModel.repeatPassword.value = "otherTest";

      expect(registerValidator.isValid()).toBeFalsy();
    });

    test("given2PasswordAreNotTheSame_thenRepeatedPasswordContainsErrorMessage", () => {
      viewModel.password.value = "test";
      viewModel.repeatPassword.value = "otherTest";

      registerValidator.isValid();

      expect(viewModel.repeatPassword.errors).toEqual([ErrorMessages.PASSWORDS_NOT_IDENTICAL]);
    })

    test("givenPasswordLessThen6Chars_thenFalse", () => {
      viewModel.password.value = "test1";
      viewModel.repeatPassword.value = "test1";

      expect(registerValidator.isValid()).toBeFalsy();
    });

    test("givenPasswordLessThen6Chars_thenPasswordContainsErrorMessage", () => {
      viewModel.password.value = "test1";
      viewModel.repeatPassword.value = "test1";

      registerValidator.isValid();

      expect(viewModel.password.errors).toEqual([ErrorMessages.WEAK_PASSWORD])
    });

    test("given2StrongIdenticalPasswords_thenPass", () => {
      viewModel.password.value = "someStrongPassword123";
      viewModel.repeatPassword.value = "someStrongPassword123";
      viewModel.username.value = "validUsername";
      viewModel.fullName.value = "Full Name";
      viewModel.email.value = "valid@email";

      expect(registerValidator.isValid()).toBeTruthy();
    });

    test("givenEmptyName_thenNameContainsErrorsMessage", () => {
      viewModel.password.value = "validPassword";
      viewModel.repeatPassword.value = "validPassword";
      viewModel.username.value = "";
      viewModel.fullName.value = "";
      viewModel.email.value = "";

      const isValid = registerValidator.isValid();

      expect(viewModel.username.errors).toEqual([ErrorMessages.EMPTY_FIELD])
      expect(viewModel.fullName.errors).toEqual([ErrorMessages.EMPTY_FIELD])
      expect(viewModel.email.errors).toEqual([ErrorMessages.EMPTY_FIELD])
      expect(isValid).toBeFalsy();
    })
  });
});