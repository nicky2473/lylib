import styled from "@emotion/styled";
import colors from "ui/theme";
import LibZone from "./LibZone";
import Options from "./Options";
import SearchArea from "./SearchArea";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 100px;
  background-color: ${colors.primary.original};

  & > div {
    margin: 10px 0;
  }
`;

const Workspace = () => {
  return (
    <Container>
      <SearchArea />
      <Options />
      <LibZone />
    </Container>
  );
};

export default Workspace;
