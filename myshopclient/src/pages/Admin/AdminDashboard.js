import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../Context/AuthContext";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Admin Dashboard - "}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-3 w-75">
              <h3 className="text-center"> Admin Name : {auth?.user?.name}</h3>
              <hr />
              <h5 className=""> Admin Email : {auth?.user?.email}</h5>
              <h5 className=""> Admin Number : {auth?.user?.phone}</h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
