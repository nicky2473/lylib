import styled from "@emotion/styled";
import Workspace from "components/Workspace/Workspace";
import { useEffect, useRef } from "react";
import Button from "ui/Button";
import theme from "ui/theme";
import useMeasure from "react-use-measure";
import mergeRefs from "react-merge-refs";
import Header from "components/common/Header";
import SVG from "ui/svg/SVG";
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
  const hash = window.location.hash;
  const workspaceRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [measureRef, bounds] = useMeasure({ scroll: true });

  useEffect(() => {
    if (!workspaceRef.current || !containerRef.current) return;

    if (!hash || hash === "#home")
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    else if (hash === "#workspace")
      workspaceRef.current.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <>
      <Header />
      <Container ref={mergeRefs([measureRef, containerRef])}>
        <Contents>
          <Title>
            <span>L</span>ist <span>Y</span>our <span>LIB</span>raries
          </Title>
          <Description>
            Search used libraries in your project, List, and Export
          </Description>
          <Link href="#workspace">
            <a style={{ textDecoration: "none" }}>
              <Button>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Go to workspace
                </div>
              </Button>
            </a>
          </Link>
        </Contents>
        <div id="scroll-pin-workspace" ref={workspaceRef} />
        <Workspace />
        {bounds.top < 0 && (
          <Link href="#home">
            <ScrollButton>
              <SVG filename="common/arrow-thin-up" width="15px" />
            </ScrollButton>
          </Link>
        )}
      </Container>
    </>
  );
};

export default Home;
