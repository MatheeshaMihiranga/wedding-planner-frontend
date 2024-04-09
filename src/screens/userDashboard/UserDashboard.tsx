import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatchApp } from "../../store/Store";
import { getUserDetails } from "../../store/action/auth";

const UserDashBoard = () => {
  const { id } = useParams();
  const dispatch = useDispatchApp()

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails());
    }
  }, [id]);

  return <></>;
};

export default UserDashBoard;
