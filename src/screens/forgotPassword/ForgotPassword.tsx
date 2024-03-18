import { useEffect } from "react";
import { Dimmer, Grid, Loader } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { InputText, CustomButton } from "../../components";

import "./forgotPassword.scss";

const PasswordForgot = () => {
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handle user password submit
  const onSubmit = async (data: any) => {
  };


  return (
    <>
      <form className="mainContaa" onSubmit={handleSubmit(onSubmit)}>
        <Grid className="backgroundLoginMain">
          <Grid.Column computer={16} tablet={16} mobile={16}>
            <span className="welcomeTxt">Forgot Password</span>
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
            <CustomButton
              theme="green"
              title={"Submit"}
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

export default PasswordForgot;
