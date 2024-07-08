import styled from "styled-components";
import { User } from "../api/user";

const Container = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  a {
    font-size: 22px;
    color: #777;
    &:hover {
      color: #000;
    }
  }
`;

type UserListProps = {
  list: User[];
  selectedId: string | undefined;
  onSelect: (id: string) => void;
};
export const UserList = ({ list, selectedId, onSelect }: UserListProps) => {
  return (
    <Container>
      {list.map((item) => (
        <a
          key={item.id}
          href="#"
          style={{
            color: selectedId === item.id ? "#000" : undefined,
          }}
          onClick={() => onSelect(item.id)}
        >
          {item.name}
        </a>
      ))}
    </Container>
  );
};
