import { ApiProperty } from '@nestjs/swagger';

export class Order {
  constructor(
    private _referId: string,
    private _referPayload: any,
    private _integration: string,
    private _id?: number,
  ) {}

  @ApiProperty({
    description: 'id from this server',
  })
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  @ApiProperty({
    description: 'id from the integration',
  })
  get referId(): string {
    return this._referId;
  }

  set referId(value: string) {
    this._referId = value;
  }

  @ApiProperty({
    description: 'payload received from the integration',
  })
  get referPayload(): any {
    return this._referPayload;
  }

  set referPayload(value: any) {
    this._referPayload = value;
  }

  @ApiProperty({
    description: 'the pharmacy integration name',
  })
  get integration(): string {
    return this._integration;
  }

  set integration(value: string) {
    this._integration = value;
  }
}
