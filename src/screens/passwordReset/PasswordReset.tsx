import { Dimmer, Grid, Loader } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { InputText, CustomButton } from "../../components";

import "./passwordReset.scss";
import { useEffect, useMemo } from "react";
import { successMessage } from "../../helpers/ErrorHandler";

const PasswordReset = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let passwordResetStatus = location.state.isPasswordResetRequired;
  let userEmail = location.state.email;


  //handle user password reset input
  const values = useMemo(() => {
    return {
      email: userEmail,
      oldPassword: "",
      newPassword: "",
    };
  }, [userEmail]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: values,
    values: values,
  });


  //submit user password reset
  const onSubmit = async (data: any) => {
  };

  //handle loading
  if (false) {
    return (
      <Dimmer active>
        <Loader content="Loading" />
      </Dimmer>
    );
  }

  return (
    <>
      <form className="mainContaa" onSubmit={handleSubmit(onSubmit)}>
        <Grid className="backgroundLoginMain">
          <Grid.Column computer={16} tablet={16} mobile={16}>
            <span className="welcomeTxt">Reset Password</span>
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
              labelName={"Email"}
              placeholder="Enter email"
              name={"email"}
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
              errors={errors.oldPassword}
              required={true}
              errorMessage="Please enter old password"
              labelName={
                passwordResetStatus ? "Temporary Password" : "Old Password"
              }
              placeholder={
                passwordResetStatus
                  ? "Enter Temporary Password"
                  : "Enter Old Password"
              }
              name="oldPassword"
              type={"password"}
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
              labelName={"New Password"}
              errors={errors.newPassword}
              required={true}
              errorMessage="Please enter new password"
              placeholder="Enter New Password"
              name="newPassword"
              type={"password"}
            />
          </Grid.Column>
          <Grid.Column
            style={{ paddingTop: "0px" }}
            computer={16}
            tablet={16}
            mobile={16}
          >
            <CustomButton
              theme="green"
              title={"Reset Password"}
              customButtonStyle={"customBtnn"}
              type={"submit"}
            />
          </Grid.Column>
          <Grid.Column
            style={{ paddingTop: "0px" }}
            computer={16}
            tablet={16}
            mobile={16}
          >
            <CustomButton
              theme="green"
              title={"Cancel"}
              customButtonStyle={"customBtnn"}
              buttonOutLine={true}
              onClick={() => navigate("/auth")}
            />
          </Grid.Column>
        </Grid>
      </form>
    </>
  );
};

export default PasswordReset;
