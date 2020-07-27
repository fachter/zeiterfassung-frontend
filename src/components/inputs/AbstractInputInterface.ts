import FieldViewModel from "@/components/view-models/FieldViewModel";

export default interface AbstractInputInterface {

  inputField: FieldViewModel;
  showErrors: boolean;

  shouldShowErrors(): boolean;
  hasErrors(fieldViewModel: FieldViewModel | null): boolean;
  clearFieldErrors(fieldViewModel: FieldViewModel | null): void;

}
