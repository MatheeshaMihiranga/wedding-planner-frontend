import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, GridColumn, Icon, Message, MessageHeader,Input } from "semantic-ui-react";

import { images } from "../../assets/images";
import { RootState } from "../../store/reducer";
import { useParams } from "react-router-dom";
import { useDispatchApp } from "../../store/Store";
import { deleteEnquery, getMySupplierData } from "../../store/action/supplier";
import { ImageView, TabView } from "../../components";
import { UserDashboardData } from "../../config/constants";

import "./mySupplier.scss";
import ConfirmModal from "../../components/confirmViewModal/ConfirmModal";

const MySupplier = () => {
  const { id } = useParams();
  const dispatch = useDispatchApp();
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const { mySupplier } = useSelector((state: RootState) => state.supplier);

  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getMySupplierData(id));
    }
  }, [id]);

  const deleteEnquiry = (currentDeleteData: any) => {
    const details = {
      id: currentDeleteData.supplierData.enquireId,
      enquireId: currentDeleteData._id
    };
    dispatch(deleteEnquery(details));
  };

  const filteredSuppliers = mySupplier.filter((supplier:any) =>
    supplier.supplierData.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <TabView loadData={UserDashboardData} id={userDetails?._id} />
      <Grid>
        <GridColumn>
          <Input
          icon="search"
          placeholder="Search supplier..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </GridColumn>
      </Grid>
      
      <Grid className="mySupplierMain">
        {filteredSuppliers?.length > 0 ? (
          filteredSuppliers.map((data: any, index: any) => {
            return (
              <Grid.Column
                key={index}
                computer={16}
                tablet={16}
                mobile={16}
                className="supplierDataView"
              >
                <Grid>
                  <Grid.Column
                    computer={7}
                    tablet={16}
                    mobile={16}
                    className="supplierNameViewMain"
                  >
                    <ImageView
                      customImageView={"supplierImageView"}
                      src={
                        data.supplierData.images?.[0] || images.DefaultUserImage
                      }
                    />
                    <h2 className="supplierName">
                      {data.supplierData.supplierName}
                    </h2>
                  </Grid.Column>
                  <Grid.Column computer={8} tablet={16} mobile={16}>
                    <Grid>
                      <Grid.Column
                        computer={16}
                        tablet={16}
                        mobile={16}
                        className="supplierNameViewMain"
                      >
                        <Icon name="tag" />
                        <p className="supplierSubDetails">
                          {data.supplierData.categoryType}
                        </p>
                      </Grid.Column>
                      <Grid.Column
                        computer={16}
                        tablet={16}
                        mobile={16}
                        className="supplierNameViewMain"
                      >
                        <Icon name="mail" />
                        <p className="supplierSubDetails">
                          {data.supplierData.contactEmail}
                        </p>
                      </Grid.Column>
                      <Grid.Column
                        computer={16}
                        tablet={16}
                        mobile={16}
                        className="supplierNameViewMain"
                      >
                        <Icon name="user" />
                        <p className="supplierSubDetails">
                          {data.supplierData.contactUserName}
                        </p>
                      </Grid.Column>
                      <Grid.Column
                        computer={16}
                        tablet={16}
                        mobile={16}
                        className="supplierNameViewMain"
                      >
                        <Icon name="map marker alternate" />
                        <p className="supplierSubDetails">
                          {data.supplierData.location}
                        </p>
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                  <Grid.Column computer={1} tablet={16} mobile={16}>
                    <Icon
                      name="delete calendar"
                      size="large"
                      onClick={() => {
                        setVisibleDeleteModal(true);
                        setDeleteData(data);
                      }}
                    />
                    <p>Delete Inquiry</p>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            );
          })
        ) : (
          <Grid.Column computer={16}>
            <Message>
              <MessageHeader>Not Available Supplier</MessageHeader>
            </Message>
          </Grid.Column>
        )}
      </Grid>
      <ConfirmModal
        viewModal={visibleDeleteModal}
        closeModal={() => setVisibleDeleteModal(false)}
        cancel={() => {
          setVisibleDeleteModal(false);
          setDeleteData({});
        }}
        approve={() => {
          setVisibleDeleteModal(false);
          deleteEnquiry(deleteData);
        }}
        title="Delete Enquiry"
        subTitle="Are you sure you want to delete enquiry?"
      />
    </>
  );
};

export default MySupplier;
