import React, { useMemo, useState } from "react";
import { Grid } from "semantic-ui-react";
import { useForm } from "react-hook-form";

import {
  CustomButton,
  DropDown,
  InputText,
  InputTextArea,
  TitleBar,
  TitleView,
} from "../../components";

import "./WeddingVenues.scss";
import { USER_TYPE } from "../../config/constants";
import MainBottomButtonView from "../../components/mainBottomButtonView/MainBottomButtonView";
import { InputNumber } from "../../components/InputText/InputNumber";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

const WeddingVenues = () => {
  const {userDetails} = useSelector((state:RootState)=>state.auth)
  const [packageData, setPackageData] = useState([]);
  const [location, setLocation] = useState("Colombo");

  const values = useMemo(() => {
    setLocation("user");
    setPackageData([]);
    return {
      name: userDetails.name,
      description: "",
      webSiteLink: "",
    };
  }, [userDetails]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: values,
    values: values,
  });

  const {
    register: registerPackage,
    handleSubmit: handleSubmitPackages,
    formState: { errors: packageErrors },
    control: packageControl,
  } = useForm();

  const onSubmit = (data: any) => {};

  const onSubmitPackages = (data: any) => {};

  return (
    <>
      <TitleBar titleName={"Wedding Venue Register"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid className="weddingVenue">
          <Grid.Column computer={8} tablet={16} mobile={16}>
            <InputText
              register={register}
              errors={errors.name}
              required={true}
              labelName={"Supplier Name"}
              placeholder="Supplier Name"
              name="name"
              errorMessage="Please enter supplier Name"
            />
          </Grid.Column>
          <Grid.Column computer={8} tablet={16} mobile={16}>
            <InputTextArea
              register={register}
              errors={errors.description}
              required={true}
              labelName={"Description"}
              placeholder="Description"
              name="description"
              errorMessage="Please enter description"
            />
          </Grid.Column>

          <Grid.Column computer={8} tablet={16} mobile={16}>
            <DropDown
              labelName="Location"
              placeholder="Location"
              defaultValue={location}
              currentData={USER_TYPE}
              handleChangeState={(e: any, { value }: any) => {
                setLocation(value);
              }}
              search
              key={"userType"}
              customGridColumn={"customGridColomnTyp"}
            />
          </Grid.Column>

          <Grid.Column computer={8} tablet={16} mobile={16}>
            <InputText
              register={register}
              errors={errors.webSiteLink}
              labelName={"Web Site"}
              placeholder="Web Site"
              name="webSiteLink"
            />
          </Grid.Column>
        </Grid>
      </form>

      <form onSubmit={handleSubmitPackages(onSubmitPackages)}>
        <Grid className="weddingVenue">
          <TitleView
            title="Package Details"
            CustomTitleViewMain="weddingMenuPackageTitle"
          />
          <Grid.Column computer={4} tablet={16} mobile={16}>
            <InputText
              register={registerPackage}
              errors={packageErrors.packageName}
              required={true}
              labelName={"Package Name"}
              placeholder="Package Name"
              name="packageName"
              errorMessage="Please enter user name"
            />
          </Grid.Column>
          <Grid.Column computer={4} tablet={16} mobile={16}>
            <InputText
              register={registerPackage}
              errors={packageErrors.hallName}
              required={true}
              labelName={"Hall Name"}
              placeholder="Hall Name"
              name="hallName"
              errorMessage="Please enter user name"
            />
          </Grid.Column>

          <Grid.Column computer={4} tablet={16} mobile={16}>
            <InputNumber
              control={packageControl}
              errors={packageErrors.maxCount}
              required={true}
              labelName={"Max Count"}
              placeholder="Max Count"
              name="maxCount"
              errorMessage="Please enter user name"
            />
          </Grid.Column>

          <Grid.Column computer={4} tablet={16} mobile={16}>
            <InputNumber
              control={packageControl}
              errors={packageErrors.price}
              required={true}
              labelName={"Price"}
              placeholder="Price"
              name="price"
              errorMessage="Please enter user name"
            />
          </Grid.Column>

          <Grid.Column computer={8} tablet={16} mobile={16}>
            <InputTextArea
              register={registerPackage}
              errors={packageErrors.packageDescription}
              required={true}
              labelName={"Package Description"}
              placeholder="Package Description"
              name="packageDescription"
              errorMessage="Please enter user name"
            />
          </Grid.Column>
          <Grid.Column
            computer={4}
            tablet={16}
            mobile={16}
            className="packageAddButton"
          >
            <CustomButton title="Add Package" type="submit" />
          </Grid.Column>
        </Grid>
      </form>

      <MainBottomButtonView
        cancelStatus={true}
        saveButtonStatus={true}
        cancelButton={() => {}}
        saveButton={handleSubmit(onSubmit)}
        saveTitle={"Submit"}
        type="submit"
      />
    </>
  );
};

export default WeddingVenues;
