import "./NewProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewProduct = ({inputs, title}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const postSubmitHandle2 = async () => {
    const productData = new FormData();
    productData.append("image", file);
    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("price", formData.price);
    productData.append("stock", formData.stock);
    productData.append("category", formData.category);
  
    const res = await fetch(`${process.env.REACT_APP_BASE_API_URL}/products`, {
      method: "POST",
      body: productData,
    });
    const data = await res.json();
    console.log(data);
    if (res.ok || res.status === 201) {
      console.log("Product created successfully");
    } else {
      console.log("Failed to create product");
    }
  };

  const postSubmitHandle = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("image", file);
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("stock", formData.stock);
      productData.append("category", formData.category);
    
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/products`,
        productData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            console.log(`Upload progress: ${progress}%`);
          }
        }
      )
      .then(res => {
          console.log(`Success` + res.data);
          navigate("/products");
      })
      .catch(err => {
          console.log(err);
          alert(err);
      })
    } finally {
      setLoading(false);
    }
  
    // try {
    //   const response = axios.post(`${process.env.REACT_APP_BASE_API_URL}/products`, productData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });
  
    //   if (response.status === 201) {
    //     console.log("Product created successfully");
    //     setFormData({
    //       name: "",
    //       category: "",
    //       description: "",
    //       price: "",
    //       stock: ""
    //     });
    //   } else {
    //     console.log("Failed to create product");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };  

  return (
    <div className="new">
      <Sidebar/>
  
    <div className="newContainer">
      <Navbar/>
      <div className="top">
        <h1>{title}</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img 
          src={file ? URL.createObjectURL(file) : "https://www.icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
        </div>
        <div className="right">
          <form>
          <div className="formInput">
              <label htmlFor="file"> 
               Image : <DriveFolderUploadOutlined className="icon"/>
              </label>
              <input
               type="file" 
               id="file" 
               onChange={handleFileChange} //  onChange={e=>setFile(e.target.files[0])}
                />
            </div>
            {inputs.map((input) => (
            <div className="formInput" key={input.id}>
              <label>{input.label}</label>
              <input 
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                value={formData[input.name] || ''}
                onChange={handleInputChange}/>
            </div>
            ))}
            <Button variant="primary" onClick={postSubmitHandle} disabled={loading}>
              {loading ? (
                <Spinner animation="border" variant="light" size="sm" />
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </div>
      </div>
      </div>
      </div>
  )
}

export default NewProduct