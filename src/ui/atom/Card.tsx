import styled from "@emotion/styled";
import { ReactNode } from "react";

const CardBase = styled.div`
  border-radius: 20px;
  background-color: white;
`;

interface Props {
  children: ReactNode;
}

const Card = ({ children }: Props) => {
  return <CardBase>{children}</CardBase>;
};

export default Card;
