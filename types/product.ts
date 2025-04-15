export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  status: 'available' | 'unavailable';
  date_created: string;
  description: string;
}
