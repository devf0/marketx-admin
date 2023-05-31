import "./ListProducts.scss"
import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { productColumns } from "../../datatablesource";
import useHttpClient from '../../hooks/useHttpClient';

const ListProducts = () => {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const { sendReq } = useHttpClient();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        var url = `${process.env.REACT_APP_BASE_API_URL}/products`;
        const responseData = await sendReq(
          url
        );
        setLoadedProducts(responseData);
      } catch (err) {}
    };
    fetchProducts();
  }, [sendReq]);

  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        {loadedProducts.length > 0 ? (
          <Datatable collumns={productColumns} rows={loadedProducts} newTitle={"Products"} newUrl={"/products/new"}/>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
)
}

export default ListProducts
