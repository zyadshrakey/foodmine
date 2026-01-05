import { CartItem } from './Cartitem';

export class Order {
  id!: number;
  items!: CartItem[];
  totalPrice!: number;
  name!: string;
  address!: string;
  addressLatLng?: LatLng;
  paymentId!: string;
  createdAt!: string;
  status!: string;
}

export class LatLng {
  lat!: string;
  lng!: string;
}
