import StateViewModel from "@/components/view-models/StateViewModel";
import DataViewModel from "@/components/view-models/DataViewModel";

export default class ApplicationState {

  public static accountInfo = new StateViewModel();
  public static data = new DataViewModel();
}