import { useEffect, useState } from "react";
import { Button, Modal, Grid, Rating } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useDispatchApp } from "../../store/Store";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { InputText } from "../InputText/InputText";
import { DropDown } from "../selectDropDown/DropDown";
import { CheckListCategoryType, Status } from "../../config/constants";
import { createCheckListData } from "../../store/action/supplier";

const AddCheckList = ({
  viewModal = false,
  closeModal = () => {},
  cancel = () => {},
  size = "large",
  title = "",
  subTitle = "",
  userId
}: any) => {
  const dispatch = useDispatchApp();
  const [category, setCategory] = useState("Preparation");
  const [status, setStatus] = useState(false);
  const { userDetails } = useSelector((state: RootState) => state.auth);

  const {
    register: registerPackage,
    handleSubmit: handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setCategory("Preparation")
    setStatus(false)
    reset();
  }, [viewModal]);

  const submitData = async (data: any) => {
    data.category = category
    data.status = status
    const createNewCheckListDetails = {
      id:userDetails.checkListId,
      userId:userId,
      data:data
    }
    const res = await dispatch(createCheckListData(createNewCheckListDetails))
    if(res){
      cancel()
    }
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
            <Grid.Column computer={16}>
              <InputText
                register={registerPackage}
                errors={errors.userReview}
                required={true}
                labelName={"Name"}
                placeholder="Name"
                name="name"
                errorMessage="Please add name"
              />
            </Grid.Column>
            <Grid.Column computer={16}>
              <DropDown
                labelName="Category"
                placeholder="Category"
                defaultValue={category}
                currentData={CheckListCategoryType}
                handleChangeState={(e: any, { value }: any) => {
                  setCategory(value);
                }}
                search
                customGridColumn={"customGridColomnTyp"}
              />
            </Grid.Column>
            <Grid.Column computer={16}>
              <DropDown
                labelName="Status"
                placeholder="Status"
                defaultValue={status}
                currentData={Status}
                handleChangeState={(e: any, { value }: any) => {
                  setStatus(value);
                }}
                search
                customGridColumn={"customGridColomnTyp"}
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

export default AddCheckList;
