import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Message, MessageHeader, Table , Input} from "semantic-ui-react";
import { CSVLink } from "react-csv"; // Import CSVLink from react-csv

import { RootState } from "../../store/reducer";
import { useParams } from "react-router-dom";
import { useDispatchApp } from "../../store/Store";
import {
  deleteCategoryExpenses,
  getUserBudget,
} from "../../store/action/supplier";
import { CommonTable, CustomButton, TabView } from "../../components";
import { BudgetDataView, UserDashboardData } from "../../config/constants";

import "./budget.scss";
import AddExpenses from "../../components/addExpenses/AddExpenses";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import ConfirmModal from "../../components/confirmViewModal/ConfirmModal";
import AddCategory from "../../components/addCategory/AddCategory";

const Budget = () => {
  const { id } = useParams();
  const dispatch = useDispatchApp();
  const [viewExpensesModal, setViewExpensesModal] = useState(false);
  const [currentExpenses, setCurrentExpense] = useState<any>({});
  const [categoryId, setCategoryId] = useState(null);
  const [deleteData, setDeleteData] = useState({});
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [visibleNewCategory, setVisibleNewCategory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategoryData, setFilteredCategoryData] = useState([]);

  const { userDetails } = useSelector((state: RootState) => state.auth);
  const { mySupplier, budgetData } = useSelector(
    (state: RootState) => state.supplier
  );
  const categoryData = budgetData?.category || [];

  useEffect(() => {
    if (id) {
      dispatch(getUserBudget(id));
    }
  }, [id]);

  const deleteExpensesData = (data: any) => {
    const deleteCategoryExpensesData = {
      id: id,
      budgetId: userDetails.budgetId,
      expensesId: data?._id,
      data: data,
    };
    dispatch(deleteCategoryExpenses(deleteCategoryExpensesData));
  };

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

  const loadTableData = (details: any, categoryId: any) => {
    const filteredData = details.filter((data: any) =>
      data.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredData.map((data: any) => {
      return (
        <Table.Row className="tbleR">
          <Table.Cell>
            <p>{data?.description ?? ""}</p>
          </Table.Cell>
          <>
            <Table.Cell>
              <p>{data?.cost ?? ""}</p>
            </Table.Cell>
          </>
          <Table.Cell>
            <p>{data?.notes ?? ""}</p>
          </Table.Cell>

          <Table.Cell>
            <Grid>
              <Grid.Column computer={8} tablet={16} mobile={16}>
                <MdModeEditOutline
                  cursor={"pointer"}
                  size={24}
                  color="var(--mainColor)"
                  onClick={() => {
                    setCurrentExpense(data);
                    setCategoryId(categoryId);
                    setViewExpensesModal(true);
                  }}
                />
              </Grid.Column>
              <Grid.Column computer={8} tablet={16} mobile={16}>
                <MdDeleteOutline
                  cursor={"pointer"}
                  size={24}
                  color="var(--mainColor)"
                  onClick={() => {
                    setDeleteData(data);
                    setVisibleDeleteModal(true);
                  }}
                />
              </Grid.Column>
            </Grid>
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  const csvData = filteredCategoryData.flatMap((category: any) => {
    return category.expenses.map((expense: any) => ({
      Category: category.categoryName,
      Description: expense.description,
      Cost: expense.cost,
      Notes: expense.notes,
    }));
  });

  useEffect(() => {
    if (searchQuery) {
      const filteredData = categoryData.filter((category: any) =>
        category.expenses.some((expense: any) =>
          expense.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredCategoryData(filteredData);
    } else {
      setFilteredCategoryData(categoryData);
    }
  }, [searchQuery, categoryData]);

  return (
    <>
      <TabView loadData={UserDashboardData} id={userDetails?._id} />
      <Grid className="budgetDataViewMainTop">
        <Grid.Column computer={16}>
          <h2 className="budgetTracker">Budget Tracker</h2>
        </Grid.Column>
        <Grid.Column computer={16}>
          <Grid>
            <Grid.Column computer={3}>
              <h3 className="budgetTracker">Budget</h3>
              <h3 className="budgetTracker">{userDetails.budget}</h3>
            </Grid.Column>
            <Grid.Column computer={3}>
              <h3 className="budgetTracker">Total cost</h3>
              <h3 className="budgetTracker">{getTotalCostAllCategory()}</h3>
            </Grid.Column>
            <Grid.Column computer={3}>
              <h3 className="budgetTracker">Total remaining</h3>
              <h3 className="budgetTracker">
                {userDetails.budget - getTotalCostAllCategory()}
              </h3>
            </Grid.Column>
            <Grid.Column computer={16}>
              <CSVLink
                data={csvData}
                filename={"budget_data.csv"}
                className="ui button"
              >
                Download Expences Data as CSV
              </CSVLink>
            </Grid.Column>
            <Grid.Column computer={4}>
             
              <Input
                icon="search"
                placeholder="Search Description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                
              />    
            </Grid.Column>

          </Grid>
        </Grid.Column>
      </Grid>
      <Grid className="budgetDataViewMain">
        {filteredCategoryData?.length > 0 ? (
          filteredCategoryData.map((data: any, index: any) => {
            return (
              <>
                <Grid.Column computer={1} />
                <Grid.Column
                  key={index}
                  computer={6}
                  tablet={16}
                  mobile={16}
                  className="budgetDataView"
                >
                  <Grid>
                    <Grid.Column
                      key={index}
                      computer={16}
                      tablet={16}
                      mobile={16}
                      className="budgetDataSubView"
                    >
                      <Message>
                        <Grid>
                          <Grid.Column computer={8}>
                            <MessageHeader>{data?.categoryName}</MessageHeader>
                          </Grid.Column>
                          <Grid.Column computer={8} className="costViewMain">
                            <MessageHeader>
                              {getTotalCost(data?.expenses)}
                            </MessageHeader>
                          </Grid.Column>
                        </Grid>
                      </Message>
                    </Grid.Column>
                    <Grid.Column
                      key={index}
                      computer={16}
                      tablet={16}
                      mobile={16}
                      className="budgetDataSubView"
                    >
                      {data?.expenses?.length > 0 ? (
                        <CommonTable tableHeaderData={BudgetDataView}>
                          {loadTableData(data.expenses, data._id)}
                        </CommonTable>
                      ) : (
                        <p>Not Available {data?.categoryName} Expenses </p>
                      )}
                    </Grid.Column>
                    <Grid.Column
                      key={index}
                      computer={16}
                      tablet={16}
                      mobile={16}
                      className="budgetDataSubView"
                    >
                      <CustomButton
                        theme="blue"
                        title="Add Expenses"
                        onClick={() => {
                          setViewExpensesModal(true);
                          setCategoryId(data._id);
                        }}
                      />
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column computer={1} />
              </>
            );
          })
        ) : (
          <Grid.Column computer={16}>
            <Message>
              <MessageHeader>No Expenses Found</MessageHeader>
            </Message>
          </Grid.Column>
        )}
        <Grid.Column computer={1} />
        <Grid.Column
          computer={6}
          tablet={16}
          mobile={16}
          className="addNewBudgetMain"
        >
          <Grid.Column computer={16} tablet={16} mobile={16}>
            <Message>
              <MessageHeader>Add New Category</MessageHeader>
            </Message>
          </Grid.Column>
          <Grid.Column computer={16} tablet={16} mobile={16}>
            <CustomButton
              customButtonStyle="addNewCategoryButton"
              title="Add New Category"
              onClick={() => setVisibleNewCategory(true)}
            />
          </Grid.Column>
        </Grid.Column>
        <Grid.Column computer={2} />
      </Grid>

      <AddExpenses
        title="Add Expenses"
        viewModal={viewExpensesModal}
        cancel={() => {
          setViewExpensesModal(false);
          setCategoryId(null);
          setCurrentExpense({});
        }}
        currentExpenses={currentExpenses}
        categoryId={categoryId}
        id={id}
      />

      <ConfirmModal
        viewModal={visibleDeleteModal}
        closeModal={() => setVisibleDeleteModal(false)}
        cancel={() => {
          setVisibleDeleteModal(false);
          setDeleteData({});
        }}
        approve={() => {
          setVisibleDeleteModal(false);
          deleteExpensesData(deleteData);
        }}
        title="Delete category expenses"
        subTitle="Are you sure you want to delete category expenses?"
      />
      <AddCategory
        title="Add Category"
        viewModal={visibleNewCategory}
        cancel={() => {
          setVisibleNewCategory(false);
        }}
        id={id}
      />
    </>
  );
};

export default Budget;
