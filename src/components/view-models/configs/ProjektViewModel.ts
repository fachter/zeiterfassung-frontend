export default class ProjektViewModel {

  public id: number|null = null;
  public projektName = "";
  public deleted = false;

  constructor(projektName: string) {
    this.projektName = projektName;
  }
}