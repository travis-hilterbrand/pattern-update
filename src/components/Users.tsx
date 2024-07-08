import { useEffect, useState } from "react";
import { useGetUsers } from "../hooks/useGetUsers";
import { UserCard } from "./UserCard";
import { UserList } from "./UserList";

export const Users = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const { data } = useGetUsers();
  useEffect(() => {
    if (data.length && selectedId === undefined) {
      setSelectedId(data[0].id);
    }
  }, [data, selectedId]);

  return (
    <>
      <UserList
        list={data}
        selectedId={selectedId}
        onSelect={(id) => setSelectedId(id)}
      />
      <hr />
      {selectedId && <UserCard id={selectedId} />}
    </>
  );
};
