import styled from "@emotion/styled";
import Checkbox from "ui/Checkbox";
import SVG from "ui/svg/SVG";
import useWorkspace from "./Workspace.hooks";

const Container = styled.div`
  display: flex;
  align-items: center;

  & > div {
    margin-left: 15px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const Label = styled.span`
  font-size: 16px;
`;

const Options = () => {
  const toggleOption = useWorkspace((s) => s.toggleOption);

  return (
    <Container>
      <SVG filename="common/visibility" width="30px" />
      <Title>Visibility</Title>
      <Checkbox
        id="libNameVisibility"
        defaultChecked
        onChange={() => toggleOption("libraryName")}
      >
        <Label>Name</Label>
      </Checkbox>
      <Checkbox
        id="libOwnerVisibility"
        onChange={() => toggleOption("libraryOwner")}
      >
        <Label>Owner</Label>
      </Checkbox>
      <Checkbox
        id="libIconVisibility"
        defaultChecked
        onChange={() => toggleOption("libraryIcon")}
      >
        <Label>Icon</Label>
      </Checkbox>
    </Container>
  );
};

export default Options;
