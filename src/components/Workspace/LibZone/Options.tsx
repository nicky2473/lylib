import styled from "@emotion/styled";
import Checkbox from "ui/Checkbox";
import useWorkspace from "../Workspace.hooks";

const Container = styled.div`
  padding: 20px;
  background-color: #ece5ce;
  border-radius: 10px 10px 0 0;
`;

const Contents = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const Options = () => {
  const toggleOption = useWorkspace((s) => s.toggleOption);

  return (
    <Container>
      <Contents>
        <Title>Visibility</Title>
        <Checkbox
          id="libNameVisibility"
          defaultChecked
          onChange={() => toggleOption("libraryName")}
        >
          <span>Library Name</span>
        </Checkbox>
        <Checkbox
          id="libOwnerVisibility"
          onChange={() => toggleOption("libraryOwner")}
        >
          <span>Owner</span>
        </Checkbox>
        <Checkbox
          id="libIconVisibility"
          defaultChecked
          onChange={() => toggleOption("libraryIcon")}
        >
          <span>Icon</span>
        </Checkbox>
      </Contents>
    </Container>
  );
};

export default Options;
