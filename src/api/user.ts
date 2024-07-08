import { sleep } from "../utils";

export type User = {
  id: string;
  name: string;
};

export const getUsers = async (): Promise<User[]> => {
  await sleep(500); // simulate slow network
  const response = await fetch(`users`);
  return response.json();
};

export const getUser = async (id: string): Promise<User> => {
  await sleep(1000); // simulate slow network
  const response = await fetch(`/users/${id}`);
  return response.json();
};
