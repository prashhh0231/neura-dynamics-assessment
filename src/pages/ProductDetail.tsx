import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchSingleProducts } from "../redux/slices/productSlice";
import { Button } from "../components/ui/button";
import { MoveLeft } from "lucide-react";
import { Spinner } from "../components/ui/spinner";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  //   const products = useAppSelector((state) => state.products.items);
  //   const favorites = useAppSelector((state) => state.products.favorites);

  const { productDetails, loading } = useAppSelector((s) => s.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProducts(id));
    }
  }, [id]);

  console.log("productDetails", productDetails);

  const products: any = [];
  const favorites: any = [];

  const product = products.find((p: any) => p.id === Number(id));
  const isFavorite = product && favorites.some((f: any) => f.id === product.id);

  // if (!productDetails) {
  //   return <div className="p-4">Product not found.</div>;
  // }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <NavLink to="/">
        <Button variant={"outline"}>
          <MoveLeft /> Back
        </Button>
      </NavLink>

      {!productDetails && loading && (
        <div className="w-full flex justify-center my-20">
          <Spinner />
        </div>
      )}

      {productDetails && (
        <div className="p-4 flex flex-col md:flex-row gap-6 max-w-7xl pt-20 mt-4 bg-gray-100 rounded-md">
          <div className="md:w-1/2 flex justify-center">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className="h-96 object-contain"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">{productDetails?.title}</h2>
            <p className="text-gray-700 mb-2">{productDetails?.category}</p>
            <div className="flex items-center gap-2 text-sm my-3">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">{productDetails?.rating.rate}</span>
              <span className="text-muted-foreground">
                ({productDetails?.rating.count})
              </span>
            </div>
            <p className="text-xl font-semibold mb-4">
              Rs. {productDetails?.price}
            </p>
            <p className="mb-4">{productDetails?.description}</p>
            <button
              className={`px-4 py-2 rounded ${
                isFavorite ? "bg-red-500 text-white" : "bg-blue-500 text-white"
              }`}
              //   onClick={() =>
              //     isFavorite
              //       ? dispatch(removeFavorite(product.id))
              //       : dispatch(addFavorite(product))
              //   }
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
