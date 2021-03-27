import { Stock } from '../models/stock.model';

export const IStockServiceProvider = 'IStockServiceProvider'
export interface IStockService {
  createStock(stock: Stock): Stock;

  getStocks(): Stock[];

  getStockById(id: string): Stock;

  //updateStockPrice(stock: Stock): Stock;

  deleteStock(id: string);
}
