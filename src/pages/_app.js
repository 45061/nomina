import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

import { Provider } from "react-redux";

import { wrapper, store } from "../store/store";

function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default wrapper.withRedux(App);
