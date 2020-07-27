import AllTimesViewModel from "@/components/view-models/savedTimes/AllTimesViewModel";
import DailyGroupedTimesViewModel from "@/components/view-models/savedTimes/DailyGroupedTimesViewModel";

export default class ZeitenViewModel {

  public allTimes = new AllTimesViewModel();
  public oneDayTimes: DailyGroupedTimesViewModel[] = [];
}