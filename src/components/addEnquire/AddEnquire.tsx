import { useEffect, useMemo, useState } from "react";
import { Button, Modal, Grid, Rating } from "semantic-ui-react";
import { InputTextArea } from "../InputText/InputTextArea";
import { useForm } from "react-hook-form";
import { useDispatchApp } from "../../store/Store";
import {
  createEnquireForSupplier,
} from "../../store/action/supplier";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { isEmpty } from "lodash";
import DatePicker from "react-datepicker";
import { formatDate } from "../../utils/utils";
import { errorView } from "../../helpers/ErrorHandler";

const AddEnquire = ({
  viewModal = false,
  closeModal = () => {},
  cancel = () => {},
  size = "large",
  title = "",
  subTitle = "",
}: any) => {
  const dispatch = useDispatchApp();
  const [enquireData, setEnquireDate] = useState(formatDate(new Date()));
  const { supplierData } = useSelector((state: RootState) => state.supplier);
  const { userDetails } = useSelector((state: RootState) => state.auth);

  const {
    register: registerPackage,
    handleSubmit: handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setEnquireDate(formatDate(new Date()));
    reset();
  }, [viewModal]);

  const submitData = async (data: any) => {
    data.userId = userDetails?._id;
    data.date = enquireData;
    const enquireDetails = {
      parentId: supplierData.enquireId._id,
      data: data,
    };
    if (isEmpty(userDetails._id)) return errorView("Something went wrong");
    let res = await dispatch(createEnquireForSupplier(enquireDetails));
    if (res) {
      cancel();
    }
  };

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
            <Grid.Column computer={16} className="paddingRemoveTop supplierDatePicker">
              <p>Which date do you want to book</p>
              <DatePicker
                selected={new Date(enquireData)}
                onChange={(date: any) => {
                  let selectDate = formatDate(date);
                  setEnquireDate(selectDate)
                }}
                minDate={new Date()}
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

export default AddEnquire;
