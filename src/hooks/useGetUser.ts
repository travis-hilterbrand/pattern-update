import { useQuery } from "react-query";
import { User, getUser } from "../api/user";

export const useGetUser = (id: string) => {
  const { data, error, isLoading } = useQuery<User>(["pokemon", id], () =>
    getUser(id)
  );
  return { data, error, isLoading };
};
