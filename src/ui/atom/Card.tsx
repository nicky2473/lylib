import styled from "@emotion/styled";
import { ReactNode } from "react";

const CardBase = styled.div`
  border-radius: 20px;
  background-color: white;
`;

interface Props {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: Props) => {
  return <CardBase className={className}>{children}</CardBase>;
};

export default Card;
