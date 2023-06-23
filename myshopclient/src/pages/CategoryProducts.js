import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/product-category/${params.slug}`
      );

      setProducts(data?.products);
      setCategory(data?.category);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout title={"All Categories - "}>
      <div className="container">
        <h4 className="mt-3 text-center">
          Category - <b>{category?.name}</b>
        </h4>
        <h6 className="mt-3 text-center">{products?.length} result found</h6>

        <div className="d-flex flex-wrap mt-4">
          {products?.map((p) => (
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
    </Layout>
  );
};

export default CategoryProducts;
