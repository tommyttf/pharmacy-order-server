import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Get('refer/:pharmacy')
  findByRefer(@Param('pharmacy') pharmacy: string) {
    return this.orderService.findByRefer(pharmacy);
  }

  @Get('referId/:referId')
  findByReferId(@Param('referId') referId: string) {
    return this.orderService.findByReferId(referId);
  }

  @Get('direct/:pharmacy')
  findDirectlyByRefer(@Param('pharmacy') pharmacy: string) {
    return this.orderService.findDirectly(pharmacy);
  }

  @Get('direct/:pharmacy/:referId')
  findDirectlyByReferId(
    @Param('pharmacy') pharmacy: string,
    @Param('referId') referId: string,
  ) {
    return this.orderService.findDirectly(pharmacy, referId);
  }
}
