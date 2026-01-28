import { Product } from './product';

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered';

export type OrderItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
};
