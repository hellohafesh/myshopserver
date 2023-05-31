import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../Context/AuthContext";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Home - "}>
      HomePAge
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomePage;
