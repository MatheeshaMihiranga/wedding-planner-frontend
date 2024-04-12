import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatchApp } from "../../store/Store";
import { getUserDetails } from "../../store/action/auth";
import { Grid } from "semantic-ui-react";
import { UserDashboardData } from "../../config/constants";
import { TabView } from "../../components";

const UserDashBoard = () => {
  const { id } = useParams();
  const dispatch = useDispatchApp();

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails());
    }
  }, [id]);

  return (
    <>
     <TabView loadData={UserDashboardData}/>
    </>
  );
};

export default UserDashBoard;