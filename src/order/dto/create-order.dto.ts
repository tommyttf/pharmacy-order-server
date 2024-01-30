import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    enum: ['healthmart', 'careplus', 'quickcare'],
    description:
      'actually this field should be any string returned in the field `integrationName` of the array of the http request `/pharmacy`',
  })
  pharmacy: string;
}
