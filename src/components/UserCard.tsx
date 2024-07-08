import styled from "styled-components";
import { useGetUser } from "../hooks/useGetUser";
import { useEditUser } from "../hooks/useEditUser";

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
  const { editUser, isSaving } = useEditUser();

  return (
    <Container>
      {isLoading === true && <span>Loading...</span>}
      {data && (
        <div
          style={{
            cursor: isSaving ? "auto" : "pointer",
            opacity: isSaving ? 0.5 : 1.0,
          }}
          onClick={() => {
            editUser(data);
          }}
        >
          <div style={{ fontWeight: 700 }}>{data.name}</div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: data.color,
                display: "inline-block",
                height: 48,
                width: 48,
                marginTop: 8,
              }}
            />
          </div>
        </div>
      )}
    </Container>
  );
};
