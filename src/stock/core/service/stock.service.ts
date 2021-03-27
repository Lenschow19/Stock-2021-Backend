import { Injectable } from '@nestjs/common';
import { Stock } from '../models/stock.model';
import { v4 as uuidv4 } from 'uuid';
import { IStockService } from '../primary-ports/stock.service.interface';

@Injectable()
export class StockService implements IStockService{
  stocks: Stock[] = [];

  createStock(stock: Stock): Stock {
    if (stock.name.length < 2) {
      throw new Error('Stockname is too short');
    }
    stock.id = uuidv4();
    this.stocks.push(stock);
    return stock;
  }

  getStocks(): Stock[] {
    return this.stocks;
  }

  getStockById(id: string): Stock {
    return this.stocks.find((s) => s.id === id);
  }

  /*updateStockPrice(value: number, id: string): Stock {
    this.stocks.find((s) => s.id === id);
  }*/

  deleteStock(id: string) {
    this.stocks = this.stocks.filter((s) => s.id !== id);
  }
}
