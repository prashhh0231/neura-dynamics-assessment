import { useEffect } from "react";
import { fetchProducts } from "../redux/slices/productSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { Input } from "../components/ui/input";
import { Card, CardDescription, CardTitle } from "../components/ui/card";
import { ProductCard } from "../components/ProductCard";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { productList } = useAppSelector((s) => s.products);

  console.log("products", productList);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Marketplace</h1>
        <p className="text-muted-foreground">
          Browse and discover amazing products
        </p>
        <Input placeholder="Search product..." className="my-4" />

        <div className="my-4 grid grid-cols-4 gap-2">
          {productList?.map((item) => {
            return (
              <ProductCard
                id={item.id}
                image={item.image}
                price={item.price}
                rating={item.rating}
                title={item.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
