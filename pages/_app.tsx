import { AppProps } from "next/app";
import Head from "next/head";
import styled from "@emotion/styled";
import Header from "components/common/Header";

const Container = styled.div`
  overflow: hidden;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Head>
        <title>LYLIB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Component {...pageProps} />

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Ubuntu", sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Container>
  );
}

export default MyApp;
