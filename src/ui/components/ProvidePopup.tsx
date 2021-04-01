import styled from "@emotion/styled";
import { useState } from "react";
import { toast } from "react-toastify";
import Card from "ui/atom/Card";
import { popup } from "ui/atom/Popup";
import colors from "ui/theme";

const Container = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.primary.original};
  color: white;
  padding: 20px 40px;
  gap: 20px;

  > label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
    background-color: white;
    color: ${colors.primary.original};
    border: dashed 2px ${colors.primary.original};
    cursor: pointer;

    > div {
      text-align: center;
      font-size: 14px;
    }
  }
`;

const Close = styled.svg`
  position: absolute;
  top: 30px;
  right: 40px;
  cursor: pointer;
`;

const Send = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.div`
  font-size: 30px;
`;

const Description = styled.div`
  font-size: 20px;
`;

const ProvidePopup = () => {
  const [imageURL, setImageURL] = useState<string>("");

  const handleUpload = (e) => {
    if (e.target.files === null) return;

    const reader = new FileReader();
    const file = e.target.files[0];
    const extension = file.name.substring(file.name.lastIndexOf("."));

    if (extension !== ".png") {
      toast.error("Not a valid file type.", {
        toastId: "notValidType",
      });

      return;
    }

    reader.onloadend = () => {
      setImageURL(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSend = () => {
    if (!imageURL) {
      toast.error("No registered file.", {
        toastId: "noContents",
      });

      return;
    }
  };

  return (
    <Container>
      <Close
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        viewBox="0 0 20 20"
        onClick={() => popup.close()}
      >
        <path
          fill="white"
          d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
        />
      </Close>
      <Title>We Need Your Help!</Title>
      <Description>
        We are updating icons of various libraries. But it's still not enough.
        <br />
        Do you have an icon for that library?
        <br />
        Or is the registered icon inappropriate? <br />
        <br />
        <strong>please provide it to us.</strong>
      </Description>
      <input
        type="file"
        id="upload"
        name="upload"
        accept=".png"
        onChange={handleUpload}
        style={{ display: "none" }}
      />
      <label htmlFor="upload">
        {imageURL ? (
          <img src={imageURL} height="100" />
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              fill={colors.primary.original}
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0116 17H5a5 5 0 01-1-9.9V7a3 3 0 014.52-2.59A4.98 4.98 0 0117 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <div>
              .png file
              <br />
              height 100px or higher
            </div>
          </>
        )}
      </label>
      <Send>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="0 0 20 20"
          fill="white"
          cursor="pointer"
          onClick={handleSend}
        >
          <path d="M0 0l20 10L0 20V0zm0 8v4l10-2L0 8z" />
        </svg>
      </Send>
    </Container>
  );
};

export default ProvidePopup;
