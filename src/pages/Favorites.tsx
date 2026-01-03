import React from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();

  // Assuming favorites are stored in products slice as an array
  //   const favorites = useAppSelector((state) => state.products);
  const favorites: any = [];

  if (!favorites || favorites?.length === 0) {
    return <div className="p-4">No favorites added yet.</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {favorites?.map((product: any) => (
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
            // onClick={() => dispatch(removeFavorite(product.id))}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
