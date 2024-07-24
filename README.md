# Pattern - Update

## Overview

This expands the pattern-query example to include model updating.

It is common in applications to have multiple sources of truth. The selectable banner across the top is filled from the users API. Individual users are selected by clicking on a user which triggers a fetch from the user API. Typically, the user API will contain detailed information not present for the user in the list API.

Clicking on the user will update a counter applied to the name.

## Optimistic update

To improve user feedback, the counter is immediately incremented on click before the call to update the API. This updates the display of the user (UserCard component).

On success, the query key for the list is invalidated which triggers a fetch of the list API (UserList component).

```typescript
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEY],
      });
    },
```

On error, the optimistic update is rolled back.

```typescript
    onError: (_error, newResource, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          [USER_QUERY_KEY, newResource.id],
          context.previous
        );
      }
    },
```

As with queries, the update is handled using a custom hook `useEditUser`.

## Pessimistic update

The Pessimistic approach updates the UI once the API call is completed and the data or state has been confirmed. This approach prioritizes consistency and reliability over instant feedback to the user.

This is even simpler than the optimistic example.

```typescript
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
```

## Error handling

Error notifications can be handled globally or per individual call. A detailed explanation is here (https://tkdodo.eu/blog/react-query-error-handling)

## Query keys

Query Keys are a very important core concept in React Query. They are necessary so that the library can internally cache your data correctly and refetch automatically when a dependency to your query changes. Lastly, it will allow you to interact with the Query Cache manually when needed, for example, when updating data after a mutation or when you need to manually invalidate some queries.

**List key**

```typescript
  const { data, error, isLoading, refetch } = useQuery<User[]>({
    queryKey: [USERS_QUERY_KEY],
    queryFn: () => getUsers(),
  });
```

**Item key**

```typescript
  const { data, error, isLoading } = useQuery<User>({
    queryKey: [USER_QUERY_KEY, id],
    queryFn: () => getUser(id),
  });
```

## References

- https://github.com/travis-hilterbrand/pattern-query
- https://dev.to/manishkc104/optimistic-and-pessimistic-ui-rendering-2n55
- https://tkdodo.eu/blog/react-query-error-handling
- https://tanstack.com/query/latest/docs/framework/react/typescript#registering-a-global-error

> IMPORTANT NOTE

For simplicity/ robustness, this project uses a mocked API that is enabled with `mock service worker` <https://mswjs.io/>.
