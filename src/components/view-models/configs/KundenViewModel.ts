export default class KundenViewModel {

  public id: number | null = null;
  public kundenName = "";
  public deleted = false;

  constructor(kundenName: string) {
    this.kundenName = kundenName;
  }
}