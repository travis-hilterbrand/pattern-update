import styled from "styled-components";
import { useGetUser } from "../hooks/useGetUser";

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #777;
`;

type UserCardProps = {
  id: string;
};
export const UserCard = ({ id }: UserCardProps) => {
  const { data, isLoading } = useGetUser(id);
  return (
    <Container>
      {isLoading === true && <span>Loading...</span>}
      {data && (
        <>
          <div style={{ fontWeight: 700 }}>{data.name}</div>
          <img alt="pokemon" src={data.sprites.front_shiny} />
        </>
      )}
    </Container>
  );
};
