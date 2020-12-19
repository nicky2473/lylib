import styled from "@emotion/styled";
import useWorkspace from "./Workspace.hooks";

const Container = styled.div`
  height: 600px;
  border: solid 1px gray;
  border-radius: 10px;
  margin-top: 50px;
  padding: 20px;
`;

const Library = styled.div`
  cursor: pointer;
`;

const LibZone = () => {
  const selectedLibraries = useWorkspace((s) => s.selectedLibraries);
  const removeLibrary = useWorkspace((s) => s.removeLibrary);

  const renderLibrarys = () => {
    return selectedLibraries.map((elem, index) => {
      return (
        <Library key={index} onClick={() => removeLibrary(elem)}>
          {elem}
        </Library>
      );
    });
  };

  return <Container>{renderLibrarys()}</Container>;
};

export default LibZone;
