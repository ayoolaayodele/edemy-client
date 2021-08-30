import TopNav from "../components/TopNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/style.css";
import { useIsClient } from "react-util-hooks";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";

const myApp = ({ Component, pageProps }) => {
  // render your TopNav in this function
  function renderOnlyOnClient(TopNav) {
    return function ClientOnlyComponent({ children, ...rest }) {
      const isClient = useIsClient();
      return isClient ? <TopNav {...rest}>{children}</TopNav> : <></>;
    };
  }

  // Now we can just safe-wrap the component and use it freely
  const SafeComponentThatUsesUseLayoutEffect = renderOnlyOnClient(TopNav);

  return (
    <Provider>
      <ToastContainer position='top-center' />
      <SafeComponentThatUsesUseLayoutEffect>
        <TopNav />
      </SafeComponentThatUsesUseLayoutEffect>
      <Component {...pageProps} />
    </Provider>
  );
};

export default myApp;
