export const serializedAuthors = (author: string[]) => {
  if (!author || author.length === 0) return "No Author";

  const splitted = author?.join(",");

  return splitted;
};