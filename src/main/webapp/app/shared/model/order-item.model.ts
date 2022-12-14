import { IProduct } from 'app/shared/model/product.model';
import { IProductOrder } from 'app/shared/model/product-order.model';
import { OrderItemStatus } from 'app/shared/model/enumerations/order-item-status.model';

export interface IOrderItem {
  id?: string;
  quantity?: number;
  totalPrice?: number;
  status?: OrderItemStatus;
  product?: IProduct | null;
  order?: IProductOrder | null;
}

export const defaultValue: Readonly<IOrderItem> = {};
