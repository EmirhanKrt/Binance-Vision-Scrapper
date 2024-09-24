import { Fragment } from "react";

import Header from "@/components/header";
import MainContainer from "@/components/main-container";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <MainContainer />
      <Footer />
    </Fragment>
  );
}
