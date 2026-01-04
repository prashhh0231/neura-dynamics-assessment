import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { removeFromFavourite } from "../redux/slices/favourite/favouriteSlice";
import { NavLink } from "react-router-dom";
import { Button } from "../components/ui/button";
import { MoveLeft } from "lucide-react";

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();

  // Assuming favorites are stored in products slice as an array
  const { productList } = useAppSelector((state) => state.products);
  const { favProductList } = useAppSelector((state) => state.favourite);
  const [favourites, setFavourites] = useState<any[]>([]);

  useEffect(() => {
    const favProducts = productList.filter((product) =>
      favProductList.includes(product.id)
    );
    setFavourites(favProducts);
  }, [productList, favProductList]);

  if (!favourites || favourites?.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <NavLink to="/">
          <Button variant={"outline"}>
            <MoveLeft /> Back
          </Button>
        </NavLink>
        <div className="p-4">No favourites added yet.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <NavLink to="/">
        <Button variant={"outline"}>
          <MoveLeft /> Back
        </Button>
      </NavLink>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favourites?.map((product: any) => (
          <div
            key={product.id}
            className="border rounded p-4 flex flex-col justify-between"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-contain mb-2"
            />
            <h3 className="font-semibold mb-1">{product.title}</h3>
            <p className="text-gray-600 mb-2">${product.price}</p>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => dispatch(removeFromFavourite(product?.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
