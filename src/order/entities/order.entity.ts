export class Order {
  constructor(
    private _referId: string,
    private _referPayload: any,
    private _integration: string,
    private _id?: number,
  ) {}

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get referId(): string {
    return this._referId;
  }

  set referId(value: string) {
    this._referId = value;
  }

  get referPayload(): any {
    return this._referPayload;
  }

  set referPayload(value: any) {
    this._referPayload = value;
  }

  get integration(): string {
    return this._integration;
  }

  set integration(value: string) {
    this._integration = value;
  }
}
