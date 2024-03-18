import { useRef, useState } from "react";
import { Grid } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { InputText, CustomButton, DropDown } from "../../components";

import "./Register.scss";
import { USER_TYPE } from "../../config/constants";
import { useDispatchApp } from "../../store/Store";
import { userRegister } from "../../store/action/auth";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("user");
  const dispatch = useDispatchApp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const confirmPassword = useRef({});
  confirmPassword.current = watch("confirmPassword", "");
  //handle login
  const onSubmit = async (data: any) => {
    data.role = userType;
    dispatch(userRegister(data, navigate));
  };

  return (
    <>
      <form className="mainContaa" onSubmit={handleSubmit(onSubmit)}>
        <Grid className="backgroundLoginMain">
          <Grid.Column computer={16} tablet={16} mobile={16}>
            <span className="welcomeTxt">Sign Up</span>
          </Grid.Column>
          <Grid.Column
            style={{ paddingTop: "0px" }}
            computer={16}
            tablet={16}
            mobile={16}
          >
            <InputText
              register={register}
              errors={errors.name}
              required={true}
              labelName={"User name*"}
              placeholder="Enter Username"
              name="name"
              errorMessage="Please enter user name"
            />
          </Grid.Column>
          <Grid.Column
            style={{ paddingTop: "0px" }}
            computer={16}
            tablet={16}
            mobile={16}
          >
            <InputText
              register={register}
              errors={errors.email}
              required={true}
              labelName={"Email*"}
              placeholder="Enter Email"
              name="email"
              errorMessage="Please enter email"
            />
          </Grid.Column>
          <Grid.Column
            style={{ paddingTop: "0px" }}
            computer={16}
            tablet={16}
            mobile={16}
          >
            <InputText
              register={register}
              errors={errors.password}
              required={true}
              labelName={"Password*"}
              placeholder="Enter Password"
              name="password"
              type={"password"}
              errorMessage="Please enter password"
            />
          </Grid.Column>
          <Grid.Column
            style={{ paddingTop: "0px" }}
            computer={16}
            tablet={16}
            mobile={16}
          >
            <InputText
              register={register}
              errors={errors.confirmPassword}
              required={true}
              labelName={"Confirm Password*"}
              placeholder="Enter Confirm Password"
              name="confirmPassword"
              type={"password"}
              validateHandle={(e: any) => {
                return e === password.current || "The passwords do not match";
              }}
              errorMessage={
                confirmPassword.current !== password.current
                  ? "The passwords do not match"
                  : "Please enter confirm password"
              }
            />
          </Grid.Column>
          <Grid.Column
            style={{ paddingTop: "0px" }}
            computer={16}
            tablet={16}
            mobile={16}
          >
            <DropDown
              labelName="Register type"
              placeholder="User type"
              defaultValue={userType}
              currentData={USER_TYPE}
              handleChangeState={(e: any, { value }: any) => {
                setUserType(value);
              }}
              search
              key={"userType"}
              customGridColumn={"customGridColomnTyp"}
            />
          </Grid.Column>
          <Grid.Column computer={16} tablet={16} mobile={16}>
            <CustomButton
              theme="green"
              title={"Sign up"}
              customButtonStyle={"customBtnn"}
              type={"submit"}
            />
          </Grid.Column>
        </Grid>
      </form>
    </>
  );
};
export default RegisterUser;
