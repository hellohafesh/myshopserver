import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../Context/SearchContex";
import { Link, useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  return (
    <Layout title={"Search results - "}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h5>
            {values?.results.length < 1
              ? "No Product Found"
              : `Found ${values?.results.length}`}
          </h5>

          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div
                className="card m-3"
                key={p._id}
                style={{ width: "14rem", height: "400px" }}
              >
                <img
                  height={"170px"}
                  src={`/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h6 className="card-title" style={{ fontSize: ".8rem" }}>
                    {`${p.name.substring(0, 70)}...`}
                  </h6>
                  <p className="card-text" style={{ fontSize: "0.7rem" }}>
                    {`${p.description.substring(0, 140)}.....`}
                  </p>
                  <p className="card-text" style={{ fontSize: "0.7rem" }}>
                    {`$ ${p.price}`}
                  </p>
                  <button
                    onClick={() => navigate(`/product/${p.slug}`)}
                    to={"/"}
                    className="btn btn-xs btn-primary ms-1"
                    style={{ fontSize: "0.7rem" }}
                  >
                    See Details
                  </button>
                  <Link
                    to={"/"}
                    className="btn btn-xs btn-info ms-1"
                    style={{ fontSize: "0.7rem" }}
                  >
                    add Card
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
