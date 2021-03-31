import { Injectable } from '@nestjs/common';
import { Stock } from '../models/stock.model';
import { IStockService } from '../primary-ports/stock.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { StockEntity } from '../../infrastructure/Entities/stock.entity';
import { Repository } from 'typeorm';
import { UpdatePriceDto } from '../../api/dto/update-price.dto';

@Injectable()
export class StockService implements IStockService{
  stocks: Stock[] = [];

  constructor(
    @InjectRepository(StockEntity)
    private stockRepository: Repository<StockEntity>
  ) {
  }


  async createStock(stock: Stock): Promise<Stock> {
    const stockDb = await this.stockRepository.findOne({name: stock.name});
    if(!stockDb) {
      let newStock = this.stockRepository.create(stock);
      await this.stockRepository.save(newStock);
      return newStock;
    } else {
      throw new Error('Name already used! Please choose another.');
    }
  }

  async getStocks(): Promise<Stock[]> {
    return this.stockRepository.find({order: {name: 'ASC'}});
  }

  getStockById(id: string): Stock {
    return this.stocks.find((s) => s.id === id);
  }

  async updateStockPrice(stock: Stock): Promise<Stock> {
    await this.stockRepository.update(stock.id, stock);
    return stock;
  }

  deleteStock(id: string) {
    this.stocks = this.stocks.filter((s) => s.id !== id);
  }
}
