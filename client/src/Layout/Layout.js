import React, { Fragment, useEffect, useState } from "react";
import AppRoutes from "./AppRoutes";
import Loading from "../Component/Loading";
import Header from "../Component/GlobalComponent/Header";
import ScreenBlocker from "../Component/ScreenBlocker/ScreenBlockerComponent";

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
      <main style={{ marginTop: "8rem" }}>
       <ScreenBlocker>
       <Header />
       <AppRoutes />
       </ScreenBlocker>
       
      </main>
      {/* )} */}
    </Fragment>
  );
};

export default Layout;
