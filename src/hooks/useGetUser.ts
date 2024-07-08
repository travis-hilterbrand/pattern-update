import { useQuery } from "react-query";
import { User, getUser } from "../api/user";
import { USER_QUERY_KEY } from "./constants";

export const useGetUser = (id: string) => {
  const { data, error, isLoading } = useQuery<User>([USER_QUERY_KEY, id], () =>
    getUser(id)
  );
  return { data, error, isLoading };
};
