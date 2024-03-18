import React from "react";
import { Grid } from "semantic-ui-react";
import isEmpty from "lodash/isEmpty";
import "./inputText.scss";

export const InputTextArea = ({
  computer = undefined,
  tablet = undefined,
  mobile = undefined,
  name,
  register = () => {},
  errors,
  required,
  placeholder,
  labelName,
  errorMessage,
  customLabelText,
  customGridMain,
  customGridColumn,
  customText,
  customErrorText,
  defaultValues,
  validateHandle = () => {},
  onChangeFunction = () => {},
  disabled = false,
}: any) => {
  return (
    <>
      <label className={`inputTextLable ${customLabelText}`}>{labelName}</label>
      <Grid className={`${customGridMain}`}>
        <Grid.Column
          computer={computer}
          tablet={tablet}
          mobile={mobile}
          className={`inputTextContanier ${customGridColumn}`}
        >
          <textarea
            className={
              errors
                ? `textInputFormError ${customText}`
                : `textInputFormText ${customText}`
            }
            autoComplete="off"
            placeholder={placeholder}
            defaultValue={defaultValues}
            {...register(name, {
              onChange: (e: any) => onChangeFunction(e),
              required: required,
              validate: validateHandle,
            })}
            disabled={disabled}
          />
          {errors && (
            <span className={`textInputError ${customErrorText}`}>
              {errorMessage}
            </span>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};
