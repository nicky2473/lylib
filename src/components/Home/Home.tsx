import styled from "@emotion/styled";
import Link from "next/link";
import Button from "ui/Button";
import theme from "ui/theme";
import Background from "./Background";

const Container = styled.div`
  height: 100%;
  position: relative;
`;

const Contents = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
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

const Home = () => (
  <Container>
    <Contents>
      <Title>
        <span>L</span>ist <span>Y</span>our <span>LIB</span>raries
      </Title>
      <Description>
        Search used libraries in your project, and then Export
      </Description>
      <Link href="/workspace" passHref>
        <a style={{ textDecoration: "none" }}>
          <Button>
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              Go To Use
            </div>
          </Button>
        </a>
      </Link>
    </Contents>
    <Background />
  </Container>
);

export default Home;
