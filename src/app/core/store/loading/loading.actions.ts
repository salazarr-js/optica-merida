
/** SET/SAVE LOADING STATE */
export class SetLoading {
  public static readonly type = '[Loading] Set';
  constructor(public isLoading: boolean) {}
}
