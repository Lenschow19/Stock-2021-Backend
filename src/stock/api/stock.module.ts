import { Module } from '@nestjs/common';
import { StockService } from '../core/service/stock.service';
import { StockGateway } from './gateway/stock.gateway';
import { IStockServiceProvider } from '../core/primary-ports/stock.service.interface';

@Module({
  providers: [
    StockGateway,
    {
      provide: IStockServiceProvider,
      useClass: StockService,
    },
  ],
})
export class StockModule {}
