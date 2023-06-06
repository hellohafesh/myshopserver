import React from "react";

const Profile = () => {
  return (
    <Layout title={"My Profile -"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-3 w-75">
              <h1>My Profile </h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
