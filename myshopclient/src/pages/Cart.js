import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  //   total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
      });
    } catch (e) {
      console.log(e);
    }
  };
  //   total vat
  const totalVatPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      if (total > 500) {
        const vat = total * 0.15;
        total += vat;
      }

      return total.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
      });
    } catch (e) {
      console.log(e);
    }
  };
  //   remove Cart Item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (e) {
      console.log(e);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/braintree/token");
      setClientToken(data?.clientToken);
    } catch (e) {
      console.log(e);
    }
  };

  // handlePayment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/products/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);
  return (
    <Layout title={"Cart -"}>
      <div className="container mt-3">
        <h6 className="text-center">Your Cart</h6>
        <div className="row">
          <div className="col-md-12">
            <h6 className="text-center bg-light p-2 mb-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h6>
            <h6 className="text-center  p-2">
              {cart?.length >= 1
                ? `You Have ${cart?.length} Item in Your Cart ${
                    auth?.token ? "" : ".Plaese Login To Checkout "
                  }`
                : "Your Cart Is Empty"}
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <div className="row">
              {cart?.map((p) => (
                <div className="row mb-2 p-3 card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      height={"140px"}
                      width={"80px"}
                      src={`/api/v1/products/product-photo/${p._id}`}
                      className="card-img-top image-fluid"
                      alt={p.name}
                    />
                  </div>

                  <div className="col-md-8">
                    <p>
                      <b style={{ fontSize: "0.7rem" }}>{p.name}</b>
                    </p>
                    <p style={{ fontSize: "0.7rem" }}>
                      {p.description.substring(0, 40)}...
                    </p>
                    <p style={{ fontSize: "0.7rem" }}>${p.price}</p>
                    <button
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="btn btn-xs btn-primary  mb-2"
                      style={{
                        fontSize: "0.7rem",
                      }}
                    >
                      See Details
                    </button>
                    <button
                      onClick={() => removeCartItem(p._id)}
                      className="btn btn-xs btn-danger ms-2 mb-2"
                      style={{
                        fontSize: "0.7rem",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-5 text-center">
            <h6>Cart Sumary</h6>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total Price : {totalPrice()}</h4>

            <h4>With Vat Total Price : {totalVatPrice()}</h4>

            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}

            <div className="mt-2">
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary mb-3"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
