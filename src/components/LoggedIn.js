import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";

const LoggedIn = () => {
  const [products, setProducts] = useState([]);

  const {
    getTokenSilently,
    loading,
    user,
    logout,
    isAuthenticated,
  } = useAuth0();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const token = await getTokenSilently();
        const response = await fetch("https://localhost:4000/v1/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();

        setProducts(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
  }, []);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="jumbotron text-center mt-5">
        {isAuthenticated && (
          <span
            className="btn btn-primary float-right"
            onClick={() => logout()}
          >
            Log out
          </span>
        )}
        <h1>We R VR</h1>
        <p>Hi, {user.name}! Below you'll find consoles for sale</p>
        <div className="row">
          {products.map(function (product, index) {
            return (
              <div className="col-sm-4" key={index}>
                <div className="card mb-4">
                  <div className="card-header">{product.name}</div>
                  <div className="card-body">{product.description}</div>
                  <div className="card-footer">{product.price}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
