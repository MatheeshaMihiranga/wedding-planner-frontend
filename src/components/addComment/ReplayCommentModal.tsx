import { useEffect, useMemo, useState } from "react";
import { Button, Modal, Grid, Rating } from "semantic-ui-react";
import { InputTextArea } from "../InputText/InputTextArea";
import { useForm } from "react-hook-form";
import { useDispatchApp } from "../../store/Store";
import { addComment, updateComment } from "../../store/action/supplier";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { isEmpty } from "lodash";
import { errorView } from "../../helpers/ErrorHandler";

const ReplayCommentModal = ({
  viewModal = false,
  closeModal = () => {},
  cancel = () => {},
  size = "large",
  title = "",
  subTitle = "",
  reviewData = {},
}: any) => {
  const dispatch = useDispatchApp();
  const [starValue, setStarValue] = useState(0);
  const { supplierData } = useSelector((state: RootState) => state.supplier);
  const { userDetails } = useSelector((state: RootState) => state.auth);

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

  const submitData = async (data: any) => {
    const commentData = {
      parentId: supplierData.reviewId._id,
      reviewId: reviewData._id,
      data: data,
    };
    if (isEmpty(userDetails._id)) return errorView("Something went wrong");
    let res = await dispatch(updateComment(commentData));
    if (res) {
      cancel();
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
                defaultRating={reviewData?.reviewCount || 0}
                maxRating={5}
                onRate={handleRate}
                disabled
              />
            </Grid.Column>
            <Grid.Column computer={16} className="paddingRemoveTop">
              <p className="commentView">{reviewData?.userReview}</p>
            </Grid.Column>
            <Grid.Column computer={16} className="paddingRemoveTop">
              <InputTextArea
                register={registerPackage}
                errors={errors.supplierReview}
                required={true}
                labelName={"Reply"}
                placeholder="Comment"
                name="supplierReview"
                errorMessage="Please add review"
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

export default ReplayCommentModal;
