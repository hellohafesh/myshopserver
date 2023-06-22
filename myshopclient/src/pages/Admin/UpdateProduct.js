import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;
const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  // get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      setName(data?.product.name);
      setId(data?.product._id);
      setDescription(data?.product.description);
      setPrice(data?.product.price);
      setPhoto(data?.product.photo);
      setCategory(data?.product.category._id);
      setQuantity(data?.product.quantity);
      setShipping(data?.product.shipping);

      //   if (data?.success) {
      //     setCategories(data.category);
      //   }
    } catch (e) {
      console.log(e);
      toast.error("Error In get Single Product");
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (e) {
      console.log(e);
      toast.error("Error In get all category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  // update product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      const { data } = await axios.put(
        `/api/v1/products/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Update Success");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Error In Product Update");
    }
  };

  //   delete product
  const handledelete = async () => {
    try {
      let answer = window.prompt("Are You Want To Delete This Product ?");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/products/delete-product/${id}`
      );
      navigate("/dashboard/admin/products");
      toast.success("A product  is deleted .");
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong delete a product");
    }
  };
  return (
    <Layout title={"Update Product - "}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-3 w-75">
              <h1>Update Product </h1>
              <div className="m-1">
                <Select
                  bordered={false}
                  placeholder="Select A Category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Product Photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`/api/v1/products/product-photo/${id}`}
                        alt="Product Photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Product Name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Product Description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="Product Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Product Quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    value={shipping ? "yes" : "no"}
                    bordered="false"
                    placeholder="Select Shiping"
                    size="large"
                    className="form-control"
                    onChange={(value) => setShipping(value)}
                    showSearch
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-primary m-2"
                    onClick={handleUpdateProduct}
                  >
                    Update Product
                  </button>
                  <button className="btn btn-danger m-2" onClick={handledelete}>
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
