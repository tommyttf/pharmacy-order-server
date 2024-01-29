export class CreateOrderDto {
  pharmacy: string;
  // remaining data will directly send to the mock api server
  [key: string]: any;
}
