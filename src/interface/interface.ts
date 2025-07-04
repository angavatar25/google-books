export interface TFavourites {
  id?: string;
  authors: string[];
  title: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  averageRating: number;
};