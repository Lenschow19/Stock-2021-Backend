import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Socket } from 'socket.io';
import { IStockService, IStockServiceProvider } from '../../core/primary-ports/stock.service.interface';
import { Inject } from '@nestjs/common';
import { Stock } from '../../core/models/stock.model';


@WebSocketGateway()
export class StockGateway {
  @WebSocketServer() server;
  constructor(@Inject(IStockServiceProvider) private stockservice: IStockService) {}

  @SubscribeMessage('all-stocks')
  async handleChatEvent(
    @ConnectedSocket() client: Socket
  ) {
    const stocks = await this.stockservice.getStocks();
    client.emit('listenForStocks', stocks);
  }

  @SubscribeMessage('updateStock')
  async handleUpdateStock(
    @MessageBody() stock: Stock,
    @ConnectedSocket() client: Socket
  ) {
    await this.stockservice.updateStockPrice(stock);
    this.server.emit('updatedStock', stock);
  }
}
