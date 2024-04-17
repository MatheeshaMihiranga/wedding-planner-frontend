import { useEffect, useState } from "react";
import { Button, Modal, Grid, Rating } from "semantic-ui-react";
import { InputTextArea } from "../InputText/InputTextArea";
import { useForm } from "react-hook-form";
import { useDispatchApp } from "../../store/Store";
import { addComment } from "../../store/action/supplier";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { isEmpty } from "lodash";
import { errorView } from "../../helpers/ErrorHandler";

const AddCommentModal = ({
  viewModal = false,
  closeModal = () => {},
  cancel = () => {},
  size = "large",
  title = "",
  subTitle = "",
}: any) => {
  const dispatch = useDispatchApp();
  const [starValue, setStarValue] = useState(0);
  const {supplierData} = useSelector((state:RootState)=>state.supplier)
  const {userDetails} = useSelector((state:RootState)=>state.auth)

  const {
    register: registerPackage,
    handleSubmit: handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setStarValue(0);
    reset();
  }, [viewModal]);  

  const submitData = async(data: any) => {
    data.userName = userDetails.name
    data.userId = userDetails._id
    data.reviewCount = starValue
    data.supplierReview = ""
    const commentData ={
        reviewId:supplierData.reviewId._id,
        supplierId:supplierData._id,
        data:data
    }    
    if(isEmpty(userDetails._id)) return errorView("Something went wrong")
    let res =  await dispatch(addComment(commentData));
    if(res){
        cancel()
    }
  };

  const handleRate = (e: any, { rating, maxRating }: any) =>
    setStarValue(rating);

  return (
    <>
      <Modal
        centered={false}
        size={size}
        open={viewModal}
        onClose={() => closeModal()}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <p className="subTitleModalView">{subTitle}</p>
          <Grid>
            <Grid.Column computer={16}>
              <Rating
                size="huge"
                icon="star"
                defaultRating={starValue}
                maxRating={5}
                onRate={handleRate}
              />
            </Grid.Column>
            <Grid.Column computer={16}>
              <InputTextArea
                register={registerPackage}
                errors={errors.userReview}
                required={true}
                labelName={"Comment"}
                placeholder="Comment"
                name="userReview"
                errorMessage="Please add comment"
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

export default AddCommentModal;
