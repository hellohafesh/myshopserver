import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);
  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success("Tost");
    // const data = { name, email, phone, address };
    // console.log(axios.isCancel("something"));

    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        phone,
        address,
      });

      if (data?.error) {
        toast.error(data?.error);
        // toast.success(data && data?.message);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        toast.success(data?.message);
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updeted Success");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title={"My Profile -"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-0 w-75">
              <div className="form_container">
                <form onSubmit={handleSubmit}>
                  <h1 className="title">User Profile</h1>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      id="exampleInputname"
                      placeholder="Enter Your Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      id="exampleInputemail"
                      placeholder="Enter Your Email"
                      disabled
                    />
                  </div>

                  {/* <div className="mb-3">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      id="exampleInputPassword"
                      placeholder="Enter Your Password"
                      
                    />
                  </div> */}
                  <div className="mb-3">
                    <input
                      type="mobile"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      id="exampleInputphone"
                      placeholder="Enter Your Phone"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      id="exampleInputaddress"
                      placeholder="Enter Your Address"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
