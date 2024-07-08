import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserCard } from "./components/UserCard";
import { UserList } from "./components/UserList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App() {
  const ids = ["bulbasaur", "charmander", "squirtle"];
  const [selectedItem, setSelectedItem] = useState("bulbasaur");

  return (
    <QueryClientProvider client={queryClient}>
      <UserList
        ids={ids}
        selectedId={selectedItem}
        onSelect={(id) => setSelectedItem(id)}
      />
      <hr />
      <UserCard id={selectedItem} />
    </QueryClientProvider>
  );
}

export default App;
