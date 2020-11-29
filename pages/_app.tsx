import { AppProps } from "next/app";
import Head from "next/head";
import styled from "@emotion/styled";

const Container = styled.div`
  min-height: 100vh;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Container>
        <Head>
          <title>LYLIB</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nerko+One:wght@400&display=swap"
            rel="stylesheet"
          ></link>
        </Head>

        <Component {...pageProps} />

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: "Noto Sans KR", sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </Container>
    </>
  );
}

export default MyApp;
