import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { Button } from "../components/ui/button";
import { MoveLeft } from "lucide-react";
import { Spinner } from "../components/ui/spinner";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { productList, loading } = useAppSelector((s) => s.products);
  const [productDetails, setProductDetails] = useState<any>(null);

  useEffect(() => {
    const product = productList.filter((item: any) => item?.id == Number(id));
    setProductDetails(product[0]);
  }, [id, productList]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <NavLink to="/">
        <Button variant={"outline"}>
          <MoveLeft /> Back
        </Button>
      </NavLink>

      {loading && !productDetails ? (
        <div className="w-full flex justify-center my-20">
          <Spinner />
        </div>
      ) : (
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
