import KundenViewModel from "@/components/view-models/configs/KundenViewModel";
import ProjektViewModel from "@/components/view-models/configs/ProjektViewModel";

export default class WorkedTimeViewModel {

  public id = 0;
  public startTime = "";
  public endTime = "";
  public beschreibung = "";
  public kundenViewModel: KundenViewModel|null = null;
  public projektViewModel: ProjektViewModel|null = null;
  public breakInMinutes = 0;

}