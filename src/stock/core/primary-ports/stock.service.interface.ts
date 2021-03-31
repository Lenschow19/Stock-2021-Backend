import { Stock } from '../models/stock.model';

export const IStockServiceProvider = 'IStockServiceProvider'
export interface IStockService {

  createStock(stock: Stock): Promise<Stock>;

  getStocks(): Promise<Stock[]>;

  getStockById(id: string): Stock;

  updateStockPrice(stock: Stock): Promise<Stock>

  deleteStock(id: string);
}
