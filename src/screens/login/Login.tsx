import React,{useEffect} from "react";
import { Dimmer, Grid, Loader } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { InputText, CustomButton } from "../../components";
import { getUserDetails, userLogin } from "../../store/action/auth";
import { useDispatchApp } from "../../store/Store";

import "./Login.scss";
import { getTokenInLocal } from "../../utils/cacheStorage";
import { isEmpty } from "lodash";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatchApp();

  useEffect(()=>{
    if(!isEmpty(getTokenInLocal()) ){
        dispatch(getUserDetails(navigate))
    }
  },[])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handle login
  const onSubmit =  (data: any) => {
    dispatch(userLogin(data,navigate))
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
            <span className="welcomeTxt">Please sign in to continue.</span>
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
              placeholder="Enter Username"
              name="email"
              errorMessage="Please enter email"
            />
          </Grid.Column>
          <Grid.Column
            style={{ paddingTop: "0px", paddingBottom: "0px" }}
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
          <Grid.Column computer={16} tablet={16} mobile={16}>
            <CustomButton
              theme="green"
              title={"Login"}
              customButtonStyle={"customBtnn"}
              type={"submit"}
            />
          </Grid.Column>
          <Grid.Column
            className="paddingRemoveVertical"
            computer={16}
            tablet={16}
            mobile={16}
          >
            <a
              className="userPasswordLink"
              onClick={() =>
                navigate("/password-reset", {
                  state: {
                    isPasswordResetRequired: false,
                    email: "",
                  },
                })
              }
            >
              Reset Password
            </a>
          </Grid.Column>
          <Grid.Column
            className="paddingRemoveBottom"
            computer={16}
            tablet={16}
            mobile={16}
          >
            <a
              className="userPasswordLink"
              onClick={() => navigate("/password-forgot")}
            >
              Forgot Password
            </a>
          </Grid.Column>
        </Grid>
      </form>
    </>
  );
};
export default Login;
