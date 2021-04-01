import styled from "@emotion/styled";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import colors from "../theme";

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${colors.variant.original};
  cursor: pointer;
`;

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
}

const CircleButton: FC<Props> = ({ children, className, ...props }) => {
  return (
    <Button className={className} {...props}>
      {children}
    </Button>
  );
};

export default CircleButton;
