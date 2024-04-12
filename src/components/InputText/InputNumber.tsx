import React from "react";
import { Grid } from "semantic-ui-react";
import isEmpty from "lodash/isEmpty";
import "./inputText.scss";
import { Controller } from "react-hook-form";

export const InputNumber = ({
  computer = undefined,
  tablet = undefined,
  mobile = undefined,
  name,
  errors,
  control,
  transform,
  defaultValue,
  customLabelText,
  labelName,
  customGridMain,
  customGridColumn,
  errorMessage,
  customErrorText,
  customText,
  required = false,
  otherValidation,
  checkValidation = false,
  enableMinus = false,
  placeholder=""
}: any) => {
  //check error message
  const checkErrorMessage = (errors: any) => {
    switch (errors.type) {
      case "required":
        return errorMessage;
      default:
        return errors.message;
    }
  };

  //check error number
  const checkNumber = () => {
    if (checkValidation) {
      return transform;
    } else {
      return {
        input: (values: any) => {
          if (enableMinus) {
            let value = values || "";
            if (value?.replace || undefined) {
              value = value?.replace(/[^0-9-]+/g, "");
              var pattern = /([-])?([0-9]+)/g;
              var matches = value.match(pattern) || value;
              if (matches) {
                value = matches[0];
                return value?.toString();
              } else {
                return "";
              }
            } else {
              return value;
            }
          } else {
            if (isNaN(parseInt(values)) || values === 0) {
              return "";
            } else {
              return values?.toString();
            }
          }
        },
        output: (e: any) => {
          if (enableMinus) {
            return e;
          } else {
            if (!isNaN(e.target.value)) {
              return e;
            }
          }
        },
      };
    }
  };

  //check input change
  const inputOnchangeValue = (e: any, field: any) => {
    field.onChange(
      checkValidation ? transform.output(e) : checkNumber().output(e)
    );
  };

  //return input changes
  const returnValue = (field: any) => {
    return checkValidation
      ? transform.input(field.value)
      : checkNumber().input(field.value);
  };

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
          <Controller
            defaultValue={defaultValue}
            control={control}
            rules={{
              required: {
                value: required,
                message: errorMessage,
              },
              ...otherValidation,
            }}
            name={name}
            render={({ field }) => (
              <input
                className={
                  errors
                    ? `textInputFormError ${customText}`
                    : `textInputFormText ${customText}`
                }
                placeholder={placeholder}
                onChange={(e) => inputOnchangeValue(e, field)}
                value={returnValue(field)}
              />
            )}
          />
          {errors && (
            <span className={`textInputError ${customErrorText}`}>
              {checkErrorMessage(errors)}
            </span>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};
