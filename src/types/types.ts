interface LoginInfo {
  username: string;
  password: string;
}

interface OrderList {
  page?: number;
  size?: number;
}

interface OrderItem {
  id: number;
  brand: string;
  series: string;
  model: string;
  structure: string;
  fuel: string;
  price: number;
}

export { LoginInfo, OrderList, OrderItem };
