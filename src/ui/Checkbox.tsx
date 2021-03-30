import styled from "@emotion/styled";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

const Container = styled.div`
  position: relative;
`;

const Contents = styled.div`
  > input[type="checkbox"] {
    display: none;
  }

  > input[type="checkbox"] + label {
    padding-left: 25px;
  }

  > input[type="checkbox"] + label:before {
    content: "";
    width: 15px;
    height: 15px;
    border-radius: 2px;
    border: solid 1.5px black;
    background-color: white;
    position: absolute;
    left: 0;
  }

  > input[type="checkbox"]:checked + label:before {
    content: "\u2714";
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: white;
    background-color: black;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
`;

interface Props
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "type"
  > {
  id: string;
}

const Checkbox: FC<Props> = ({ children, id, ...props }) => {
  return (
    <Container>
      <Contents>
        <input id={id} type="checkbox" {...props} />
        <Label htmlFor={id}>{children}</Label>
      </Contents>
    </Container>
  );
};

export default Checkbox;
