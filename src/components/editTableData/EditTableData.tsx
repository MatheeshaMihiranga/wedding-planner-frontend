import { useEffect, useMemo } from "react";
import { Button, Modal, Grid } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useDispatchApp } from "../../store/Store";
import {
  createNewBudgetCategory,
  createNewTable,
  createNewTableGuest,
  updateTable,
} from "../../store/action/supplier";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { InputText } from "../InputText/InputText";

const EditTableData = ({
  viewModal = false,
  cancel = () => {},
  size = "large",
  title = "",
  subTitle = "",
  tableData,
  id,
}: any) => {
  const dispatch = useDispatchApp();
  const { userDetails } = useSelector((state: RootState) => state.auth);

  //handle user password reset input
  const values = useMemo(() => {
    return {
      tableName: tableData?.tableName || "",
    };
  }, [tableData]);

  const {
    register,
    handleSubmit: handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: values,
    values: values,
  });

  useEffect(() => {
    reset();
  }, [viewModal]);

  const submitData = async (data: any) => {
    data.expenses = [];
    const updateTableData = {
      id: id,
      guestId: userDetails.guestId,
      tableId: tableData._id,
      data: data,
    };
    await dispatch(updateTable(updateTableData));
    cancel();
  };

  return (
    <>
      <Modal
        centered={false}
        size={size}
        open={viewModal}
        onClose={() => cancel()}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <p className="subTitleModalView">{subTitle}</p>
          <Grid>
            <Grid.Column
              computer={16}
              className="paddingRemoveTop supplierDatePicker"
            >
              {/* <InputText
                register={register}
                errors={errors.tableName}
                required={true}
                labelName={"Table"}
                placeholder="Table"
                name="tableName"
                errorMessage="Please enter table name"
              /> */}

              <InputText
                register={register}
                errors={errors.tableName}
                required={true}
                labelName={"Table"}
                placeholder="Table"
                name="tableName"
                errorMessage={errors.tableName ? 
                  (errors.tableName.type === "required" ? "Please enter a Table Name " : "Please enter only letters and spaces") : ""}
                validateHandle={(value: string) => {
                  if (value.trim() === "") {
                    return false;
                  }
                  return /^[A-Za-z\s]+$/.test(value);
                }}
              />
            </Grid.Column>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => cancel()}>
            Cancel
          </Button>
          <Button positive onClick={handleSubmit(submitData)}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default EditTableData;
