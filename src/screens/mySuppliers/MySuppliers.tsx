import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Icon, Message, MessageHeader } from "semantic-ui-react";

import { images } from "../../assets/images";
import { RootState } from "../../store/reducer";
import { useParams } from "react-router-dom";
import { useDispatchApp } from "../../store/Store";
import { getMySupplierData } from "../../store/action/supplier";
import { ImageView, TabView } from "../../components";
import { UserDashboardData } from "../../config/constants";

import "./mySupplier.scss";

const MySupplier = () => {
  const { id } = useParams();
  const dispatch = useDispatchApp();
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const { mySupplier } = useSelector((state: RootState) => state.supplier);

  useEffect(() => {
    if (id) {
      dispatch(getMySupplierData(id));
    }
  }, [id]);

  return (
    <>
      <TabView loadData={UserDashboardData} id={userDetails?._id} />
      <Grid className="mySupplierMain">
        {mySupplier?.length > 0 ? (
          mySupplier.map((data: any, index: any) => {
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
                    computer={8}
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
    </>
  );
};

export default MySupplier;
