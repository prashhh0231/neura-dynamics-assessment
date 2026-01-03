export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface ProductState {
  productList: Product[] | [];
  productDetails: Product | null;
  loading: boolean;
  error: string | null;
}
