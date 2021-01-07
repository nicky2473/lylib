import styled from "@emotion/styled";
import Workspace from "components/Workspace/Workspace";
import { useRef } from "react";
import Button from "ui/Button";
import theme from "ui/theme";
import useMeasure from "react-use-measure";
import mergeRefs from "react-merge-refs";
import Header from "components/common/Header";
import SVG from "ui/svg/SVG";

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

const ScrollButton = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  right: 30px;
  bottom: 30px;
  border-radius: 100%;
  background-color: ${theme.primary};
  cursor: pointer;
`;

const Home = () => {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [measureRef, bounds] = useMeasure({ scroll: true });

  const clickButtonToWorkspace = () => {
    if (!workspaceRef.current) return;

    workspaceRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const clickButtonToTop = () => {
    if (!containerRef.current) return;

    containerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header clickTitle={clickButtonToTop} />
      <Container ref={mergeRefs([measureRef, containerRef])}>
        <Contents>
          <Title>
            <span>L</span>ist <span>Y</span>our <span>LIB</span>raries
          </Title>
          <Description>
            Search used libraries in your project, List, and Export
          </Description>
          <a
            style={{ textDecoration: "none" }}
            onClick={clickButtonToWorkspace}
          >
            <Button>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                Let's go make it!
              </div>
            </Button>
          </a>
        </Contents>
        <div id="scroll-pin-workspace" ref={workspaceRef} />
        <Workspace />
        {bounds.top < 0 && (
          <ScrollButton onClick={clickButtonToTop}>
            <SVG filename="common/arrow-thin-up" width="15px" />
          </ScrollButton>
        )}
      </Container>
    </>
  );
};

export default Home;
