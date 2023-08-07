import React from "react";
import { useState, useEffect } from "react";
import "./Register.css";
import axios from "axios";
import swal from "sweetalert";
import { TailSpin } from 'react-loader-spinner';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading,setLoading] =useState(false);
  const [error, setError] = useState("");
  const handleClick = async () => {
    setLoading(true);
    try{
    
      const res = await axios.post('/api/v1/user/register', form);  
      swal({
        title: res.data.message,
        icon: "success",
        buttons: false,
        timer: 3000
    })
    setForm({
        name: "",
        email: "",
        password: ""
        
    })
    
    navigate('/login');
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
    setLoading(false);
  };

  return (
    <>
      <div className="form-container">
        <div className="register-form">
          <Card variant="outlined">
            <CardContent>
              <Typography
                sx={{ textAlign: "center", color: "black" ,marginBottom:"20px"}}
                variant="h4"
              >
                Register Form
              </Typography>

              <TextField
                label="Username"
                variant="outlined"
                required
                fullWidth="true"
                name="name"
                value= {form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
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
                {loading ? <TailSpin height={25} color="white" /> : 'Register'}
              </Button>
            </CardActions>
          </Card>
          <Card variant="outlined" sx={{ height: "40px", marginTop: "4px"}}>
            <CardContent>
              <Typography
                sx={{ textAlign: "center", color: "grey" }}
                variant="subtitle2"
              >
                Having an account?<Link to={"/login"}> Login</Link>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;

// import React from "react";
// import "./Register.css";
// import { Form, Input, message } from "antd";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// const Register = () => {
//   const navigate = useNavigate();

//   //form handler
//   const onfinishHandler = async (values) => {
//     try {
//       const res = await axios.post("/api/v1/user/register", values);
//       if (res.data.success) {
//         message.success("Register Successfully!");
//         navigate("/login");
//       } else {
//         message.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       message.error("Something Went Wrong");
//     }
//   };
//   return (
//     <>
//       <div className="form-container ">
//         <Form
//           layout="vertical"
//           onFinish={onfinishHandler}
//           className="register-form"
//         >
//           <h3 className="text-center">Register From</h3>
//           <Form.Item label="Name" name="name">
//             <Input type="text" required />
//           </Form.Item>
//           <Form.Item label="Email" name="email">
//             <Input type="email" required />
//           </Form.Item>
//           <Form.Item label="Password" name="password">
//             <Input type="password" required />
//           </Form.Item>
//           <Link to="/login" className="m-2">
//             Already user login here
//           </Link>
//           <button className="btn btn-primary" type="submit">
//             Register
//           </button>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default Register;
