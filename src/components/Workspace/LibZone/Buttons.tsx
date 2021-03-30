import styled from "@emotion/styled";
import html2canvas from "html2canvas";
import SVG from "ui/svg/SVG";
import { MutableRefObject } from "react";
import CircleButton from "ui/CircleButton";

const Container = styled.div`
  display: flex;
  position: absolute;
  gap: 20px;
  right: 30px;
  bottom: 30px;
`;

interface Props {
  downloadRef: MutableRefObject<HTMLDivElement>;
}

const Buttons = ({ downloadRef }: Props) => {
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

  return (
    <Container>
      <CircleButton onClick={downloadPng}>
        <SVG filename="common/export" width="45px" />
      </CircleButton>
    </Container>
  );
};

export default Buttons;
