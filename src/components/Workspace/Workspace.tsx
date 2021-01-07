import styled from "@emotion/styled";
import { forwardRef } from "react";
import LibZone from "./LibZone";
import SearchArea from "./SearchArea";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0 100px;
`;

const Workspace = () => {
  return (
    <Container>
      <SearchArea />
      <LibZone />
    </Container>
  );
};

export default forwardRef(Workspace);
