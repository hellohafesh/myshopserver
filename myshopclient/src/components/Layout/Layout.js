import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{`${title}My Shop`}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "85vh", marginTop: "78px" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "Shop Now - ",
  description: "MERN Stack E - Commerce Project",
  keywords: "mern,react,node,mongodb",
  author: "myshop,My Shop",
};
export default Layout;
