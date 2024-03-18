import React from "react";
import { CustomButton } from "../button/Button";

import './mainBottomButton.scss'
import useWindowDimensions from "../../hooks/windowsSize";

const MainBottomButtonView = ({
  customHeight = null,
  cancelButton = () => {},
  cancelStatus = false,
  deleteStatus = false,
  saveButtonStatus= false,
  deleteButton = () => {},
  saveButton = () => {},
  cancel='Cancel',
  saveTitle="Save",
  type="button",
  saveDisable=false
}: any) => {
  return (
    <div
      className="mainBottomView"
    >
      <div className="modalBottomRight">
        {cancelStatus && (
          <CustomButton
            theme="green"
            buttonOutLine={true}
            title={cancel}
            onClick={() => cancelButton()}
          />
        )}

        {deleteStatus && (
          <CustomButton
            theme="red"
            icon={"archive"}
            customColumnStyle={"cardInsertSaveOther"}
            onClick={() => {
                deleteButton();
            }}
            buttonOutLine={true}
          />
        )}
      </div>
      <div className="modalBottomLeft">
        {saveButtonStatus && (
          <CustomButton
            theme="green"
            title={saveTitle}
            onClick={() => saveButton()}
            type={type}
            disabled={saveDisable}
          />
        )}
      </div>
    </div>
  );
};

export default MainBottomButtonView;
