import { AppProps } from "next/app";
import Head from "next/head";
import styled from "@emotion/styled";
import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const Container = styled.div`
  overflow: hidden;
`;

function MyApp({ Component, pageProps }: AppProps) {
  const firebaseConfig = {
    apiKey: "AIzaSyAUPLz7pmr1kFPDhVjzocgeVHh6l007MtA",
    authDomain: "lylib-34128.firebaseapp.com",
    projectId: "lylib-34128",
    storageBucket: "lylib-34128.appspot.com",
    messagingSenderId: "831442574699",
    appId: "1:831442574699:web:ea0455f1b3719d2cb1802e",
    measurementId: "G-CPGFFGMJ2C",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

  return (
    <Container>
      <Head>
        <title>LYLIB</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Permanent+Marker&family=Shadows+Into+Light&display=swap"
          rel="stylesheet"
        />
      </Head>

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
