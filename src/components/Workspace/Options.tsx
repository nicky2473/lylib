import styled from "@emotion/styled";
import Checkbox from "rc-checkbox";
import useWorkspace from "./Workspace.hooks";

const Container = styled.div`
  display: flex;

  & > label {
    margin-right: 20px;
  }
`;

const Label = styled.span`
  font-size: 15px;
`;

const Options = () => {
  const toggleOption = useWorkspace((s) => s.toggleOption);

  return (
    <Container>
      <label>
        <Checkbox
          defaultChecked
          onChange={() => toggleOption("printLibraryName")}
        />
        <Label>Print Library's Name</Label>
      </label>
      <label>
        <Checkbox onChange={() => toggleOption("printLibraryOwner")} />
        <Label>Print Library's Owner</Label>
      </label>
      <label>
        <Checkbox
          defaultChecked
          onChange={() => toggleOption("printLibraryIcon")}
        />
        <Label>Print Library's Icon</Label>
      </label>
    </Container>
  );
};

export default Options;
