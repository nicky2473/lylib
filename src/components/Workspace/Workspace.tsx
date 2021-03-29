import styled from "@emotion/styled";
import Header from "components/common/Header";
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

  & > div {
    margin: 10px 0;
  }
`;

const Workspace = () => {
  return (
    <>
      <Header />
      <Container>
        <SearchArea />
        <Options />
        <LibZone />
      </Container>
    </>
  );
};

export default Workspace;
