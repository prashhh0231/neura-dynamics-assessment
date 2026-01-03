import { useEffect } from "react";
import { fetchProducts } from "../redux/slices/productSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { productList } = useAppSelector((s) => s.products);

  console.log("products", productList);

  useEffect(() => {
    // dispatch(fetchProducts());
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Marketplace</h1>
        <p className="text-muted-foreground">
          Browse and discover amazing products
          {/* <Card></Card> */}
        </p>
      </div>
    </div>
  );
}
