import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import { ReactElement, useEffect } from "react";
import { createPortal } from "react-dom";
import create from "zustand";
import Dimmed from "./Dimmed";

const Container = styled(Dimmed)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Store = {
  children: ReactElement;
};

const useStore = create<Store>(() => ({
  children: null,
}));

export const popup = {
  open: (children: Store["children"]) => useStore.setState({ children }),
  close: () => useStore.setState({ children: null }),
};

const Popup = () => {
  const router = useRouter();
  const children = useStore((s) => s.children);

  const handleClose = (e) => {
    if (e.currentTarget === e.target) {
      popup.close();
    }
  };

  const handleNextRouteChange = () => {
    useStore.setState({ children: null });
  };

  useEffect(() => {
    /**
     * Popup should automatically be closed when page navigates.
     */
    router.events.on("routeChangeStart", handleNextRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleNextRouteChange);
      useStore.setState({ children: null });
    };
  }, []);

  if (!children || !process.browser) return null;

  return createPortal(
    <Container onPointerDown={handleClose}>{children}</Container>,
    document.getElementById("popup")
  );
};

export default Popup;
