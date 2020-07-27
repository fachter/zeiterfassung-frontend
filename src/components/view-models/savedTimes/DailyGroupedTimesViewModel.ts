import WorkedTimeViewModel from "@/components/view-models/savedTimes/WorkedTimeViewModel";

export default class DailyGroupedTimesViewModel {

  public date = "";
  public savedTimes: WorkedTimeViewModel[] = [];
  public timeVerrechnet = "";
  public timeGesamt = "";
}