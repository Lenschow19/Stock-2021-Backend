import { Module } from '@nestjs/common';
import { StockService } from '../core/service/stock.service';
import { StockGateway } from './gateway/stock.gateway';
import { IStockServiceProvider } from '../core/primary-ports/stock.service.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from '../infrastructure/Entities/stock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockEntity])
  ],
  providers: [
    StockGateway,
    {
      provide: IStockServiceProvider,
      useClass: StockService,
    },
  ],
  controllers: [],
})
export class StockModule {}
