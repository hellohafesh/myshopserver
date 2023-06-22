import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/Prices/Prices";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
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
  }, [checked?.length, radio?.length]);
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
  }, [page]);
  // get load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
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
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category </h4>
          <div className="d-flex flex-wrap">
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
          <div className="d-flex flex-wrap">
            <button
              className="btn btn-xs btn-warning mt-4 "
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products </h1>
          <div className="d-flex flex-wrap">
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
                  <Link
                    to={"/"}
                    className="btn btn-xs btn-primary ms-1"
                    style={{ fontSize: "0.7rem" }}
                  >
                    See Details
                  </Link>
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
          <div className="m-2 p-3 ">
            {products && products.length < total && (
              <button
                className="btn btn-xs btn-info"
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
