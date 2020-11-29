import Link from "next/link";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 70px;
  padding: 10px 40px;
`;

const Footer = () => {
  return (
    <Container>
      <Link href="https://github.com/Junho-Cho/lylib" passHref>
        <a target="_blank">
          <img src="/icon_github.png" />
        </a>
      </Link>
    </Container>
  );
};

export default Footer;
