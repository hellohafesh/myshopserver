import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  // handle foem
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created as a category`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong Create Category");
    }
  };
  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
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
  return (
    <Layout title={"Add Category -"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-3 w-75">
              <h1>Mannage Category</h1>
              <div className="p-3 e-50 m-4">
                <div className="card p-4">
                  <CategoryForm
                    handleSubmit={handleSubmit}
                    value={name}
                    setValue={setName}
                  />
                </div>
              </div>
              <div className="w-75">
                <table className="table">
                  <thead>
                    <tr>
                      <td scope="row">Name</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((category) => (
                      <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>
                          <button className="btn btn-primary m-2">Edit</button>
                          <button className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
