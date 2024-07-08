import { factory, primaryKey } from "@mswjs/data";
import { User } from "../api/user";

export const mockUsers: User[] = [
  {
    id: "1",
    color: "tomato",
    name: "bulbasaur",
  },
  {
    id: "2",
    color: "mediumseagreen",
    name: "charmander",
  },
  {
    id: "3",
    color: "bisque",
    name: "squirtle",
  },
];

// Create a "db" with an user model and some defaults
export const db = factory({
  user: {
    id: primaryKey(String),
    color: () => "Color",
    name: () => "Name",
  },
});

// create 3 users
mockUsers.forEach((user) => db.user.create(user));
