import styled from "@emotion/styled";
import theme from "ui/theme";
import useWorkspace from "./Workspace.hooks";

const Container = styled.div`
  height: 600px;
  border: solid 3px ${theme.primary};
  margin-top: 50px;
  padding: 20px;
`;

const Library = styled.div`
  cursor: pointer;
`;

const LibZone = () => {
  const selectedPackages = useWorkspace((s) => s.selectedPackages);
  const removePackage = useWorkspace((s) => s.removePackage);

  const renderPackages = () => {
    return selectedPackages.map((elem, index) => {
      return (
        <Library key={index} onClick={() => removePackage(elem)}>
          {elem}
        </Library>
      );
    });
  };

  return <Container>{renderPackages()}</Container>;
};

export default LibZone;
