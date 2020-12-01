import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

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

const BackgroundImage = styled.img`
  position: absolute;
  padding: 40px;
  border: solid 1px #b5b5b5;
  animation: ${({ top }: AnimationProps) => moveImage(top)} 1s ease-out
    ${({ delay }: AnimationProps) => delay || 0}s;
`;

const Background = () => {
  return (
    <>
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
    </>
  );
};

export default Background;
