import { useQuery } from "react-query";
import { User, getUsers } from "../api/user";
import { USERS_QUERY_KEY } from "./constants";

export const useGetUsers = () => {
  const { data, error, isLoading, refetch } = useQuery<User[]>(
    [USERS_QUERY_KEY],
    () => getUsers()
  );
  return { data: data && data.length ? data : [], error, isLoading, refetch };
};
