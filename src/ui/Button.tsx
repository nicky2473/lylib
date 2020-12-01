import styled from "@emotion/styled";
import { FC } from "react";
import theme from "ui/theme";

const Container = styled.div`
  width: fit-content;
  border-radius: 10px;
  padding: 15px 25px;
  background-color: ${theme.primary};
  color: black;
  cursor: pointer;
`;

const Button: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Button;
