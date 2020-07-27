import ViewModelErrors from "@/components/utils/ViewModelErrors";
import FieldViewModel from "@/components/view-models/FieldViewModel";

describe("ViewModelErrors", () => {
  describe("inputHasErrors(fieldErrors)", () => {
    test("fieldErrorsIsNull", () => {
      const fieldErrors = null;

      const result: boolean = ViewModelErrors.inputHasErrors(fieldErrors);

      expect(result).toBe(false);
    });

    test("fieldErrorsIsEmptyArray", () => {
      const fieldErrors: string[] = [];

      const result: boolean = ViewModelErrors.inputHasErrors(fieldErrors);

      expect(result).toBe(false);
    });

    test("fieldErrorsIsArray", () => {
      let fieldErrors: string[] | any[] = ["Error1", "Error2", "Error3"];
      let result: boolean = ViewModelErrors.inputHasErrors(fieldErrors);

      expect(result).toBe(true);

      fieldErrors = [{}, {}, {}];
      result = ViewModelErrors.inputHasErrors(fieldErrors);

      expect(result).toBe(true);

      fieldErrors = [[], []];
      result = ViewModelErrors.inputHasErrors(fieldErrors);

      expect(result).toBe(true);
    });
  });

  describe("viewModelHasErrors", () => {
    let viewModel: any;

    beforeEach(() => {
      viewModel = {
        fin: new FieldViewModel("fin"),
        auftragsnummer: new FieldViewModel("auftragsnummer"),
        tachostand: new FieldViewModel("tachostand")
      };
      viewModel.fin.name = "fin";
      viewModel.auftragsnummer.name = "auftragsnummer";
      viewModel.tachostand.name = "tachostand";
    });

    test("noInput", () => {
      const result = ViewModelErrors.viewModelHasErrors(null);
      expect(result).toBe(false);
    });

    test("viewModelWithErrors", () => {
      viewModel.fin.errors = ["TestError"];
      const result: boolean = ViewModelErrors.viewModelHasErrors(viewModel);

      expect(result).toBe(true);
    });

    test("viewModelWithoutErrors", () => {
      viewModel.fin.errors = [];
      const result: boolean = ViewModelErrors.viewModelHasErrors(viewModel);

      expect(result).toBe(false);
    });

    test("viewModelWithErrorsIn2Fields", () => {
      viewModel.auftragsnummer.errors = ["test"];
      viewModel.tachostand.errors = ["test"];
      const result: boolean = ViewModelErrors.viewModelHasErrors(viewModel);

      expect(result).toBe(true);
    });

    test("lastObjectWithError", () => {
      viewModel.tachostand.errors = ["fehler"];
      const result: boolean = ViewModelErrors.viewModelHasErrors(viewModel);

      expect(result).toBe(true);
    });

    test("fieldIsNull", () => {
      viewModel.tachostand = null;
      let result: boolean = ViewModelErrors.viewModelHasErrors(viewModel);
      expect(result).toBe(false);

      viewModel.auftragsnummer.errors = ["Test"];
      result = ViewModelErrors.viewModelHasErrors(viewModel);
      expect(result).toBe(true);
    });

    test("objectInObject", () => {
      const fin = new FieldViewModel("fin");
      fin.errors = ["Test"];
      viewModel = {
        object: {
          fin: fin,
          auftragsnummer: null
        }
      };
      const result: boolean = ViewModelErrors.viewModelHasErrors(viewModel);

      expect(result).toBeTruthy();
    });

    test("objectWithOtherProperties", () => {
      const fin = new FieldViewModel("fin");
      fin.errors = [];
      viewModel = {
        skipMandatory: false,
        object: {
          fin: fin,
          auftragsnummer: null
        },
        object2: {
          fin2: fin,
          test: true
        }
      };
      const result: boolean = ViewModelErrors.viewModelHasErrors(viewModel);

      expect(result).toBeFalsy();
    });

    test("objectWithOtherProperties", () => {
      const fin = new FieldViewModel("fin");
      fin.errors = ["Fehler"];
      viewModel = {
        skipMandatory: false,
        object: {
          fin: fin,
          auftragsnummer: null
        },
        object2: {
          fin2: fin,
          test: true
        }
      };
      const result: boolean = ViewModelErrors.viewModelHasErrors(viewModel);

      expect(result).toBeTruthy();
    });
  });
});