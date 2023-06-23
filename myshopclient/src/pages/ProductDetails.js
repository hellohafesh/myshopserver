import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [reletedProduct, setReletedProduct] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  console.log(product);
  console.log(reletedProduct);

  // initial p details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // getproduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product?._id, data?.product?.category?._id);
    } catch (e) {
      console.log(e);
    }
  };

  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/releted-product/${pid}/${cid}`
      );
      setReletedProduct(data?.products);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Layout title={"Search results - "}>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            height={"80%"}
            width={"60%"}
            src={`/api/v1/products/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-6 ">
          <h3 className="text-center">Product Details</h3>
          <h6>
            <b>Name : </b>
            {product.name}
          </h6>
          <p>
            <b>Description : </b>
            {product.description}
          </p>
          <h6>
            <b>Category : </b>
            {product?.category?.name}
          </h6>

          <h4>
            <b>Price : </b>$ {product.price}
          </h4>

          <button
            to={"/"}
            className="btn btn-xs btn-info ms-1"
            style={{ fontSize: "0.7rem" }}
          >
            Add to Card
          </button>
        </div>
      </div>
      <div className="row">
        {reletedProduct.length == 1 ? (
          <h3 className="text-center m-2">Similar Product</h3>
        ) : (
          <></>
        )}
        <hr />
        <div className="d-flex flex-wrap">
          {reletedProduct?.map((p) => (
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
                <button
                  to={"/"}
                  className="btn btn-xs btn-info ms-1"
                  style={{ fontSize: "0.7rem" }}
                >
                  add Card
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
