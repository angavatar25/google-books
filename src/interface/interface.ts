export interface TFavourites {
  id?: string;
  author: string;
  name: string;
  thumbnail: string;
  rating: number;
};

export interface TFavouritesMapping {
  id?: string;
  author: string[];
  name: string;
  thumbnail: string;
  averageRating: number;
}