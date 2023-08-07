
import React from "react";
import { useState } from "react";
import "./Register.css";
import axios from "axios";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { showLoading , hideLoading } from "../redux/features/alertSlice";
import { TailSpin } from 'react-loader-spinner';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
  const Login = () => {
  const {loading} = useSelector(state=>state.alerts);  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // const [loading,setLoading] =useState(false);
  const handleClick = async () => {
   // setLoading(true);
   dispatch(showLoading())
    try{
    
      const res = await axios.post('/api/v1/user/login', form);  
      window.location.reload();
      if(res.data.success){
        localStorage.setItem("token",res.data.token)
        swal({
          title: res.data.message,
          icon: "success",
          buttons: false,
          timer: 3000
      })  
      setForm({
        email: "",
        password: ""
      
    })
    
       
      navigate('/');

        
      }
      else{

        swal({
          title: res.data.message,
          icon: "error",
          buttons: false,
          timer: 3000
      })
      } 
    
  
    }
    catch(err)
    {
      swal({
        title: err.message,
        icon: "error",
        buttons: false,
        timer: 3000
    })
     
    }
    dispatch(hideLoading())
    //setLoading(false);
  };

  return (
    <>
      <div className="form-container">
        <div className="register-form">
          <Card variant="outlined" >
            <CardContent>
              <Typography
                sx={{ textAlign: "center", color: "black" ,marginBottom:"20px"}}
                variant="h4"
              >
                Login Form
              </Typography>

              
              <TextField
                label="Email"
                variant="outlined"
                required
                type="email"
                sx={{ mt: 3, mb: 3 }}
                fullWidth="true"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <TextField
                label="Password"
                variant="outlined"
                required
                type="password"
                fullWidth="true"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth="true"
                sx={{ marginTop: "7px", marginBottom: " 17px" }}
                size="small"
                onClick={handleClick}
              >
                {loading ? <TailSpin height={25} color="white" /> : 'Login'}
              </Button>
            </CardActions>
          </Card>
          <Card variant="outlined" sx={{ height: "40px", marginTop: "4px"  }}>
            <CardContent>
              <Typography
                sx={{ textAlign: "center", color: "grey" }}
                variant="subtitle2"
              >
                Not Having an account?<Link to={"/register"}> Register</Link>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;

