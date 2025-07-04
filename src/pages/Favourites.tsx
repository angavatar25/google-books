import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";

import useFetch from "../hooks/useFetch";
import Book from "../components/Book";
import useNavigation from "../hooks/useNavigation";
import type { TFavouritesMapping } from "../interface/interface";
import { serializedAuthors } from "../helper/serializer";

const Favourites = () => {
  const { favList, loading, fetchFavouriteBooks } = useFetch();
  const { redirectToPage } = useNavigation();

  useEffect(() => {
    fetchFavouriteBooks();
  }, []);
  return (
    <div className="p-4">
      <div className="flex gap-5 mb-10">
        <button
          className=" cursor-pointer"
          onClick={() => redirectToPage("/")}
        >
          <ChevronLeft />
        </button>
        <h1 className="text-4xl font-bold">Favourites</h1>
      </div>
      {loading && favList.length === 0 && (<p>Loading...</p>)}
      {favList.length > 0 && favList.map((fav: TFavouritesMapping, index: number) => (
        <Book
          key={`book-${fav.id}`}
          thumbnail={fav.thumbnail}
          author={serializedAuthors(fav.author)}
          name={fav.name}
          ratingValue={fav.averageRating ?? 0}
          index={index}
          totalBook={favList.length}
          showFavButton={false}
        />
      ))}
    </div>
  )
};

export default Favourites;