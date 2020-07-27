/* eslint-disable  @typescript-eslint/no-explicit-any */
export default class ViewModelErrors {

  static inputHasErrors(fieldErrors: string[] | any[] | null): boolean {
    return (fieldErrors !== null && Array.isArray(fieldErrors) && fieldErrors.length > 0);
  }

  static viewModelHasErrors(viewModel: any): boolean {
    if (viewModel !== null && (typeof viewModel === 'object')) {
      for (const i in viewModel) {
        // noinspection JSUnfilteredForInLoop
        if (this.isInputFieldViewModel(viewModel[i])) {
          // noinspection JSUnfilteredForInLoop
          if (viewModel[i].errors.length > 0)
            return true;
        } else {
          // noinspection JSUnfilteredForInLoop
          if (this.viewModelHasErrors(viewModel[i]))
            return true;
        }
      }
    }

    return false;
  }

  private static isInputFieldViewModel(element: any) {
    return (element && element.errors !== undefined
      && element.name !== undefined && element.value !== undefined
      && element.label !== undefined);
  }
}
