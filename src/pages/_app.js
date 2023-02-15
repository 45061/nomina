/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/Navbar";
import { getUserData } from "@/store/actions/authAction";
import "@/styles/globals.css";
import { useEffect } from "react";

import { Provider, useDispatch, useSelector } from "react-redux";

import { wrapper, store } from "../store/store";

function App({ Component, pageProps }) {
  const { isAuth } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [isAuth]);

  console.log("este es el user de useSelector", isAuth);
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
