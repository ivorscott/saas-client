import React, { useState, useEffect } from "react";
import { auth0Client } from "../services/Auth";
import client from "../services/ClientService";

const LoggedIn = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await client.get("/products");
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="container">
      <div className="jumbotron text-center mt-5">
        Logged In...
        <span
          className="btn btn-primary float-right"
          onClick={() => auth0Client.logout()}
        >
          Log out
        </span>
        <h1>We R VR</h1>
        <div className="row">
          {products &&
            products.map(function (product, index) {
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
