import styled from "styled-components";

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
  selectedId: string;
  ids: string[];
  onSelect: (id: string) => void;
};
export const UserList = ({ selectedId, ids, onSelect }: UserListProps) => {
  return (
    <Container>
      {ids.map((id) => (
        <a
          href="#"
          style={{ color: selectedId === id ? "rebeccapurple" : undefined }}
          onClick={() => onSelect(id)}
        >
          {id}
        </a>
      ))}
    </Container>
  );
};
