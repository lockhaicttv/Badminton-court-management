import { Route } from "react-router-dom";
import callApi from "../../Utils/apiCaller";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Banner from "./Banner-Logo";
import ProductCard from "./ProductCard";
import { Card, CardColumns, CardDeck, CardGroup } from "react-bootstrap";

const HomePage = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
   loadShopPage()
  }, []);
  const loadShopPage = () => {
    callApi(`product/on-shop-page`, "get", null)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          setProduct([]);
        });
  }

  const listProduct = product.map((item, key) => {
    return <ProductCard item={item} key={key} />;
  });

  return (
      <div className="container mt-2">
          <div className="row">
      {/*<CardColumns>*/}
          {listProduct}
      {/*</CardColumns>*/}
          </div>
    </div>
  );
};

export default HomePage;
