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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Shadows+Into+Light&display=swap"
          rel="stylesheet"
        />
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
