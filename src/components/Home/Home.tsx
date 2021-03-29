import styled from "@emotion/styled";
import Link from "next/link";
import colors from "ui/theme";
import Guide from "./Guide";
import InteractiveCubes from "./InteractiveCubes";

const Container = styled.div`
  height: 100vh;
  background-color: ${colors.primary.original};
`;

const Contents = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 100px;
  z-index: 10;
`;

const Title = styled.div`
  font-size: 120px;
  pointer-events: none;
`;

const Button = styled.div`
  font-family: Shadows Into Light;
  font-size: 50px;
  margin-top: 40px;
  cursor: pointer;
`;

const Home = () => {
  return (
    <Container>
      <Contents>
        <Title>
          LIST
          <br />
          YOUR
          <br />
          LIBRARIES
        </Title>
        <Link href="/workspace">
          <Button>{`-> Go to workspace`}</Button>
        </Link>
      </Contents>
      <Guide />
      <InteractiveCubes />
    </Container>
  );
};

export default Home;
