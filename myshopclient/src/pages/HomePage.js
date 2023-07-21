import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/Prices/Prices";
import { useCart } from "../Context/CartContext";
import "./Style/Homepage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useCart();
  const [perPage, setPerPage] = useState(8);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(perPage);
  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  // filter by price
  const handleRadio = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //   Get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/products/product-list/${page}/${perPage}`
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast.error("Error In get all product");
    }
  };

  useEffect(() => {
    if (!checked?.length || !radio?.length) getAllProducts();
  }, [checked?.length, radio?.length, perPage]);
  useEffect(() => {
    if (checked?.length || radio?.length) filterProducts();
  }, [checked, radio]);

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/product-count");

      setTotal(data?.total);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page, perPage]);
  // get load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/products/product-list/${page}/${perPage}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
      // setTotal(data?.total);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  // get all filter Products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(`/api/v1/products/product-filters`, {
        checked,
        radio,
      });

      setProducts(data?.products);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout title={"Home - "}>
      <img
        src="/Images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category </h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-center mt-4">Filter By Price </h4>
          <div className="d-flex flex-wrap">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-xs btn-danger mt-4 "
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products </h1>
          <div className="d-flex justify-content-between p-3">
            <p>Change Here As You Want </p>
            <select
              className="form-select"
              style={{ width: "20%" }}
              aria-label="Default select example"
              onChange={(e) => setPerPage(e.target.value)}
            >
              <option selected>Product Per Page</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
              <option value={32}>32</option>
            </select>
          </div>
          {/* <div className="d-flex flex-wrap">
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
                  <div className="card-name-price"></div>
                  <h6 className="card-title" style={{ fontSize: ".8rem" }}>
                    {`${p.name.substring(0, 70)}...`}
                  </h6>
                  <p
                    className="card-text card-price"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {`${p.description.substring(0, 140)}.....`}
                  </p>
                  <p className="card-text" style={{ fontSize: "0.7rem" }}>
                    {`$ ${p.price}`}
                  </p>
                  <button
                    onClick={() => navigate(`/product/${p.slug}`)}
                    className="btn btn-xs btn-primary ms-1"
                    style={{ fontSize: "0.7rem" }}
                  >
                    See Details
                  </button>
                  <button
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success(`Item - ${p.name} add to Cart`);
                    }}
                    className="btn btn-xs btn-info ms-1"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Add Card
                  </button>
                </div>
              </div>
            ))}
          </div> */}
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body d-flex flex-column">
                  <div className="card-name-price">
                    <p className="card-title">{p.name.substring(0, 20)}</p>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 50)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1 "
                      onClick={() => navigate(`/products/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1 "
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="m-2 p-3 ">
            {products && products.length < total && (
              <button
                className="btn btn-xs loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading.." : "Load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
