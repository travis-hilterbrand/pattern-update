import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, putUser } from "../api/user";
import { USERS_QUERY_KEY, USER_QUERY_KEY } from "./constants";

export const useEditUser = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync, status } = useMutation({
    mutationFn: (user: User) => {
      return putUser(user);
    },
    onMutate: (editedUser) => {
      const previous = queryClient.getQueryData([
        USER_QUERY_KEY,
        editedUser.id,
      ]);
      queryClient.setQueryData([USER_QUERY_KEY, editedUser.id], editedUser);
      return { previous };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEY],
      });
    },
    onError: (_error, newResource, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          [USER_QUERY_KEY, newResource.id],
          context.previous
        );
      }
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
