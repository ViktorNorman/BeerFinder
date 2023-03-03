import { Beer, isBeer } from "../models/beer";

export const buildPaginationParams = (args: any) =>
  `?per_page=${args?.paginationSize ?? 10}&page=${args?.page ?? 1}`;

export const buildBeerNameParam = (args: any) => {
  if (!args.searchTerm) {
    return "";
  }

  return `&beer_name=${args.searchTerm.replace(/ /g, "_")}`;
};

export const mapBeerData = (res: any) =>
  res
    .filter((element: any) => isBeer(element))
    .map(({ id, name, image_url, description, food_pairing }: Beer) => ({
      id,
      name,
      image_url,
      description,
      food_pairing,
    }));
