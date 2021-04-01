import { AppProps } from "next/app";
import Head from "next/head";
import styled from "@emotion/styled";
import Header from "components/common/Header";
import Popup from "ui/atom/Popup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  overflow: hidden;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        style={{ zIndex: 1000 }}
      />
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
      <Popup />
      <div id="popup" />
    </>
  );
}

export default MyApp;
