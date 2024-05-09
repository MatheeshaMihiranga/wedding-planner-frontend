import { useEffect } from "react";
import { Button, Modal, Grid } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useDispatchApp } from "../../store/Store";
import { createNewBudgetCategory } from "../../store/action/supplier";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { InputText } from "../InputText/InputText";

const AddCategory = ({
  viewModal = false,
  cancel = () => {},
  size = "large",
  title = "",
  subTitle = "",
  id,
}: any) => {
  const dispatch = useDispatchApp();
  const { userDetails } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit: handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset();
  }, [viewModal]);

  const submitData = async (data: any) => {
    data.expenses = [];
    const createNewBudgetCategoryData = {
      id: id,
      budgetId: userDetails.budgetId,
      data: data,
    };
    await dispatch(createNewBudgetCategory(createNewBudgetCategoryData));
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
              errors={errors.categoryName}
              required={true}
              labelName={"Category"}
              placeholder="Category"
              name="categoryName"
              errorMessage={errors.categoryName ? 
                (errors.categoryName.type === "required" ? "Please enter a categoryName " : "Please enter only letters and spaces") : ""}
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

export default AddCategory;
