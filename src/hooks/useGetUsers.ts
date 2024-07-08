import { useQuery } from "react-query";
import { User, getUsers } from "../api/user";

export const useGetUsers = () => {
  const { data, error, isLoading } = useQuery<User[]>(["users"], () =>
    getUsers()
  );
  return { data: data && data.length ? data : [], error, isLoading };
};
