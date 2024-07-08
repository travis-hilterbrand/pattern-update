import { factory, primaryKey } from "@mswjs/data";
import { User } from "../api/user";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "bulbasaur",
  },
  {
    id: "2",
    name: "charmander",
  },
  {
    id: "3",
    name: "squirtle",
  },
];

// Create a "db" with an user model and some defaults
export const db = factory({
  user: {
    id: primaryKey(String),
    name: () => "Name",
  },
});

// create 3 users
mockUsers.forEach((user) => db.user.create(user));
