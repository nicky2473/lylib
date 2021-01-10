import styled from "@emotion/styled";
import { forwardRef } from "react";
import LibZone from "./LibZone";
import Options from "./Options";
import SearchArea from "./SearchArea";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 100px;

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

export default forwardRef(Workspace);
