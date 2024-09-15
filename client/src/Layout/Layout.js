import React, { Fragment, useEffect, useState } from "react";
import AppRoutes from "./AppRoutes";
import Loading from "../Component/Loading";
import Header from "../Component/GlobalComponent/Header";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <Fragment>
      {/* {isLoading ? (
        <Loading />
      ) : ( */}
      <main>
        <Header />
        <AppRoutes />
      </main>
      {/* )} */}
    </Fragment>
  );
};

export default Layout;
