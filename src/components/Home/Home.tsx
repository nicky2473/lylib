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

  > div {
    position: relative;
  }
`;

const Button = styled.div`
  font-family: Shadows Into Light;
  font-size: 50px;
  margin-top: 40px;
  cursor: pointer;

  :hover {
    color: white;
  }
`;

const Box = styled.span<{ width }>`
  :before {
    content: "";
    position: absolute;
    width: ${(props) => props.width + "px"};
    height: 30px;
    background-color: white;
    bottom: 20px;
    z-index: -1;
  }
`;

const Home = () => {
  return (
    <Container>
      <Contents>
        <Title>
          <div>
            <Box width={70}>L</Box>IST
          </div>
          <div>
            <Box width={70}>Y</Box>OUR
          </div>
          <div>
            <Box width={175}>LIB</Box>RARIES
          </div>
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
