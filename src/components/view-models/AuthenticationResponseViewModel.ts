import AccountInformationViewModel from "@/components/view-models/AccountInformationViewModel";
import AccountInformationBackendViewModel from "@/components/view-models/AccountInformationBackendViewModel";

export default class AuthenticationResponseViewModel {

  jwt: string;
  accountInformationViewModel: AccountInformationBackendViewModel;

  constructor(jwt: string, accountInformationViewModel: AccountInformationBackendViewModel) {
    this.jwt = jwt;
    this.accountInformationViewModel = accountInformationViewModel;
  }
}