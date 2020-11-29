import Link from "next/link";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  height: 70px;
  padding: 10px 40px;
`;

const Title = styled.div`
  font-size: 30px;
  cursor: pointer;
`;

const Header = () => {
  return (
    <Container>
      <Link href="/">
        <Title>LYLIB</Title>
      </Link>
    </Container>
  );
};

export default Header;
