import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Icon, Message, MessageHeader, Table,Input } from "semantic-ui-react";
import { CSVLink } from "react-csv";

import { RootState } from "../../store/reducer";
import { useParams } from "react-router-dom";
import { useDispatchApp } from "../../store/Store";
import {
  deleteTableData,
  deleteTableGuest,
  getUserGuest,
} from "../../store/action/supplier";
import { CommonTable, CustomButton, TabView } from "../../components";
import {
  BudgetDataView,
  GuestDataView,
  UserDashboardData,
} from "../../config/constants";

import "./guest.scss";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import ConfirmModal from "../../components/confirmViewModal/ConfirmModal";
import AddTable from "../../components/addTable/AddTable";
import AddGuest from "../../components/addGuest/AddGuest";
import EditTableData from "../../components/editTableData/EditTableData";

const Guest = () => {
  const { id } = useParams();
  const dispatch = useDispatchApp();
  const [viewExpensesModal, setViewExpensesModal] = useState(false);
  const [currentGuest, setCurrentGuest] = useState<any>({});
  const [tableId, setTableId] = useState(null);
  const [deleteData, setDeleteData] = useState({});
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [visibleNewCategory, setVisibleNewCategory] = useState(false);
  const [visibleEditTable, setVisibleEditTable] = useState(false);
  const [currentTable, setCurrentTable] = useState({});
  const [deleteType, setDeleteType] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGuestData, setFilteredGuestData] = useState([]);

  const { userDetails } = useSelector((state: RootState) => state.auth);
  const { guestData } = useSelector((state: RootState) => state.supplier);
  const TableData = guestData?.tables || [];

  useEffect(() => {
    if (id) {
      dispatch(getUserGuest(id));
    }
  }, [id]);

  const deleteGuestData = (data: any) => {
    if (deleteType == "guest") {
      const deleteGuestData = {
        id: id,
        guestId: userDetails.guestId,
        guestDataId: data?._id,
      };
      dispatch(deleteTableGuest(deleteGuestData));
      setDeleteType(null);
    } else {
      const deleteGuestData = {
        id: id,
        guestId: userDetails.guestId,
        tableId: data?._id,
      };
      dispatch(deleteTableData(deleteGuestData));
      setDeleteType(null);
    }
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

  const loadTableData = (details: any, tableId: any) => {

    const filteredData = details.filter((data: any) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredData.map((data: any) => {
      return (
        <Table.Row className="tbleR">
          <Table.Cell>
            <p>{data?.name ?? ""}</p>
          </Table.Cell>
          <>
            <Table.Cell>
              <p>{data?.email ?? ""}</p>
            </Table.Cell>
          </>
          <Table.Cell>
            <p>{data?.status ?? ""}</p>
          </Table.Cell>

          <Table.Cell>
            <Grid>
              <Grid.Column computer={8} tablet={16} mobile={16}>
                <MdModeEditOutline
                  cursor={"pointer"}
                  size={24}
                  color="var(--mainColor)"
                  onClick={() => {
                    setCurrentGuest(data);
                    setTableId(tableId);
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
                    setDeleteType("guest");
                  }}
                />
              </Grid.Column>
            </Grid>
          </Table.Cell>
        </Table.Row>
      );
    });
  };
  const prepareCsvData = () => {
    const csvData: { Name: string, Email: string, Status: string }[] = TableData.flatMap((table: { guest: { name: string, email: string, status: string }[] }) =>
      table.guest.map((guest) => ({
        Name: guest.name,
        Email: guest.email,
        Status: guest.status,
      }))
    );
    return csvData;
  };
  useEffect(() => {

    if (searchQuery) {
      const filteredData = TableData.filter((table: any) =>
        table.guest.some((expense: any) =>
          expense.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredGuestData(filteredData);
    } else {
      setFilteredGuestData(TableData);
    }
  }, [searchQuery, guestData]);


  return (
    <>
      <TabView loadData={UserDashboardData} id={userDetails?._id} />
      <Grid className="budgetDataViewMainTop">
        <Grid.Column computer={16}>
          <h2 className="budgetTracker">Guest List</h2>
        </Grid.Column>
        <Grid.Column computer={16}>
          <Grid>
            <Grid.Column computer={3}>
              <h3 className="budgetTracker">Attending</h3>
              <h3 className="budgetTracker">
                {getTotalAttendingCount("Attending")}
              </h3>
            </Grid.Column>
            <Grid.Column computer={3}>
              <h3 className="budgetTracker">Declined</h3>
              <h3 className="budgetTracker">
                {getTotalAttendingCount("Declined")}
              </h3>
            </Grid.Column>
            <Grid.Column computer={3}>
              <h3 className="budgetTracker">Awaiting</h3>
              <h3 className="budgetTracker">
                {getTotalAttendingCount("Awaiting")}
              </h3>
            </Grid.Column>
            <Grid.Column computer={16}>
              <CSVLink
                data={prepareCsvData()}
                filename={"guest_data.csv"}
                className="ui button"
              >
                Download Guest Data as CSV
              </CSVLink>
            </Grid.Column>
            <Grid.Column computer={4}>
              <Input
                icon="search"
                placeholder="Search Guests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />       
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
      <Grid className="budgetDataViewMain">
        {filteredGuestData?.length > 0 ? (
          filteredGuestData.map((data: any, index: any) => {
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
                            <MessageHeader>{data?.tableName}</MessageHeader>
                          </Grid.Column>
                          <Grid.Column computer={8} className="costViewMain">
                            <Icon
                              size="large"
                              name="edit"
                              className="editIconMain"
                              onClick={() => {
                                setVisibleEditTable(true);
                                setCurrentTable(data);
                              }}
                            />
                            <Icon
                              size="large"
                              name="delete"
                              onClick={() => {
                                setDeleteData(data);
                                setVisibleDeleteModal(true);
                                setDeleteType("table");
                              }}
                            />
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
                      {data?.guest?.length > 0 ? (
                        <CommonTable tableHeaderData={GuestDataView}>
                          {loadTableData(data.guest, data._id)}
                        </CommonTable>
                      ) : (
                        <p>Not Available {data?.tableName} Guest </p>
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
                        title="Add Guest"
                        onClick={() => {
                          setViewExpensesModal(true);
                          setTableId(data._id);
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
              <MessageHeader>Not Available Guest</MessageHeader>
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
              <MessageHeader>Add New Table</MessageHeader>
            </Message>
          </Grid.Column>
          <Grid.Column computer={16} tablet={16} mobile={16}>
            <CustomButton
              customButtonStyle="addNewCategoryButton"
              title="Add New Table"
              onClick={() => setVisibleNewCategory(true)}
            />
          </Grid.Column>
        </Grid.Column>
        <Grid.Column computer={2} />
      </Grid>

      <AddGuest
        title="Add Guest"
        viewModal={viewExpensesModal}
        cancel={() => {
          setViewExpensesModal(false);
          setTableId(null);
          setCurrentGuest({});
        }}
        currentGuest={currentGuest}
        tableId={tableId}
        id={id}

      />
      <ConfirmModal
        viewModal={visibleDeleteModal}
        closeModal={() => setVisibleDeleteModal(false)}
        cancel={() => {
          setVisibleDeleteModal(false);
          setDeleteData({});
          setDeleteType(null);
        }}
        approve={() => {
          setVisibleDeleteModal(false);
          deleteGuestData(deleteData);
        }}
        title={
          deleteType == "guest" ? "Delete guest data" : "Delete table data"
        }
        subTitle={
          deleteType == "guest"
            ? "Are you sure you want to delete guest data?"
            : "Are you sure you want to delete table data?"
        }
      />
      <AddTable
        title="Add Table"
        viewModal={visibleNewCategory}
        cancel={() => {
          setVisibleNewCategory(false);
        }}
        id={id}
      />
      <EditTableData
        title="Edit Table Data"
        viewModal={visibleEditTable}
        cancel={() => {
          setVisibleEditTable(false);
        }}
        tableData={currentTable}
        id={id}
      />
    </>
  );
};

export default Guest;
