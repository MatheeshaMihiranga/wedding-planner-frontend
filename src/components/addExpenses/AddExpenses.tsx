import { useEffect, useMemo } from "react";
import { Button, Modal, Grid } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useDispatchApp } from "../../store/Store";
import {
  createNewCategoryExpenses,
  updateCategoryExpenses,
} from "../../store/action/supplier";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

import "./addExpenses.scss";
import { InputText } from "../InputText/InputText";
import { InputNumber } from "../InputText/InputNumber";

const AddExpenses = ({
  viewModal = false,
  cancel = () => {},
  size = "large",
  title = "",
  subTitle = "",
  currentExpenses,
  categoryId,
  id,
}: any) => {
  const dispatch = useDispatchApp();
  const { userDetails } = useSelector((state: RootState) => state.auth);

  //handle user password reset input
  const values = useMemo(() => {
    return {
      description: currentExpenses?.description || "",
      cost: currentExpenses?.cost || 0,
      notes: currentExpenses?.notes || "",
    };
  }, [currentExpenses]);

  const {
    register,
    control,
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
    if (currentExpenses?._id || false) {
      const categoryExpenses = {
        id: id,
        budgetId: userDetails.budgetId,
        categoryId: categoryId,
        expensesId: currentExpenses?._id,
        data: data,
      };
      await dispatch(updateCategoryExpenses(categoryExpenses));
    } else {
      const categoryExpenses = {
        id: id,
        budgetId: userDetails.budgetId,
        categoryId: categoryId,
        data: data,
      };
      await dispatch(createNewCategoryExpenses(categoryExpenses));
    }

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
              <InputText
                register={register}
                errors={errors.description}
                required={true}
                labelName={"Description"}
                placeholder="Description"
                name="description"
                errorMessage="Please enter description"
              />
            </Grid.Column>
            <Grid.Column
              computer={16}
              className="paddingRemoveTop supplierDatePicker"
            >
              <InputNumber
                control={control}
                errors={errors.cost}
                required={true}
                labelName={"Cost"}
                placeholder="Cost"
                name="cost"
                errorMessage="Please enter cost"
              />
            </Grid.Column>
            <Grid.Column
              computer={16}
              className="paddingRemoveTop supplierDatePicker"
            >
              <InputText
                register={register}
                errors={errors.notes}
                required={true}
                labelName={"Note"}
                placeholder="Note"
                name="notes"
                errorMessage="Please enter notes"
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

export default AddExpenses;
