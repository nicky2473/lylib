import styled from "@emotion/styled";
import Card from "ui/atom/Card";
import SVG from "ui/svg/SVG";
import colors from "ui/theme";

const Container = styled(Card)`
  display: flex;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 500px;
  border-radius: 20px 0 0 20px;
`;

const AddImage = styled.div`
  text-align: center;
  cursor: pointer;

  > div {
    font-size: 30px;
    margin-top: 20px;
    color: ${colors.primary.original};
  }
`;

const ChangeIconPopup = () => {
  return (
    <Container>
      <Contents>
        <AddImage>
          <SVG filename="image" width="240px" />
          <div>Click to add custom icon</div>
        </AddImage>
      </Contents>
    </Container>
  );
};

export default ChangeIconPopup;
