import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, putUser } from "../api/user";
import { USERS_QUERY_KEY, USER_QUERY_KEY } from "./constants";

export const useEditUser = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync, status } = useMutation({
    mutationFn: (user: User) => {
      return putUser(user);
    },
    onSuccess: (user: User) => {
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEY, user.id],
      });
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEY],
      });
    },
  });

  const editUser = async (userToEdit: User) => {
    if (status !== "pending") {
      const user = { ...userToEdit };
      const name = user.name;
      const lastChar = name.charAt(name.length - 1);
      let counter = parseInt(lastChar);
      if (isNaN(counter)) {
        user.name += "-1";
      } else {
        user.name = `${name.slice(0, name.length - 2)}-${counter + 1}`;
      }
      await mutateAsync(user);
    }
  };
  return { editUser, isSaving: isPending };
};
