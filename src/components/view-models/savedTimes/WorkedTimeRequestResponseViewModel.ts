import KundenViewModel from "@/components/view-models/configs/KundenViewModel";
import ProjektViewModel from "@/components/view-models/configs/ProjektViewModel";

export default class WorkedTimeRequestResponseViewModel {

  public id = 0;
  public startTimestamp = 0;
  public endTimestamp = 0;
  public beschreibung = "";
  public kundenViewModel: KundenViewModel|null = null;
  public projektViewModel: ProjektViewModel|null = null;
  public breakInMinutes = 0;

}