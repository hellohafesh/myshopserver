import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  // handle form
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

  // handle update form
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(e);
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        {
          name: updatedName,
        }
      );
      if (data?.success) {
        toast.success(`${name} as ${updatedName} is Update for a category`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong Update Category");
    }
  };
  // handle delete category
  const handledelete = async (pid) => {
    try {
      let answer = window.prompt("Are You Want To Delete This Category ?");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pid}`
      );
      if (data?.success) {
        toast.success(`A category  is deleted .`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong delete a Category");
    }
  };
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
                          <button
                            className="btn btn-primary m-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(category.name);
                              setSelected(category);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handledelete(category._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}
              >
                <h1>Modal</h1>
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
