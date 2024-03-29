import React, { useMemo, useState, useEffect } from "react";
import { Grid, Table } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import {
  CommonTable,
  CustomButton,
  DropDown,
  ImageView,
  InputText,
  InputTextArea,
  TitleBar,
  TitleView,
} from "../../components";
import {
  DisableCategory,
  Districts,
  UnavailableDates,
  WeddingPackageTable,
  WeddingVenues,
} from "../../config/constants";
import MainBottomButtonView from "../../components/mainBottomButtonView/MainBottomButtonView";
import { InputNumber } from "../../components/InputText/InputNumber";
import { RootState } from "../../store/reducer";
import { useDispatchApp } from "../../store/Store";
import {
  getSupplierDataById,
  createSupplierPackages,
  updateSupplierPackages,
  deleteSupplierPackages,
  updateSupplierData,
} from "../../store/action/supplier";
import ConfirmModal from "../../components/confirmViewModal/ConfirmModal";

import "./SupplierData.scss";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import { isEmpty } from "lodash";

const SupplierData = ({ route }: any) => {
  const dispatch = useDispatchApp();
  const navigate = useNavigate();
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const { supplierData } = useSelector((state: RootState) => state.supplier);
  const { id } = useParams();
  const { state: navigationState }: any = useLocation();

  const [packageData, setPackageData] = useState<any>([]);
  const [location, setLocation] = useState("Colombo");
  const [enableEditPackage, setEnableEditPackage] = useState<any>(false);
  const [currentPackageId, setCurrentPackageId] = useState<any>(null);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState<any>({});
  const supplierCategory =
    supplierData?.categoryType || navigationState?.categoryType;
  const supplierImage = supplierData?.images || [];
  const isCategoryVenue = supplierCategory === "Venues";
  const disableCategoryPackage = DisableCategory.some(
    (e) => e === supplierCategory
  );
  const currentUnavailableData = [...(supplierData?.unavailableDates || [])];

  useEffect(() => {
    if (id) {
      dispatch(getSupplierDataById(id));
    }
  }, [id]);

  const values = useMemo(() => {
    setLocation(supplierData?.location || "");
    setPackageData(supplierData?.packageId?.packages || []);
    return {
      supplierName: supplierData?.supplierName || userDetails.name,
      description: supplierData?.description || "",
      webLink: supplierData?.webLink || "",
    };
  }, [userDetails, supplierData]);

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
    reset,
    formState: { errors: packageErrors },
    control: packageControl,
    setValue,
  } = useForm();

  const setUpdatePackageDetails = (data: any) => {
    setValue("packageName", data.packageName);
    setValue("hallName", data.hallName);
    setValue("maxCount", data.maxCount);
    setValue("price", data.price);
    setValue("packageDescription", data.packageDescription);
  };

  const onSubmit = (data: any) => {
    data.location = location;
    data.categoryType = supplierCategory;
    let supplierDetails = {
      id: supplierData._id,
      data: data,
    };
    dispatch(updateSupplierData(supplierDetails, navigate));
  };

  const updateSupplierImages = (data: any) => {
    const updateImages = [...supplierData.images, data];
    let supplierDetails = {
      id: supplierData._id,
      data: {
        supplierName: supplierData.supplierName,
        images: updateImages,
      },
    };
    dispatch(updateSupplierData(supplierDetails, navigate));
  };

  const onSubmitPackages = async (data: any) => {
    if (enableEditPackage) {
      let packageDetails = {
        id: supplierData?.packageId?._id,
        packageId: currentPackageId,
        data: data,
      };
      let res = await dispatch(updateSupplierPackages(packageDetails));
      if (res) {
        reset();
        setEnableEditPackage(false);
        setCurrentPackageId(null);
        setPackageData(res?.data?.data?.packages || []);
      }
    } else {
      let packageDetails = {
        id: supplierData?.packageId?._id,
        data: data,
      };
      let res = await dispatch(createSupplierPackages(packageDetails));
      if (res) {
        setPackageData(res?.data?.data?.packages || []);
        reset();
      }
    }
  };

  const deletePackageData = async (data: any) => {
    let packageDetails = {
      id: supplierData?.packageId?._id,
      packageId: deleteData._id,
    };
    let res = await dispatch(deleteSupplierPackages(packageDetails));
    if (res) {
      let getFilterPackageData = packageData.filter(
        (e: any) => e._id !== deleteData._id
      );
      setPackageData(getFilterPackageData);
      setDeleteData({});
    }
  };

  const deleteUnavailableDate = async (index: any) => {
    let getData = [...currentUnavailableData];
    getData.splice(index, 1);
    let supplierDetails = {
      id: supplierData._id,
      data: {
        unavailableDates: getData,
      },
    };
    dispatch(updateSupplierData(supplierDetails, navigate));
  };

  const addUnavailableData = (date: any) => {
    let supplierDetails = {
      id: supplierData._id,
      data: {
        unavailableDates: [...currentUnavailableData, date],
      },
    };
    dispatch(updateSupplierData(supplierDetails, navigate));
  };

  const loadUnavailableDataData = () => {
    return currentUnavailableData.map((data: any, index: number) => {
      var formatDate = new Date(data);
      return (
        <Table.Row className="tbleR" key={index}>
          <Table.Cell>
            <p>{formatDate.toLocaleDateString("en-US")}</p>
          </Table.Cell>
          <Table.Cell>
            <Grid>
              <Grid.Column computer={8} tablet={16} mobile={16}>
                <MdDeleteOutline
                  cursor={"pointer"}
                  size={24}
                  color="var(--mainColor)"
                  onClick={() => {
                    deleteUnavailableDate(index);
                  }}
                />
              </Grid.Column>
            </Grid>
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  const loadTableData = () => {
    return packageData.map((data: any, index: number) => {
      return (
        <Table.Row className="tbleR" key={index}>
          <Table.Cell>
            <p>{data?.packageName ?? ""}</p>
          </Table.Cell>
          {isCategoryVenue ? (
            <>
              <Table.Cell>
                <p>{data?.hallName ?? ""}</p>
              </Table.Cell>
            </>
          ) : null}
          <Table.Cell>
            <p>
              {isCategoryVenue
                ? data?.maxCount ?? ""
                : data?.packageDescription ?? ""}
            </p>
          </Table.Cell>
          <Table.Cell>
            <p>{data?.price ?? ""}</p>
          </Table.Cell>
          <Table.Cell>
            <Grid>
              <Grid.Column computer={8} tablet={16} mobile={16}>
                <MdModeEditOutline
                  cursor={"pointer"}
                  size={24}
                  color="var(--mainColor)"
                  onClick={() => {
                    setUpdatePackageDetails(data);
                    setEnableEditPackage(true);
                    setCurrentPackageId(data._id);
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

  return (
    <>
      <TitleBar
        titleName={
          isEmpty(supplierCategory)
            ? `Wedding ${supplierCategory} Register`
            : "Profile Details"
        }
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid className="weddingVenue">
          <Grid.Column computer={8} tablet={16} mobile={16}>
            <InputText
              register={register}
              errors={errors.supplierName}
              required={true}
              labelName={"Supplier Name"}
              placeholder="Supplier Name"
              name="supplierName"
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
              currentData={Districts}
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
              errors={errors.webLink}
              labelName={"Web Site"}
              placeholder="Web Site"
              name="webLink"
            />
          </Grid.Column>
          <Grid.Column computer={16} className="supplierDatePicker">
            <p className={`inputTextSupplierDateLable`}>Unavailable Date</p>
            <DatePicker
              selected={new Date()}
              onChange={(date: any) => {
                addUnavailableData(date);
              }}
              minDate={new Date()}
            />
          </Grid.Column>
          {currentUnavailableData.length > 0 ? (
            <Grid.Column computer={16} className="supplierDatePicker">
              <TitleView
                title="Unavailable Dates"
                CustomTitleViewMain="weddingMenuPackageTitle"
              />

              <CommonTable tableHeaderData={UnavailableDates}>
                {loadUnavailableDataData()}
              </CommonTable>
            </Grid.Column>
          ) : null}
          <Grid.Column computer={16}>
            <ImageUpload
              returnImageUrl={(data: any) => updateSupplierImages(data)}
            />
          </Grid.Column>
          {supplierImage.map((data: any) => {
            return (
              <Grid.Column computer={4}>
                <ImageView src={data} customImageView={"customSupplierView"} />
              </Grid.Column>
            );
          })}
        </Grid>
      </form>

      {!disableCategoryPackage ? (
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
            {isCategoryVenue ? (
              <>
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
              </>
            ) : null}
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
              <CustomButton
                title={enableEditPackage ? "Edit" : "Add Package"}
                type="submit"
              />
            </Grid.Column>
            <Grid.Column
              computer={16}
              tablet={16}
              mobile={16}
              className="packagingDetailsView"
            >
              {packageData.length !== 0 ? (
                <CommonTable
                  tableHeaderData={
                    isCategoryVenue ? WeddingVenues : WeddingPackageTable
                  }
                >
                  {loadTableData()}
                </CommonTable>
              ) : null}
            </Grid.Column>
          </Grid>
        </form>
      ) : null}

      <MainBottomButtonView
        cancelStatus={true}
        saveButtonStatus={true}
        cancelButton={() => {}}
        saveButton={handleSubmit(onSubmit)}
        saveTitle={"Submit"}
        type="submit"
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
          deletePackageData(deleteData);
        }}
        title="Delete package details"
        subTitle="Are you sure you want to delete package details?"
      />
    </>
  );
};

export default SupplierData;
