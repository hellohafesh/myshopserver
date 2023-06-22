import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //   Get All Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/get-product");
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (e) {
      console.log(e);
      toast.error("Error In get all product");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Products -"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-3 ">
              <h1 className="text-center">All Products </h1>
              <div className="d-flex">
                {products.map((p) => (
                  <Link
                    to={`/dashboard/admin/products/${p.slug}`}
                    key={p._id}
                    className="product-link"
                  >
                    <div
                      className="card m-3"
                      style={{ width: "18rem", height: "410px" }}
                    >
                      <img
                        height={"250px"}
                        src={`/api/v1/products/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          {`${p.name.substring(0, 20)}...`}
                        </h5>
                        <p className="card-text">
                          {`${p.description.substring(0, 105)}.....`}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
