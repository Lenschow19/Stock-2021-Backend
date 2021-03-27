import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { CreateStockDto } from '../dto/create-stock.dto';
import { Socket } from 'socket.io';
import { IStockService, IStockServiceProvider } from '../../core/primary-ports/stock.service.interface';
import { Inject } from '@nestjs/common';
import { Stock } from '../../core/models/stock.model';
import { UpdatePriceDto } from '../dto/update-price.dto';


@WebSocketGateway()
export class StockGateway {
  constructor(@Inject(IStockServiceProvider) private stockservice: IStockService) {}

  @SubscribeMessage('create-stock')
  handleCreateEvent(
    @MessageBody() data: CreateStockDto,
    @ConnectedSocket() client: Socket,
  ): void {
    const newStock: Stock = {
      name: data.name,
      description: data.description,
      value: data.value,
    };
    try {
      this.stockservice.createStock(newStock);
      client.emit('stock-created-success', newStock);
    } catch (e) {
      client.emit('stock-created-error', e.message);
    }
  }

  /*@SubscribeMessage('update-price')
  handleUpdatePriceEvent(
    @MessageBody() data: UpdatePriceDto,
    @ConnectedSocket() client: Socket,
  ): void {
    const newPrice: Stock = {
      id: data.id,
      value: data.value,
    };
    try {
      this.stockservice.updateStockPrice(newPrice);
      client.emit('stockPrice-updated-success', newPrice);
    } catch (e) {
      client.emit('stockPrice-updated-error', e.message);
    }
  }*/

  

}
