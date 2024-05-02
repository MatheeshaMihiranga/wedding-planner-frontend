import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  Checkbox,
  Grid,
  Icon,
  Message,
  MessageHeader,
  Progress,
} from "semantic-ui-react";
import { CSVLink } from "react-csv"; // Import CSVLink from react-csv

import { RootState } from "../../store/reducer";
import { useParams } from "react-router-dom";
import { useDispatchApp } from "../../store/Store";
import {
  deleteCheckListData,
  getCheckListData,
  updateCheckListData,
} from "../../store/action/supplier";
import { CustomButton, TabView } from "../../components";
import { UserDashboardData } from "../../config/constants";

import "./userCheckList.scss";
import ConfirmModal from "../../components/confirmViewModal/ConfirmModal";
import AddCheckList from "../../components/addCheckList/addCheckList";
import { LoadContentByMonth } from "./LoadContentByMonth";
import { LoadContentByCategory } from "./LoadContentByCategory";
import { LoadContentByStatus } from "./LoadContentByStatus";
import { getYearMonthDetails } from "../../utils/utils";

const UserCheckList = () => {
  const { id } = useParams();
  const dispatch = useDispatchApp();
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState<any>({});
  const [categoryType, setCategoryType] = useState<any>("Month");
  const [visibleAddCheckList, setVisibleAddCheckList] = useState(false);
  const { checkList } = useSelector((state: RootState) => state.supplier);
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

  useEffect(() => {
    if (id) {
      dispatch(getCheckListData(id));
    }
  }, [id]);

  const checkListDataFilterByCategory = () => {
    const filterByCategory = checkListData.reduce((result: any, data: any) => {
      const availableCategoryIndex = result.findIndex(
        (e: any) => e.categoryName == data.category
      );
      if (availableCategoryIndex > -1) {
        result[availableCategoryIndex].categoryData.push(data);
        return result;
      } else {
        let category = {
          categoryName: data.category,
          categoryData: [data],
        };
        return [...result, category];
      }
    }, []);

    return filterByCategory;
  };

  const checkListDataFilterByStatus = () => {
    const filterByCategory = checkListData.reduce((result: any, data: any) => {
      const getStatus = data.status ? "Complete" : "Not Complete";
      const availableCategoryIndex = result.findIndex(
        (e: any) => e.status == getStatus
      );
      if (availableCategoryIndex > -1) {
        result[availableCategoryIndex].categoryData.push(data);
        return result;
      } else {
        let category = {
          status: data.status ? "Complete" : "Not Complete",
          categoryData: [data],
        };
        return [...result, category];
      }
    }, []);
    return filterByCategory;
  };

  const checkListDataFilterByMonth = () => {
    const getYearMonthData = getYearMonthDetails(userDetails.eventDate);
    const getYearMonthLength = getYearMonthData.length;
    const includeForMonth = checkListCount / getYearMonthLength;

    const filterByCategory = getYearMonthData.map((data: any, index: any) => {
      const start =
        index == 0
          ? 0
          : index == 1
          ? index - 1 + includeForMonth
          : index * includeForMonth;
      const end =
        index == 0 ? 1 * includeForMonth : (index + 1) * includeForMonth;
      return {
        monthRange: data,
        categoryData: checkListData.slice(start, end),
      };
    });

    return filterByCategory;
  };

  const getCheckListDetails = useMemo(() => {
    switch (categoryType) {
      case "Month":
        return checkListDataFilterByMonth();
      case "Category":
        return checkListDataFilterByCategory();
      case "Status":
        return checkListDataFilterByStatus();
      default:
        break;
    }
  }, [categoryType, checkListData]);

  const loadContentAccordingToSort = () => {
    switch (categoryType) {
      case "Month":
        return (
          <LoadContentByMonth
            getCheckListDetails={getCheckListDetails}
            updateCheckListDetails={updateCheckListDetails}
            setVisibleDeleteModal={setVisibleDeleteModal}
            setDeleteData={setDeleteData}
          />
        );
      case "Category":
        return (
          <LoadContentByCategory
            getCheckListDetails={getCheckListDetails}
            updateCheckListDetails={updateCheckListDetails}
            setVisibleDeleteModal={setVisibleDeleteModal}
            setDeleteData={setDeleteData}
          />
        );
      case "Status":
        return (
          <LoadContentByStatus
            getCheckListDetails={getCheckListDetails}
            updateCheckListDetails={updateCheckListDetails}
            setVisibleDeleteModal={setVisibleDeleteModal}
            setDeleteData={setDeleteData}
          />
        );
      default:
        break;
    }
  };

  const updateCheckListDetails = (data: any, checkListDetails: any) => {
    const updateCheckListDetails = {
      id: id,
      parentId: userDetails.checkListId,
      checkListId: checkListDetails._id,
      data: {
        status: data.checked,
      },
    };
    dispatch(updateCheckListData(updateCheckListDetails));
  };

  const deleteCheckListDetails = (deleteData: any) => {
    const updateCheckListDetails = {
      id: id,
      parentId: userDetails.checkListId,
      checkListId: deleteData._id,
    };
    dispatch(deleteCheckListData(updateCheckListDetails));
  };

  // CSV data conversion
  const csvData = checkListData.map((data: any) => ({
    Category: data.category,
    Description: data.name,
    Status: data.status ? "Complete" : "Not Complete",
  }));

  return (
    <>
      <TabView loadData={UserDashboardData} id={userDetails?._id} />
      <Grid>
        <Grid.Column computer={16} className="paddingRemoveBottom">
          <h3 className="checklistCountView">{`You have completed ${checkListCountComplete} out of ${checkListCount}`}</h3>
          <Progress percent={getPercentage} progress />
        </Grid.Column>
        <Grid.Column computer={16} className="paddingRemoveBottom">
          <h3 className="checklistCountView">Sort By</h3>
        </Grid.Column>
        <Grid.Column className="viewCheckListSort">
          <CustomButton
            onClick={() => setCategoryType("Month")}
            theme={"blue"}
            title="Month"
          />
          <CustomButton
            onClick={() => setCategoryType("Category")}
            theme={"blue"}
            title="Category"
          />
          <CustomButton
            onClick={() => setCategoryType("Status")}
            theme={"blue"}
            title="Status"
          />
          <CSVLink data={csvData} filename={"checklist.csv"} className="ui button">
          Download 
         </CSVLink>
        </Grid.Column>
      </Grid>
      {loadContentAccordingToSort()}
      <Grid.Column computer={16}>
        <CustomButton
          onClick={() => setVisibleAddCheckList(true)}
          title="Add new checklist"
        />
      </Grid.Column>
      <ConfirmModal
        viewModal={visibleDeleteModal}
        closeModal={() => setVisibleDeleteModal(false)}
        cancel={() => {
          setVisibleDeleteModal(false);
          setDeleteData({});
        }}
        approve={() => {
          setVisibleDeleteModal(false);
          deleteCheckListDetails(deleteData);
        }}
        title="Delete check list data"
        subTitle="Are you sure you want to delete check list data?"
      />
      <AddCheckList
        title="Add CheckList"
        viewModal={visibleAddCheckList}
        cancel={() => setVisibleAddCheckList(false)}
        userId={id}
      />
    </>
  );
};

export default UserCheckList;

