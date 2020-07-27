import StateViewModel from "@/components/view-models/StateViewModel";
import AuthenticationResponseViewModel from "@/components/view-models/AuthenticationResponseViewModel";
import AccountInformationViewModel from "@/components/view-models/AccountInformationViewModel";
import Synchronizer from "@/components/utils/Synchronizer";

export default class ChangeAuthenticationState {

  static login(stateViewModel: StateViewModel, responseViewModel: AuthenticationResponseViewModel) {
    this.changeStateViewModelForLogin(stateViewModel, responseViewModel);
    const synchronizer = new Synchronizer();
    synchronizer.fetchKundenForUser()
    synchronizer.fetchProjekteForUser()
    localStorage.setItem("jwt", responseViewModel.jwt);
    localStorage.setItem("accountInfo", JSON.stringify(stateViewModel.accountInformation))
  }

  private static changeStateViewModelForLogin(stateViewModel: StateViewModel, responseViewModel: AuthenticationResponseViewModel) {
    stateViewModel.loggedIn = true;
    stateViewModel.key = responseViewModel.jwt;
    stateViewModel.accountInformation.fullName.value
      = responseViewModel.accountInformationViewModel.fullName;
    stateViewModel.accountInformation.username.value
      = responseViewModel.accountInformationViewModel.username;
    stateViewModel.accountInformation.email.value
      = responseViewModel.accountInformationViewModel.email;
  }

  static logout(stateViewModel: StateViewModel) {
    this.clearValuesFromStateViewModel(stateViewModel);
    localStorage.removeItem("jwt");
    localStorage.removeItem("accountInfo");
  }

  private static clearValuesFromStateViewModel(stateViewModel: StateViewModel) {
    stateViewModel.loggedIn = false;
    stateViewModel.key = "";
    stateViewModel.accountInformation = new AccountInformationViewModel();
  }
}