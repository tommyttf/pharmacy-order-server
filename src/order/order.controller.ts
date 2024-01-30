import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({
    type: CreateOrderDto,
    description:
      'Only pharmacy is required, other properties will send to mock api directly',
    examples: {
      healthmart: {
        summary: 'healthmart',
        description: 'Send to `healthmart` without any detail',
        value: { pharmacy: 'healthmart' },
      },
      careplus: {
        summary: 'careplus',
        description:
          'Send to `careplus` with payload `{"carePlusProduct": "Antibiotics","carePlusQuantity": 2}`',
        value: {
          pharmacy: 'careplus',
          carePlusProduct: 'Antibiotics',
          carePlusQuantity: 2,
        },
      },
      quickcare: {
        summary: 'quickcare',
        description:
          'Send to `quickcare` with payload `{"quickCareProduct": "Antibiotics", "quickCareQuantity": 2, "quickCareClientInfo": { "quickCareClientName": "Suhaib",   "quickCareClientAddress": "71 thorncliffe park drive",   "quickCareClientCity": "string",   "quickCareClientState": "string"} }`',
        value: {
          pharmacy: 'quickcare',
          quickCareProduct: 'Antibiotics',
          quickCareQuantity: 2,
          quickCareClientInfo: {
            quickCareClientName: 'Suhaib',
            quickCareClientAddress: '71 thorncliffe park drive',
            quickCareClientCity: 'string',
            quickCareClientState: 'string',
          },
        },
      },
    },
  })
  @ApiOkResponse({
    type: Order,
    description: 'The order object created in the db of this server',
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Get all orders in our DB' })
  @ApiOkResponse({
    type: Order,
    isArray: true,
    description: 'All order objects created in this server',
  })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }
  @ApiOperation({ summary: 'Get the order with the id in our DB' })
  @ApiParam({
    name: 'id',
    description:
      'id returned when creating order in this server, not the one from integration',
  })
  @ApiOkResponse({
    type: Order,
    description:
      'The order object with the specified id created in this server',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Get all orders with the specified pharmacy in our DB',
  })
  @ApiParam({
    name: 'pharmacy',
    description: 'healthmart | careplus | quickcare',
  })
  @ApiOkResponse({
    type: Order,
    isArray: true,
    description:
      'All order objects with the specified pharmacy name created in this server',
  })
  @Get('refer/:pharmacy')
  findByRefer(@Param('pharmacy') pharmacy: string) {
    return this.orderService.findByRefer(pharmacy);
  }

  @ApiOperation({
    summary: 'Get the order in our db with the referId from mock API',
  })
  @ApiParam({
    name: 'referId',
    description: 'the id from the integration',
  })
  @ApiOkResponse({
    type: Order,
    description:
      'The order object in our db with the specified refer id from mock API',
  })
  @Get('referId/:referId')
  findByReferId(@Param('referId') referId: string) {
    return this.orderService.findByReferId(referId);
  }

  @ApiOperation({
    summary: 'Get the order with the specified pharmacy from mock API',
  })
  @ApiParam({
    name: 'pharmacy',
    description: 'healthmart | careplus | quickcare',
  })
  @ApiOkResponse({
    description: 'All orders with the specified pharmacy from mock API',
  })
  @Get('direct/:pharmacy')
  findDirectlyByRefer(@Param('pharmacy') pharmacy: string) {
    return this.orderService.findDirectly(pharmacy);
  }

  @ApiOperation({
    summary:
      'Get the order with the specified pharmacy and referId from mock API',
  })
  @ApiParam({
    name: 'pharmacy',
    description: 'healthmart | careplus | quickcare',
  })
  @ApiParam({
    name: 'referId',
    description: 'the id from the integration',
  })
  @ApiOkResponse({
    description: 'The order with the specified id and pharmacy from mock API',
  })
  @Get('direct/:pharmacy/:referId')
  findDirectlyByReferId(
    @Param('pharmacy') pharmacy: string,
    @Param('referId') referId: string,
  ) {
    return this.orderService.findDirectly(pharmacy, referId);
  }
}
