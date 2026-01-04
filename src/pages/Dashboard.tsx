import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../redux/slices/productSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { Input } from "../components/ui/input";
import { ProductCard } from "../components/ProductCard";
import { useDebounce } from "../hooks/useDebounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Spinner } from "../components/ui/spinner";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { productList, loading } = useAppSelector((s) => s.products);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<"asc" | "desc" | "none">("none");

  const categories = useMemo(() => {
    const set = new Set(productList.map((p) => p.category));
    return Array.from(set);
  }, [productList]);

  useEffect(() => {
    if (!loading) {
      dispatch(fetchProducts());
    }
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = productList;

    // Search
    if (debouncedSearch) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Category
    if (category && category !== "all") {
      filtered = filtered.filter((item) => item.category === category);
    }

    // Sort
    if (sort === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [productList, debouncedSearch, category, sort]);

  console.log("categories", categories);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Marketplace</h1>
        <p className="text-muted-foreground">
          Browse and discover amazing products
        </p>
        <Input
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="my-4"
        />

        <div className="flex gap-4 mb-4">
          {/* Category */}
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map((val) => (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select
            onValueChange={(value) => setSort(value as "asc" | "desc" | "none")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="asc">Low to High</SelectItem>
              <SelectItem value="desc">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {filteredProducts.length === 0 && loading && (
          <div className="w-full flex justify-center my-20">
            <Spinner />
          </div>
        )}

        <div className="my-4 grid md:grid-cols-2 lg:grid-cols-4 gap-2">
          {filteredProducts?.map((item) => {
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
