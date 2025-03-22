import React, { use, useEffect, useState } from "react";
import apis from "../utils/apis";
import httpAction from "../utils/httpAction";
import { Avatar, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import useGeneral from "../hooks/useGeneral";

const Profile = () => {
  const [user, setUser] = useState({});
  const { navigate } = useGeneral();

  useEffect(() => {
    const getUserInfo = async () => {
      const data = {
        url: apis().getUserProfile,
      };
      const result = await httpAction(data);
      if (result?.status) {
        setUser(result?.user);
      }
    };
    getUserInfo();
  }, []);

  const logoutHandler = async () => {
    const data = {
      url: apis().logout,
    };
    const result = await httpAction(data);
    if (result?.status) {
      navigate("/login");
    }
  };

  return (
    <div className="page_card">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="row g-3 text-center">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <Avatar
              variant="circular"
              sx={{ bgcolor: "orangered", textTransform: "capitalize" }}
            >
              {user?.name?.substring(0, 1)}
            </Avatar>
          </div>
          <div style={{ textTransform: "capitalize" }} className="col-12">
            {user?.name}
          </div>
          <div className="col-12">{user?.email}</div>
          <div className="col-12">
            <Button
              onClick={logoutHandler}
              endIcon={<Logout />}
              fullWidth
              variant="outlined"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
