import dayjs from 'dayjs';
import { IInvoice } from 'app/shared/model/invoice.model';
import { IOrderItem } from 'app/shared/model/order-item.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IProductOrder {
  id?: string;
  placedDate?: string;
  status?: OrderStatus;
  code?: string;
  invoices?: IInvoice[] | null;
  orderItems?: IOrderItem[] | null;
  customer?: ICustomer;
}

export const defaultValue: Readonly<IProductOrder> = {};
