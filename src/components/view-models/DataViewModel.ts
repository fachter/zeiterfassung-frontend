import ConfigViewModel from "@/components/view-models/configs/ConfigViewModel";
import AllTimesViewModel from "@/components/view-models/savedTimes/AllTimesViewModel";
import DailyGroupedTimesViewModel from "@/components/view-models/savedTimes/DailyGroupedTimesViewModel";
import WorkedTimeViewModel from "@/components/view-models/savedTimes/WorkedTimeViewModel";

export default class DataViewModel {

  configs = new ConfigViewModel();
  allTimes = new AllTimesViewModel();
  oneDayTimes: DailyGroupedTimesViewModel[] = []
  selectedTime: WorkedTimeViewModel|null = null;
}