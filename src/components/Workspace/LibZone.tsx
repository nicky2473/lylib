import styled from "@emotion/styled";
import { createRef, useMemo, useRef, useState } from "react";
import theme from "ui/theme";
import useWorkspace from "./Workspace.hooks";

const Container = styled.div`
  position: relative;
  height: 600px;
  border: solid 1px gray;
  border-radius: 10px;
  margin-top: 50px;
  padding: 20px;
`;

const Contents = styled.div`
  display: flex;
`;

const Library = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 20px;

  & > div:nth-of-type(1) {
    margin-right: 20px;
  }
`;

const Logo = styled.img`
  height: 80px;
`;

const ExportButton = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  right: 30px;
  bottom: 30px;
  border-radius: 100%;
  background-color: ${theme.primary};
  cursor: pointer;
`;

const NoProfile = styled.div<{ color: string; textColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: ${(props) => props.color};
  color: ${(props) => props.textColor};
  font-size: 30px;
`;

const Text = styled.div`
  font-size: 30px;
`;

const LibZone = () => {
  const selectedLibraries = useWorkspace((s) => s.selectedLibraries);
  const removeLibrary = useWorkspace((s) => s.removeLibrary);

  const renderLibraries = () => {
    return selectedLibraries.map((elem, index) => {
      // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
      const r = parseInt(elem.color.substring(1, 3), 16); // hexToR
      const g = parseInt(elem.color.substring(3, 5), 16); // hexToG
      const b = parseInt(elem.color.substring(5, 7), 16); // hexToB

      const textColor =
        r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "black" : "white";

      const filename = elem.name.replace("/", "-");

      return (
        <Library key={index} onClick={() => removeLibrary(elem.name)}>
          {/* <Logo
            src={`libicons/${filename}.png`}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          /> */}
          <NoProfile color={elem.color} textColor={textColor}>
            {elem.name.split("/")[1].slice(0, 1).toUpperCase()}
          </NoProfile>
          <Text>{elem.name.split("/")[1]}</Text>
        </Library>
      );
    });
  };

  return (
    <Container>
      <Contents>{renderLibraries()}</Contents>
      <ExportButton>
        <img src="/common/export.svg" style={{ width: "45px" }} />
      </ExportButton>
    </Container>
  );
};

export default LibZone;
