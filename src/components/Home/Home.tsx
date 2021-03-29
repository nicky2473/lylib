import styled from "@emotion/styled";
import Link from "next/link";
import Guide from "./Guide";
import InteractiveCubes from "./InteractiveCubes";

const Container = styled.div`
  height: 100vh;
`;

const Contents = styled.div`
  position: absolute;
  top: 20%;
  left: 100px;
  z-index: 10;
`;

const Title = styled.div`
  font-size: 120px;
`;

const Description = styled.div`
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
          <Description> {`-> Go to workspace`}</Description>
        </Link>
      </Contents>
      <Guide />
      <InteractiveCubes />
    </Container>
  );
};

export default Home;
