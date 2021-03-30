import styled from "@emotion/styled";

const Container = styled.div`
  position: absolute;
  bottom: 60px;
  right: 60px;
  z-index: 10;
`;

const GuideText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const Keyboard = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: white;
  color: red;
  opacity: 0.5;
  text-align: center;
  font-weight: bold;
  border: solid 0.5px #757575;
  border-radius: 6px;
`;

const Guide = () => {
  return (
    <Container>
      <GuideText>
        <div>
          <Keyboard>P</Keyboard>ause auto mode
        </div>
        <div>
          <Keyboard>S</Keyboard>witch interactive mode
        </div>
        <div>
          <Keyboard>R</Keyboard>eset cubes
        </div>
      </GuideText>
    </Container>
  );
};

export default Guide;
