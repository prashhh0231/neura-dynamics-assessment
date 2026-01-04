import { Heart } from "lucide-react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  addInFavourite,
  removeFromFavourite,
} from "../redux/slices/favourite/favouriteSlice";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export function ProductCard({
  id,
  title,
  price,
  image,
  rating,
}: ProductCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const favorites = useAppSelector((state) => state.favourite.favProductList);
  const isFavorite = id != null && favorites.includes(id);

  const handleFavoriteToggle = () => {
    if (!isFavorite) {
      dispatch(addInFavourite(id));
    } else {
      dispatch(removeFromFavourite(id));
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      onClick={handleProductClick}
      className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <CardContent className="p-4 flex flex-col h-full">
        <div className="relative w-full h-64 mb-4 bg-muted rounded-lg overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="object-center p-2"
          />
        </div>
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-sm mb-3">
          <span className="text-yellow-500">★</span>
          <span className="font-medium">{rating.rate}</span>
          <span className="text-muted-foreground">({rating.count})</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            Rs. {price.toFixed(2)}
          </span>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteToggle();
            }}
            className={isFavorite ? "text-red-500 hover:text-red-500" : ""}
          >
            <Heart fill={isFavorite ? "currentColor" : "none"} size={20} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
