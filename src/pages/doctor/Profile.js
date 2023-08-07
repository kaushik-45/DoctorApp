// import React, { useEffect, useState } from "react";
// import Layout from "../../components/Layout";
// import { Col, Form, Input, Row, TimePicker, message } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { TailSpin } from "react-loader-spinner";

// import { showLoading, hideLoading } from "../../redux/features/alertSlice";
// import axios from "axios";
// import "../Doctor.css";
// import { useParams } from "react-router-dom";

// const Profile = () => {
//   const { user } = useSelector((state) => state.user);
//   const [doctor, setDoctor] = useState(null);
//   const params = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   //update doc
//   const { loading } = useSelector((state) => state.alerts);
//   const handleFinish = async (values) => {
//     dispatch(showLoading());
//     try {
//       dispatch(showLoading());
//       const res = await axios.post(
//         "/api/v1/doctor/updateProfile",
//         { ...values, userId: user._id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       if (res.data.success) {
//         message.success(res.data.message);
//         navigate("/");
//       } else {
//         message.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       message.error("Something Went Wrong");
//     }
//     dispatch(hideLoading());
//   };
//   //get Doc details
//   const getDoctorInfo = async () => {
//     try {
//       const res = await axios.post(
//         "/api/v1/doctor/getDoctorInfo",
//         { userId: params.id },
//         {
//           header: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         setDoctor(res.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getDoctorInfo();
//   }, []);

//   return (
//     <Layout>
//       <h1>Manage Profile</h1>
//       {doctor && (
//         <Form layout="vertical" onFinish={handleFinish} className="m-3" initialValues={doctor}>
//           <h6>Personal Deatils:</h6>
//           <Row gutter={20}>
//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="First Name"
//                 name="firstName"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="first name" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Last Name"
//                 name="lastName"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="last name" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Phone No"
//                 name="phone"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="phone" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Email"
//                 name="email"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="email" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Website"
//                 name="website "
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="website " />
//               </Form.Item>
//             </Col>
//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Address"
//                 name="address"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="address" />
//               </Form.Item>
//             </Col>
//           </Row>
//           <h6>Professional Deatils:</h6>
//           <Row gutter={20}>
//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Specialization"
//                 name="specialization"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="specialization" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Experience"
//                 name="experience"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="experience" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} md={24} lg={8}>
//               <Form.Item
//                 label="Fee"
//                 name="feesPerCunsaltation"
//                 required
//                 rules={[{ required: true }]}
//               >
//                 <Input type="text" placeholder="fee" />
//               </Form.Item>
//             </Col>
//             {/* <Col xs={24} md={24} lg={8}>
//               <Form.Item label="Timings" name="timings" required>
//                 <TimePicker.RangePicker format="HH:mm" />
//               </Form.Item>
//             </Col> */}
//             <Col xs={24} md={24} lg={8}>
//               <button className="btn btn-primary form-btn" type="submit">
//                 {loading ? <TailSpin height={25} color="white" /> : "Update"}
//               </button>
//             </Col>
//           </Row>
//         </Form>
//       )}
//     </Layout>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // update doc ==========
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
          // timings: [
          //   moment(values.timings[0]).format("HH:mm"),
          //   moment(values.timings[1]).format("HH:mm"),
          // ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  // update doc ==========

  //getDOc Details
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Manage Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...doctor,
            timings: [
              moment(doctor.timings[0], "HH:mm"),
              moment(doctor.timings[1], "HH:mm"),
            ],
          }}
        >
          <h4 className="">Personal Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your contact no" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="email"
                  placeholder="your email address"
                  required
                  rules={[{ required: true }]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Website"
                name="website"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your clinic address" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fees Per Cunsaltation"
                name="feesPerCunsaltation"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your contact no" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Timings" name="timings" required>
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
