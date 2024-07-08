import { sleep } from "../utils";

export type User = {
  id: number;
  name: string;
  sprites: {
    front_shiny: string;
  };
};

export const getUser = async (id: string): Promise<User> => {
  await sleep(1000); // simulate slow network
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.json();
};
