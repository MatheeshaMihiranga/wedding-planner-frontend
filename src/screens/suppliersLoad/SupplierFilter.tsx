import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { CommonContainer, DropDown, TitleBar } from "../../components";
import DatePicker from "react-datepicker";

import getWindowDimensions from "../../hooks/windowsSize";

import { Districts, Packages } from "../../config/constants";
import RatingView from "../../components/rating/Rating";
import MainBottomButtonView from "../../components/mainBottomButtonView/MainBottomButtonView";

import "./supplierDetails.scss";

const SuppliersFilter = ({ filterSupplierData, supplierCategory }: any) => {
  const { height } = getWindowDimensions();
  const [date, setDate] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const [pack, setPack] = useState(null);
  const [rating, setRating] = useState(null);
  const enablePack = supplierCategory === "Venues";

  const filterSupplierDetails = (ratingData?: any) => {
    setRating(ratingData ? ratingData : null);
    let data = {
      type: supplierCategory,
      location: location,
      maxCount: pack,
      date: date,
      rating: rating,
    };
    filterSupplierData(data);
  };

  const resetFilterData = (ratingData?: any) => {
    setRating(ratingData ? ratingData : null);
    let data = {
      type: supplierCategory,
      location: null,
      maxCount: null,
      date: null,
      rating: null,
    };
    setDate(null);
    resetData();
    filterSupplierData(data);
  };

  const resetData = () => {
    setLocation(null);
    setPack(null);
    setRating(null);
  };

  const formatDate = (dateValue: any) => {
    const date = new Date(dateValue);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    resetData();
    return formattedDate;
  };

  return (
    <>
      <TitleBar titleName="Filters" />
      <Grid className={`supplierDetailsMain`}>
        <Grid.Column
          computer={16}
          tablet={16}
          className={`supplierDetailsContent`}
          style={{ height: height - 360 }}
        >
          <CommonContainer>
            <Grid.Column
              computer={16}
              className="supplierFilterDatePicker supplierFilterBottom"
            >
              <p className={`inputTextSupplierDateLable`}>Date</p>
              <DatePicker
                selected={date}
                onChange={(date: any) => {
                  let selectDate = formatDate(date);
                  setDate(selectDate);
                }}
                minDate={new Date()}
              />
            </Grid.Column>
            <Grid.Column computer={16} tablet={16} mobile={16}>
              <DropDown
                labelName="Location"
                placeholder="Location"
                defaultValue={location}
                currentData={Districts}
                handleChangeState={(e: any, { value }: any) => {
                  setLocation(value);
                }}
                search
                key={"userType"}
                customGridColumn={"customGridColomnTyp"}
              />
            </Grid.Column>
            {enablePack ? (
              <Grid.Column computer={16} tablet={16} mobile={16}>
                <DropDown
                  labelName="Pack"
                  placeholder="Pack"
                  defaultValue={pack}
                  currentData={Packages}
                  handleChangeState={(e: any, { value }: any) => {
                    setPack(value);
                  }}
                  search
                  key={"userType"}
                  customGridColumn={"customGridColomnTyp"}
                />
              </Grid.Column>
            ) : null}
            <p
              className={`inputTextSupplierDateLable supplierSearchRatingTitle`}
            >
              Rating
            </p>
            <RatingView
              ratingValue={(data: any) => filterSupplierDetails(data)}
            />
          </CommonContainer>
        </Grid.Column>
        <MainBottomButtonView
          cancelStatus={true}
          saveButtonStatus={true}
          cancelButton={() => resetFilterData()}
          saveButton={() => filterSupplierDetails()}
          cancel="Clear"
          saveTitle={"Apply"}
          type="submit"
        />
      </Grid>
    </>
  );
};

export default SuppliersFilter;
