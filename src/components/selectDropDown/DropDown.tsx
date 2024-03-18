import React, { useEffect, useState } from "react";
import {
  DropdownOnSearchChangeData,
  DropdownProps,
  Grid,
  Select,
  SemanticWIDTHS,
} from "semantic-ui-react";
import isEmpty from "lodash/isEmpty";

import "./dropdown.scss";

export interface DropDownProps {
  computer?: SemanticWIDTHS;
  tablet?: SemanticWIDTHS;
  mobile?: SemanticWIDTHS;
  placeholder?: string;
  labelName?: string;
  errorMessage?: string;
  customLabelText?: string;
  customGridMain?: string;
  customGridColumn?: string;
  customErrorText?: string;
  defaultValue?: any;
  handleChangeState?: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => void;
  onSearchChange?: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownOnSearchChangeData
  ) => void;
  currentData?: any;
  disabled?: boolean;
  validate?: boolean;
  required?: boolean;
  search?: boolean;
  loading?: boolean;
  fluid?: boolean;
  styles?: any;
}

export const DropDown: React.FC<DropDownProps> = ({
  computer = 16,
  tablet = 16,
  mobile = 16,
  placeholder,
  labelName,
  errorMessage,
  customLabelText = "",
  customGridMain = "",
  customGridColumn = "",
  customErrorText = "",
  defaultValue = "",
  handleChangeState,
  onSearchChange,
  currentData,
  disabled = false,
  validate,
  required,
  search = false,
  loading = false,
  fluid = false,
  styles = {},
}) => {
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <label className={`dropDownTextLabel ${customLabelText}`}>
        {labelName}
      </label>
      <Grid className={`${customGridMain}`}>
        <Grid.Column
          computer={computer}
          tablet={tablet}
          mobile={mobile}
          className={
            required && isEmpty(value) && validate
              ? `dropDownMainError ${customGridColumn}`
              : `dropDownMain ${customGridColumn}`
          }
        >
          <Select
            className="selectPadding"
            fluid={fluid}
            style={{ padding: "12px", ...styles }}
            placeholder={placeholder}
            options={currentData || []}
            value={value}
            onChange={handleChangeState}
            onSearchChange={onSearchChange}
            disabled={disabled}
            search={search}
            loading={loading}
            selection
            selectOnBlur={false}
          />
          {required && isEmpty(value) && validate && (
            <span className={`textDropDownError ${customErrorText}`}>
              {errorMessage}
            </span>
          )}
        </Grid.Column>
      </Grid>
      <br />
    </>
  );
};
