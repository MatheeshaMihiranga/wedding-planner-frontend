import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatchApp } from "../../store/Store";
import { getUserDetails } from "../../store/action/auth";
import { Grid, Icon, Progress } from "semantic-ui-react";
import { UserDashboardData } from "../../config/constants";
import { CustomButton, ImageView, TabView, TitleView } from "../../components";

import "./userDashboard.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import {
  getCheckListData,
  getUserBudget,
  getUserGuest,
} from "../../store/action/supplier";
import { isEmpty } from "lodash";

const UserDashBoard = () => {
  const { id } = useParams();
  const dispatch = useDispatchApp();
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const { budgetData, guestData, checkList } = useSelector(
    (state: RootState) => state.supplier
  );
  const TableData = guestData?.tables || [];
  const categoryData = budgetData?.category || [];
  const navigate = useNavigate();

  const checkListData = checkList?.checkListData || [];
  const checkListCount = checkListData.length;
  const checkListCountComplete = checkListData.reduce(
    (result: any, data: any) => {
      if (data.status) {
        return (result += 1);
      }
      return result;
    },
    0
  );
  const getPercentage = Number(
    (checkListCountComplete / checkListCount) * 100
  ).toFixed(0);

  const getTotalCost = (expenseData: any) => {
    const getTotalCost = expenseData.reduce((result: any, data: any) => {
      return (result += data.cost);
    }, 0);
    return getTotalCost ? getTotalCost : 0;
  };

  const getTotalCostAllCategory = () => {
    const getTotalCostData = categoryData.reduce((result: any, data: any) => {
      return (result += getTotalCost(data.expenses));
    }, 0);
    return getTotalCostData ? getTotalCostData : 0;
  };

  const getTotalAttendingCount = (status: any) => {
    const getTotalCostData = TableData.reduce((result: any, data: any) => {
      return (result += getAttendingCount(data.guest, status));
    }, 0);
    return getTotalCostData ? getTotalCostData : 0;
  };

  const getAttendingCount = (guestData: any, status: any) => {
    const countStatus = guestData.reduce((result: any, data: any) => {
      return (result += data.status == status ? 1 : 0);
    }, 0);
    return countStatus;
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails());
      dispatch(getUserBudget(id));
      dispatch(getUserGuest(id));
      dispatch(getCheckListData(id));
    }
  }, [id]);

  return (
    <>
      <TabView loadData={UserDashboardData} id={userDetails?._id} />
      <Grid className="userDashboardMain">
        <Grid.Column
          computer={8}
          tablet={16}
          mobile={16}
          className="userSummeryDetails"
        >
          <TitleView title="User Details" />
          {!isEmpty(userDetails?.imageUrl) ? (
            <Grid.Column computer={16}>
              <ImageView
                src={userDetails?.imageUrl}
                customImageView={"customUserImage"}
              />
            </Grid.Column>
          ) : null}

          <div className="viewUserDetailsContent">
            <Icon size="big" name="female" />
            <p>{userDetails?.bride || "Please update your bride Name"}</p>
          </div>

          <div className="viewUserDetailsContent">
            <Icon size="big" name="male" />
            <p>{userDetails?.groom || "Please update your groom Name"}</p>
          </div>

          <div className="viewUserDetailsContent">
            <Icon size="big" name="calendar" />
            <p>{userDetails?.eventDate || "Please update your groom Name"}</p>
          </div>

          <CustomButton
            title="Update Account Setting"
            onClick={() => navigate(`/user/user-setting/${id}`)}
          />
        </Grid.Column>
        <Grid.Column computer={1} tablet={16} mobile={16}></Grid.Column>
        <Grid.Column computer={7} tablet={16} mobile={16}>
          <Grid className="userDashboardRightMain">
            <Grid.Column computer={16} tablet={16} mobile={16}>
              <TitleView title="Budget Summery" />
              <div className="viewUserDetailsContent">
                <p>
                  {"Total cost : "}
                  {getTotalCostAllCategory()}
                </p>
              </div>

              <div className="viewUserDetailsContent">
                <p>
                  {"Remaining : "}
                  {userDetails.budget - getTotalCostAllCategory()}
                </p>
              </div>
              <CustomButton
                title="Go to Budget Tracker"
                onClick={() => navigate(`/user/my-budget/${id}`)}
              />
            </Grid.Column>
          </Grid>
          <Grid className="userDashboardRightMain">
            <Grid.Column computer={16} tablet={16} mobile={16}>
              <TitleView title="Guest Summery" />
              <div className="viewUserDetailsContent">
                <p>
                  {"Guests attending : "}
                  {getTotalAttendingCount("Attending")}
                </p>
              </div>

              <div className="viewUserDetailsContent">
                <p>
                  {"Guests awaiting : "}
                  {getTotalAttendingCount("Awaiting")}
                </p>
              </div>

              <div className="viewUserDetailsContent">
                <p>
                  {"Guests declined : "}
                  {getTotalAttendingCount("Declined")}
                </p>
              </div>
              <CustomButton
                title="Go to Guest List"
                onClick={() => navigate(`/user/my-guest/${id}`)}
              />
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
      <Grid className="userDashboardMain">
        <Grid.Column computer={16} tablet={16} mobile={16}>
          <TitleView title="Your Checklist " />
          <h3 className="checklistCountView">{`You have completed ${checkListCountComplete} out of ${checkListCount}`}</h3>
          <Progress percent={getPercentage} progress />
          <CustomButton
            title="Go to Checklist"
            onClick={() => navigate(`/user/my-checkList/${id}`)}
          />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default UserDashBoard;
