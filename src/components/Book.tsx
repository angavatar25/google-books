import classNames from "classnames";
import { ChevronRight, Heart } from "lucide-react";
import { Rating } from "react-simple-star-rating";

import Button from "./Button";
import type { TFavourites } from "../interface/interface";
import { serializedAuthors } from "../helper/serializer";

interface TBook {
  thumbnail: string;
  name: string;
  author: [] | undefined;
  ratingValue: number;
  index: number;
  totalBook: number;
  showFavButton: boolean;
  addToFavourite?: (payload: TFavourites) => void;
}

const Book = ({ thumbnail, name, author, ratingValue, index, totalBook, showFavButton = true, addToFavourite }: TBook) => {
  const handleAddToFavourites = () => {
    const payload = {
      author: serializedAuthors(author ?? []),
      name,
      thumbnail,
      rating: ratingValue,
    };

    addToFavourite?.(payload);
  };

  return (
    <div className={classNames({
      'border-b-2 border-gray-200 p-5 transition duration-200 ease-in-out hover:bg-gray-300': true,
      'border-none': index === totalBook - 1, 
    })}>
      <div className="flex gap-5">
        <div className="max-w-[80px] overflow-hidden rounded-xl">
          <img
            className="w-full"
            src={thumbnail}
            alt=""
          />
        </div>
        <div className="flex justify-between w-full">
          <div className="my-auto flex flex-col gap-2">
            <p className="text-xl font-semibold max-w-52">{name}</p>
            <p className="text-sm max-w-52">{serializedAuthors(author ?? [])}</p>
            <Rating
              readonly={true}
              initialValue={ratingValue}
              size={20}
              SVGstyle={ { 'display':'inline' } }
            />
          </div>
          <ChevronRight className="my-auto" />
        </div>
      </div>
      {showFavButton ? (
        <div className="mt-5">
          <Button
            onClick={handleAddToFavourites}
          >
            <Heart size={14} className="my-auto" />
            <p className="my-auto">Add to favourite</p>
          </Button>
        </div>
      ) : null}
    </div>
  )
};

export default Book;