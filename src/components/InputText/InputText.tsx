import { Grid } from "semantic-ui-react";
import "./inputText.scss";

export const InputText = ({
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
  disabled = false,
  pattern = null,
  onChangeFunction = () => {},
  onFocus = () => {},
  type = "text",
  valueAsNumber = false,
  id,
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
          <input
            id={id}
            className={
              errors
                ? `textInputFormError ${customText}`
                : `textInputFormText ${customText}`
            }
            autoComplete="off"
            placeholder={placeholder}
            defaultValue={defaultValues}
            disabled={disabled}
            {...register(name, {
              required: required,
              onChange: (e: any) => onChangeFunction(e),
              validate: validateHandle,
              valueAsNumber: valueAsNumber,
              
            })}
            onFocus={onFocus}
            pattern={pattern}
            type={type}
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
