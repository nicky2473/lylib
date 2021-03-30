import styled from "@emotion/styled";
import Options from "./Options";
import Results from "./Results";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  border: solid 1px gray;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.5);
`;

const LibZone = () => {
  return (
    <Container>
      <Options />
      <Results />
    </Container>
  );
};

export default LibZone;
