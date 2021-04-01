import styled from "@emotion/styled";
import useWorkspace from "../Workspace.hooks";
import { useRef, useState } from "react";
import CircleButton from "ui/atom/CircleButton";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";

const Container = styled.div`
  flex: 1 0 auto;
  padding: 20px;
`;

const DownloadArea = styled.div`
  height: 100%;
`;

const Contents = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Library = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: default;
  padding: 20px;
  gap: 20px;
`;

const Options = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  z-index: 10;

  > svg {
    color: lightgray;

    :hover {
      color: black;
    }
  }
`;

const ChangeIcon = styled.div`
  > label {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: lightgray;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const LibraryIcon = styled.div`
  position: relative;
`;

const NoProfile = styled.div<{ color: string; textColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: ${(props) => props.color};
  color: ${(props) => props.textColor};
  font-size: 30px;
`;

const Text = styled.div`
  font-size: 30px;
`;

const ExportButton = styled(CircleButton)`
  display: flex;
  position: absolute;
  gap: 20px;
  right: 30px;
  bottom: 30px;
`;

const ACCEPT = [".png", ".jpeg", ".jpg", ".svg", ".bmp"];

const Results = () => {
  const [hovering, setHovering] = useState<string>("");
  const selectedLibraries = useWorkspace((s) => s.selectedLibraries);
  const removeLibrary = useWorkspace((s) => s.removeLibrary);
  const updateFullPath = useWorkspace((s) => s.updateFullPath);
  const options = useWorkspace((s) => s.options);
  const downloadRef = useRef<HTMLDivElement>(null);

  const handleChangeIcon = (e) => {
    if (e.target.files === null) return;

    const reader = new FileReader();
    const file = e.target.files[0];
    const id = e.target.id;
    const extension = file.name.substring(file.name.lastIndexOf("."));

    if (!ACCEPT.includes(extension)) {
      toast.error("Not a valid file type.", {
        toastId: "notValidType",
      });

      return;
    }

    reader.onloadend = () => {
      updateFullPath(id, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

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

    html2canvas(downloadRef.current, { allowTaint: true, useCORS: true }).then(
      (canvas) => {
        saveAs(canvas.toDataURL(), "lylib.png");
      }
    );
  };

  const renderLibraries = () => {
    return selectedLibraries.map((elem) => {
      // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
      const r = parseInt(elem.color.substring(1, 3), 16); // hexToR
      const g = parseInt(elem.color.substring(3, 5), 16); // hexToG
      const b = parseInt(elem.color.substring(5, 7), 16); // hexToB

      const textColor =
        r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "black" : "white";

      return (
        <Library
          key={elem.name}
          onPointerMove={() => setHovering(elem.name)}
          onPointerLeave={() => setHovering("")}
        >
          {hovering === elem.name && (
            <Options>
              {/* 기여 이메일 전송 버튼은 스펙에서 우선 제외 */}
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 100 100"
                width="30px"
                cursor="pointer"
                onClick={handleClickProvide}
              >
                <switch>
                  <g>
                    <path d="M5273.1 2400.1v-2c0-2.8-5-4-9.7-4s-9.7 1.3-9.7 4v2c0 1.8.7 3.6 2 4.9l5 4.9c.3.3.4.6.4 1v6.4c0 .4.2.7.6.8l2.9.9c.5.1 1-.2 1-.8v-7.2c0-.4.2-.7.4-1l5.1-5c1.3-1.3 2-3.1 2-4.9zm-9.7-.1c-4.8 0-7.4-1.3-7.5-1.8.1-.5 2.7-1.8 7.5-1.8s7.3 1.3 7.5 1.8c-.2.5-2.7 1.8-7.5 1.8z" />
                    <path d="M5268.4 2410.3c-.6 0-1 .4-1 1s.4 1 1 1h4.3c.6 0 1-.4 1-1s-.4-1-1-1h-4.3zM5272.7 2413.7h-4.3c-.6 0-1 .4-1 1s.4 1 1 1h4.3c.6 0 1-.4 1-1s-.4-1-1-1zM5272.7 2417h-4.3c-.6 0-1 .4-1 1s.4 1 1 1h4.3c.6 0 1-.4 1-1 0-.5-.4-1-1-1z" />
                    <g>
                      <path d="M63 36.8c0-5.3 4.4-9.7 9.7-9.7h13.6l-4.7 4.5c-1.3 1.2-1.3 3.2-.1 4.5.6.6 1.4 1 2.3 1 .8 0 1.6-.3 2.2-.9l10-9.7c1.3-1.2 1.3-3.2.1-4.5l-9.7-10.1c-1.2-1.3-3.2-1.3-4.5-.1s-1.3 3.2-.1 4.5l4.3 4.5H72.7c-8.8 0-16 7.2-16 16v7.8l6.3 1.1v-8.9zM96.6 55.9c-1.1-1.5-3-2.3-4.8-2l-15.4 2.6c0 .4-.1.7-.1 1.1-.8 4.1-4.3 7.2-8.5 7.5l-1 .1c-5.5.4-11.2.3-16.7-.3l-4.5-.5c-1.4-.1-2.4-1.4-2.3-2.8.1-1.4 1.3-2.4 2.8-2.3l4.5.5c5.2.5 10.6.6 15.8.3l1-.1c1.9-.1 3.5-1.5 3.9-3.4.2-1.1 0-2.3-.7-3.2-.6-.9-1.6-1.6-2.7-1.8l-23.5-4.1c-2.6-.5-5.3 0-7.7 1.2L14.8 60.2 33 78.4l19.6 4.7c3.4.8 7 .3 10.1-1.5L95 63c1.2-.7 2.1-1.8 2.4-3.2.3-1.4 0-2.7-.8-3.9zM3.1 71c-.4.4-.6.9-.6 1.5s.2 1.1.6 1.5l14.4 14.4c.8.8 2.2.8 3 0l7.7-7.7-17.4-17.4L3.1 71z" />
                    </g>
                  </g>
                </switch>
              </svg> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="20px"
                cursor="pointer"
                onClick={() => removeLibrary(elem.name)}
              >
                <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
              </svg>
            </Options>
          )}
          <LibraryIcon>
            {elem.fullPath ? (
              <img src={elem.fullPath} height={100} />
            ) : (
              <NoProfile color={elem.color} textColor={textColor}>
                {elem.name.split("/")[1].slice(0, 1).toUpperCase()}
              </NoProfile>
            )}
            <input
              type="file"
              id={elem.name}
              name={elem.name}
              accept=".png, .jpg, .jpeg, .svg, .bmp"
              onChange={handleChangeIcon}
              style={{ display: "none" }}
            />
            {hovering === elem.name && (
              <ChangeIcon>
                <label htmlFor={elem.name}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="black"
                    width="20px"
                  >
                    <path d="M14.66 15.66A8 8 0 1117 10h-2a6 6 0 10-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z" />
                  </svg>
                </label>
              </ChangeIcon>
            )}
          </LibraryIcon>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="45px"
          >
            <g stroke="none" strokeWidth="1" fill="#fff" fillRule="evenodd">
              <path
                d="M14.5,2.13603897 C14.5,1.58375422 14.9477153,1.13603897 15.5,1.13603897 C16.0522847,1.13603897 16.5,1.58375422 16.5,2.13603897 L16.5,14.863961 C16.5,15.4162458 16.0522847,15.863961 15.5,15.863961 C14.9477153,15.863961 14.5,15.4162458 14.5,14.863961 L14.5,2.13603897 Z"
                fillRule="nonzero"
                transform="translate(15.500000, 8.500000) rotate(45.000000) translate(-15.500000, -8.500000) "
              />
              <path
                d="M19,5 L15,5 C14.4477153,5 14,4.55228475 14,4 C14,3.44771525 14.4477153,3 15,3 L20,3 C20.5522847,3 21,3.44771525 21,4 L21,9 C21,9.55228475 20.5522847,10 20,10 C19.4477153,10 19,9.55228475 19,9 L19,5 Z"
                fillRule="nonzero"
              />
              <path
                d="M17,13.5000015 C17,12.9477168 17.4477152,12.5000015 18,12.5000015 C18.5522847,12.5000015 19,12.9477168 19,13.5000015 L19,19.1250041 C19,20.7128208 17.7128189,22 16.1250013,22 L4.87499867,22 C3.28718109,22 2,20.7128208 2,19.1250039 L2.00000232,7.87499354 C2.00000232,6.28717812 3.28718237,5 4.87499951,5 C8.90694118,5.00000316 8.90694118,5.00000316 10.968755,5.00000379 C11.5210397,5.00000379 11.968755,5.44771904 11.968755,6.00000379 C11.968755,6.55228854 11.5210397,7.00000379 10.968755,7.00000379 C8.9069398,7.00000316 8.9069398,7.00000316 4.87499867,7 C4.39175119,7 4.00000232,7.39174829 4.00000232,7.87499374 L4,19.1250041 C4,19.6082507 4.39174991,20 4.87499867,20 L16.1250013,20 C16.6082501,20 17,19.6082507 17,19.1250041 L17,13.5000015 Z"
                fillRule="nonzero"
              />
            </g>
          </svg>
        </ExportButton>
      </DownloadArea>
    </Container>
  );
};

export default Results;
