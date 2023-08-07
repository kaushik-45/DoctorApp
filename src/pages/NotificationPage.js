import React from "react";
import Layout from "../components/Layout";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleMarkAllRead = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload(); 
      } else {
        message.error(res.data.message);
      
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  const handleDeleteAllRead = async() => {
    try {
           
      const res = await axios.post("/api/v1/user//delete-all-notification",{userId:user._id},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
     
      if(res.data.success)
      {
        message.success(res.data.message)
        window.location.reload();
      }
      else{
        message.error(res.data.message);
      }

    } catch (error) {
      console.log(error);
      message.error("something went wrong");
      
    }
  };
  return (
    <Layout>
      <h4 className="p-3 text-center">NotificationPage</h4>
      <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
          <div
            className="d-flex justify-content-end"
            style={{ cursor: "pointer" }}
            onClick={handleMarkAllRead}
          >
            <h4 className="p-2 text-primary">Mark All Read</h4>
          </div>
          {user?.notification.map((notificationMgs) => (
            <div className="card m-2" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end" style={{cursor:"pointer"}}>
            <h4 className="p-2 text-primary" onClick={handleDeleteAllRead}>
              Delete All Read
            </h4>
          </div>
          {user?.seennotification.map((notificationMgs) => (
            <div className="card m-2" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
