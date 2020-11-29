import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import Button from "ui/Button";
import theme from "ui/theme";

interface AnimationProps {
  top: number;
  delay?: number;
}

const moveImage = (top: number) => keyframes`
  from {
    opacity: 0;
    top: ${top + 6}%
  }
  to {
    opacity: 1;
    top: ${top}%
  }
`;

const Container = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Title = styled.div`
  font-family: Nerko One;
  font-size: 120px;
  margin-bottom: 20px;

  & > span {
    font-weight: bold;
    color: ${theme.primary};
  }
`;

const Description = styled.div`
  font-size: 30px;
  margin-bottom: 40px;
`;

const BackgroundImage = styled.img`
  position: absolute;
  padding: 40px;
  border: solid 1px #b5b5b5;
  animation: ${({ top }: AnimationProps) => moveImage(top)} 1s ease-out
    ${({ delay }: AnimationProps) => delay || 0}s;
`;

const Home = () => (
  <Container>
    <Header />
    <Contents>
      <Title>
        <span>L</span>ist <span>Y</span>our <span>LIB</span>raries
      </Title>
      <Description>
        Search used libraries in your project, and then Export
      </Description>
      <Button>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>Go To Use</div>
      </Button>
    </Contents>
    <Footer />
    <BackgroundImage
      src="/image_main.svg"
      top={20}
      style={{
        width: "400px",
        transform: "rotate(20deg)",
        right: "10%",
        top: "20%",
        boxShadow: "20px 20px 25px 0 rgba(64, 67, 83, 0.4)",
      }}
    />
    <BackgroundImage
      src="/image_main_2.svg"
      top={50}
      delay={0.5}
      style={{
        opacity: 0,
        width: "350px",
        transform: "rotate(-30deg)",
        left: "10%",
        top: "45%",
        boxShadow: "-20px 20px 25px 0 rgba(64, 67, 83, 0.4)",
        animationFillMode: "forwards",
      }}
    />
  </Container>
);

export default Home;
