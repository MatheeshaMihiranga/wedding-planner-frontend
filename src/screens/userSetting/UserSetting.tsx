import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatchApp } from "../../store/Store";
import {
  deleteUser,
  getUserDetails,
  userUpdate,
} from "../../store/action/auth";
import { Grid, Icon } from "semantic-ui-react";
import { UserDashboardData } from "../../config/constants";
import {
  CustomButton,
  ImageView,
  InputText,
  TabView,
  TitleView,
} from "../../components";
import DatePicker from "react-datepicker";

import "./userSetting.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { useForm } from "react-hook-form";
import { InputNumber } from "../../components/InputText/InputNumber";
import { formatDate } from "../../utils/utils";
import MainBottomButtonView from "../../components/mainBottomButtonView/MainBottomButtonView";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import { isEmpty } from "lodash";
import ConfirmModal from "../../components/confirmViewModal/ConfirmModal";

const UserSetting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatchApp();
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const [eventDate, setEventDate] = useState<any>(formatDate(new Date()));
  const [deleteUserModal, setDeleteUserModal] = useState(false);

  const values = useMemo(() => {
    setEventDate(userDetails?.eventDate || formatDate(new Date()));
    return {
      brideName: userDetails?.brideName || "",
      groomName: userDetails?.groomName || "",
      email: userDetails?.email || "",
      budget: userDetails?.budget || "",
    };
  }, [userDetails]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({ mode: "onChange", defaultValues: values, values: values });

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails());
    }
  }, [id]);

  const onSubmit = async (data: any) => {
    data.eventDate = eventDate;
    const userUpdateData = {
      id: id,
      data: data,
    };

    await dispatch(userUpdate(userUpdateData));
    navigate(`/user-dashboard/${id}`)
  };

  const updateUserImage = (data: any) => {
    const userUpdateData = {
      id: id,
      data: {
        imageUrl: data,
      },
    };
    dispatch(userUpdate(userUpdateData));
  };

  const deleteCurrentUser = () => {
    dispatch(deleteUser(id, navigate));
  };

  return (
    <>
      <TabView loadData={UserDashboardData} id={userDetails?._id} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid className="userDashboardMain">
          <TitleView title="User Setting" />
          {isEmpty(userDetails?.imageUrl) ? (
            <>
              <Grid.Column computer={16}>
                <ImageUpload
                  returnImageUrl={(data: any) => updateUserImage(data)}
                />
              </Grid.Column>
            </>
          ) : (
            <Grid.Column computer={16}>
              <Icon
                size="large"
                name="close"
                color="grey"
                className="closeImageIcon"
                onClick={() => {
                  updateUserImage("");
                }}
              />
              <ImageView
                src={userDetails?.imageUrl}
                customImageView={"customUserImage"}
              />
            </Grid.Column>
          )}

          <Grid.Column
            computer={8}
            tablet={16}
            mobile={16}
            className="userSummeryDetails"
          >
            <InputText
              register={register}
              errors={errors.brideName}
              labelName={"Bride name*"}
              placeholder="Bride Username"
              name="brideName"
              errorMessage="Please enter contact user name"
              validateHandle={(value: string) => {
                return /^[A-Za-z\s]+$/.test(value) || "Please enter only letters and spaces";
              }}
            />
          </Grid.Column>
          <Grid.Column
            computer={8}
            tablet={16}
            mobile={16}
            className="userSummeryDetails"
          >
            <InputText
              register={register}
              errors={errors.groomName}
              labelName={"Groom name*"}
              placeholder="Groom Username"
              name="groomName"
              errorMessage="Please enter contact user name"
              validateHandle={(value: string) => {
                return /^[A-Za-z\s]+$/.test(value) || "Please enter only letters and spaces";
              }}
            />
          </Grid.Column>
          <Grid.Column
            computer={16}
            tablet={16}
            mobile={16}
            className="userSummeryDetails"
          >
            <InputText
              register={register}
              errors={errors.email}
              labelName={"Email"}
              placeholder="Email"
              name="email"
              disabled={true}
            />
          </Grid.Column>
          <Grid.Column
            computer={8}
            tablet={16}
            mobile={16}
            className="userSummeryDetails"
          >
            <p className="eventDateTitle">Event Date</p>
            <DatePicker
              selected={new Date(eventDate)}
              onChange={(date: any) => {
                let selectDate = formatDate(date);
                setEventDate(selectDate);
              }}
              minDate={new Date()}
            />
          </Grid.Column>
          <Grid.Column
            computer={8}
            tablet={16}
            mobile={16}
            className="userSummeryDetailsOther"
          >
            <InputNumber
              control={control}
              errors={errors.budget}
              labelName={"Budget"}
              placeholder="Budget"
              name="budget"
              addCurrency={true}
            />
          </Grid.Column>
        </Grid>

        <MainBottomButtonView
          deleteStatus={true}
          saveButtonStatus={true}
          deleteButton={() => setDeleteUserModal(true)}
          cancel="Clear"
          saveTitle={"Update User"}
          type="submit"
        />
        <ConfirmModal
          viewModal={deleteUserModal}
          closeModal={() => setDeleteUserModal(false)}
          cancel={() => {
            setDeleteUserModal(false);
          }}
          approve={() => {
            deleteCurrentUser();
          }}
          title="Delete current user"
          subTitle="Are you sure you want to delete user?"
        />
      </form>
    </>
  );
};

export default UserSetting;
