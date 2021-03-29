import styled from "@emotion/styled";
import SVG from "ui/svg/SVG";
import theme from "ui/theme";
import useWorkspace from "./Workspace.hooks";
import html2canvas from "html2canvas";
import { useRef } from "react";

const Container = styled.div`
  position: relative;
  flex: 1 0 auto;
  border: solid 1px gray;
  border-radius: 10px;
  padding: 20px;
  overflow: auto;
`;

const DownloadArea = styled.div`
  height: 100%;
`;

const Contents = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Library = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 20px;
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

const Icon = styled.img`
  height: 60px;
  margin-right: 20px;
`;

const NoProfile = styled.div<{ color: string; textColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin-right: 20px;
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
  const options = useWorkspace((s) => s.options);
  const downloadRef = useRef<HTMLDivElement>(null);

  const saveAs = (uri: string, filename: string) => {
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = uri;
      link.download = filename;

      document.body.appendChild(link);

      link.click();
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  };

  const downloadPng = () => {
    if (!downloadRef.current) return;

    html2canvas(downloadRef.current).then((canvas) => {
      saveAs(canvas.toDataURL(), "lylib.png");
    });
  };

  const renderLibraries = () => {
    return selectedLibraries.map((elem, index) => {
      // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
      const r = parseInt(elem.color.substring(1, 3), 16); // hexToR
      const g = parseInt(elem.color.substring(3, 5), 16); // hexToG
      const b = parseInt(elem.color.substring(5, 7), 16); // hexToB

      const textColor =
        r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "black" : "white";

      return (
        <Library key={index} onClick={() => removeLibrary(elem.name)}>
          {options.libraryIcon ? (
            elem.fullPath ? (
              <Icon src={elem.fullPath} />
            ) : (
              <NoProfile color={elem.color} textColor={textColor}>
                {elem.name.split("/")[1].slice(0, 1).toUpperCase()}
              </NoProfile>
            )
          ) : (
            <></>
          )}
          {options.libraryName && (
            <Text>
              {options.libraryOwner ? elem.name : elem.name.split("/")[1]}
            </Text>
          )}
        </Library>
      );
    });
  };

  return (
    <Container>
      <DownloadArea ref={downloadRef}>
        <Contents>{renderLibraries()}</Contents>
        <ExportButton onClick={downloadPng} data-html2canvas-ignore>
          <SVG filename="common/export" width="45px" />
        </ExportButton>
      </DownloadArea>
    </Container>
  );
};

export default LibZone;
