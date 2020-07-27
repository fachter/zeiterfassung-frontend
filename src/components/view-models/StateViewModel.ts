import AccountInformationViewModel from "@/components/view-models/AccountInformationViewModel";
import DailyGroupedTimesViewModel from "@/components/view-models/savedTimes/DailyGroupedTimesViewModel";
import WorkedTimeViewModel from "@/components/view-models/savedTimes/WorkedTimeViewModel";
import ConfigViewModel from "@/components/view-models/configs/ConfigViewModel";
import AllTimesViewModel from "@/components/view-models/savedTimes/AllTimesViewModel";

export default class StateViewModel {

  loggedIn = false;
  key = "";
  accountInformation = new AccountInformationViewModel();


  oneDayTimes: DailyGroupedTimesViewModel[] = [];
  selectedTime: WorkedTimeViewModel | null = null;
  configs = new ConfigViewModel();
  timesToSave: WorkedTimeViewModel[] = [];
  savedTimes: AllTimesViewModel = new AllTimesViewModel();
}