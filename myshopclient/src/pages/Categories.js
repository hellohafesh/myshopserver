import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../Hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories - "}>
      <h1>All Categories</h1>
      <div className="container">
        <div className="row">
          {categories?.map((c) => (
            <div key={c._id} className="col-md-6 mt-5 mb-3 gx-1 gy-1">
              <Link className="btn btn-info" to={`/category/${c.slug}`}>
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
