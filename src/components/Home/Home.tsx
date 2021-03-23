import styled from "@emotion/styled";
import Button from "ui/Button";
import theme from "ui/theme";
import Header from "components/common/Header";
import Link from "next/link";

const Container = styled.div`
  height: 100vh;
  position: relative;
  background: url("/main_background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Contents = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 120px;
`;

const Title = styled.div`
  font-family: Permanent Marker;
  font-size: 100px;
  margin-bottom: 20px;

  & > span {
    color: ${theme.primary};
  }
`;

const Description = styled.div`
  font-family: Shadows Into Light;
  font-size: 30px;
  margin-bottom: 40px;
`;

const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <Contents>
          <Title>
            <span>L</span>ist <span>Y</span>our <span>LIB</span>raries
          </Title>
          <Description>
            Search used libraries in your project, List, and Export
          </Description>
          <Link href="/workspace">
            <a style={{ textDecoration: "none" }}>
              <Button>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Go to workspace
                </div>
              </Button>
            </a>
          </Link>
        </Contents>
      </Container>
    </>
  );
};

export default Home;
