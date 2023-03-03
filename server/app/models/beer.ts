export interface Beer {
  id: number;
  name: string;
  image_url: string;
  description: string;
  food_pairing: string[];
}

export const isBeer = (input: any): input is Beer =>
  input &&
  input.id &&
  input.name &&
  input.image_url &&
  input.description &&
  input.food_pairing &&
  typeof input.id === "number" &&
  typeof input.name === "string" &&
  typeof input.image_url === "string" &&
  typeof input.description === "string" &&
  Array.isArray(input.food_pairing);
