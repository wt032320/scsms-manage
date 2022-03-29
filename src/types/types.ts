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

interface PeopleList {
  page?: number;
  size?: number;
}

interface PeopleItem {
  id: number;
  username: string;
  phoneNum: string;
  email: string;
  gender: string;
}

interface AuditInfo {
  saleId: string;
  publish: string;
}

export { LoginInfo, OrderList, OrderItem, PeopleList, PeopleItem, AuditInfo };
