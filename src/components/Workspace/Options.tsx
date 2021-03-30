import styled from "@emotion/styled";
import { useState } from "react";
import { animated, useSpring } from "react-spring";
import Checkbox from "ui/Checkbox";
import SVG from "ui/svg/SVG";
import useWorkspace from "./Workspace.hooks";
import useMeasure from "react-use-measure";

const Container = styled(animated.div)`
  position: absolute;
  top: -40px;
  left: 50%;
  z-index: 20;
`;

const Contents = styled(animated.div)`
  padding: 20px;
  background-color: #ece5ce;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  overflow-y: hidden;
`;

const Handle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 60px;
  height: 30px;
  background-color: #ece5ce;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.2);
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Body = styled.div`
  display: flex;
  gap: 10px;
`;

const Label = styled.span`
  font-size: 16px;
`;

const Options = () => {
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);
  const [ref, bounds] = useMeasure();
  const toggleOption = useWorkspace((s) => s.toggleOption);

  const props = useSpring({
    from: { opacity: 0, height: 0 },
    opacity: isOpenOption ? 1 : 0,
    height: isOpenOption ? bounds.height + 40 : 0,
  });

  return (
    <Container
      style={useSpring({
        top: isOpenOption ? 0 : -40,
      })}
    >
      <Contents style={props}>
        <div ref={ref}>
          <Title>Visibility</Title>
          <Body>
            <Checkbox
              id="libNameVisibility"
              defaultChecked
              onChange={() => toggleOption("libraryName")}
            >
              <Label>Library Name</Label>
            </Checkbox>
            <Checkbox
              id="libOwnerVisibility"
              onChange={() => toggleOption("libraryOwner")}
            >
              <Label>Owner</Label>
            </Checkbox>
            <Checkbox
              id="libIconVisibility"
              defaultChecked
              onChange={() => toggleOption("libraryIcon")}
            >
              <Label>Icon</Label>
            </Checkbox>
          </Body>
        </div>
      </Contents>
      <Handle onClick={() => setIsOpenOption((prev) => !prev)}>
        <SVG filename="common/visibility" width="30px" />
      </Handle>
    </Container>
  );
};

export default Options;
