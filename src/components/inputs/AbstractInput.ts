import {Prop, Vue} from "vue-property-decorator";
import AbstractInputInterface from "@/components/inputs/AbstractInputInterface";
import FieldViewModel from "@/components/view-models/FieldViewModel";
import ViewModelErrors from "@/components/utils/ViewModelErrors";

export default abstract class AbstractInput extends Vue implements AbstractInputInterface {

  @Prop() inputField!: FieldViewModel;
  @Prop() showErrors!: boolean;

  shouldShowErrors(): boolean {
    let showErrors = true;
    // noinspection PointlessBooleanExpressionJS
    if (this.showErrors === false)
      showErrors = false;
    return showErrors;
  }

  hasErrors(fieldViewModel: FieldViewModel | null = null): boolean {
    if (fieldViewModel === null)
      fieldViewModel = this.inputField;
    return ViewModelErrors.inputHasErrors(fieldViewModel.errors);
  }

  clearFieldErrors(fieldViewModel: FieldViewModel | null = null): void {
    if (fieldViewModel === null)
      fieldViewModel = this.inputField;
    fieldViewModel.errors = [];
  }

}