import styled from "@emotion/styled";
import colors from "ui/theme";
import LibZone from "./LibZone/LibZone";
import SearchArea from "./SearchArea";

const Container = styled.div`
  position: relative;
  display: flex;
  gap: 50px;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 100px 100px 50px 100px;
  background: linear-gradient(
    135deg,
    ${colors.primary.original} 70%,
    white 70% 100%
  );
`;

const Workspace = () => {
  return (
    <Container>
      <SearchArea />
      <LibZone />
    </Container>
  );
};

export default Workspace;
