import classNames from "classnames";
import { ChevronRight, Heart } from "lucide-react";
import { Rating } from "react-simple-star-rating";
import Button from "./Button";
import type { TFavourites } from "../interface/interface";

interface TBook {
  thumbnail: string;
  name: string;
  author: [] | undefined;
  ratingValue: number;
  index: number;
  totalBook: number;
  addToFavourite: (payload: TFavourites) => void;
}

const Book = (props: TBook) => {
  const serializedAuthors = () => {
    if (!props.author || props.author.length === 0) return "No Author";

    const splitted = props.author?.join(",");

    return splitted;
  };

  const handleAddToFavourites = () => {
    const { name, thumbnail, ratingValue: rating } = props;

    const payload = {
      author: serializedAuthors(),
      name,
      thumbnail,
      rating,
    };

    props.addToFavourite(payload);
  };

  return (
    <div className={classNames({
      'border-b-2 border-gray-200 p-5 transition duration-200 ease-in-out hover:bg-gray-300': true,
      'border-none': props.index === props.totalBook - 1, 
    })}>
      <div className="flex gap-5">
        <div className="max-w-[80px] overflow-hidden rounded-xl">
          <img
            className="w-full"
            src={props.thumbnail}
            alt=""
          />
        </div>
        <div className="flex justify-between w-full">
          <div className="my-auto flex flex-col gap-2">
            <p className="text-xl font-semibold max-w-52">{props.name}</p>
            <p className="text-sm max-w-52">{serializedAuthors()}</p>
            <Rating
              readonly={true}
              initialValue={props.ratingValue}
              size={20}
              SVGstyle={ { 'display':'inline' } }
            />
          </div>
          <ChevronRight className="my-auto" />
        </div>
      </div>
      <div className="mt-5">
        <Button
          onClick={handleAddToFavourites}
        >
          <Heart size={14} className="my-auto" />
          <p className="my-auto">Add to favourite</p>
        </Button>
      </div>
    </div>
  )
};

export default Book;