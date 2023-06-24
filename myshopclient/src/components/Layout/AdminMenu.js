import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <NavLink
            to="/dashboard/admin"
            className=""
            style={{ textDecoration: "none" }}
          >
            <h4>Admin Panel</h4>
          </NavLink>

          <NavLink
            to="/dashboard/admin/profile"
            className="list-group-item list-group-item-action"
          >
            Admin Profile
          </NavLink>
          <NavLink
            to="/dashboard/admin/cerate-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/cerate-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            All Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
