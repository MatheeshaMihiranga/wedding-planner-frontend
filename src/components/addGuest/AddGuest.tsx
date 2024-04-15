import { useEffect, useMemo, useState } from "react";
import { Button, Modal, Grid } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useDispatchApp } from "../../store/Store";
import {
  createNewTableGuest,
  updateTableGuest,
} from "../../store/action/supplier";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

import "./addGuest.scss";
import { InputText } from "../InputText/InputText";
import { InputNumber } from "../InputText/InputNumber";
import { DropDown } from "../selectDropDown/DropDown";
import { GuestStatus } from "../../config/constants";

const AddGuest = ({
  viewModal = false,
  cancel = () => {},
  size = "large",
  title = "",
  subTitle = "",
  currentGuest,
  tableId,
  id,
}: any) => {
  const dispatch = useDispatchApp();
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const [guestStatus, setGuestStatus] = useState("Awaiting");

  //handle user password reset input
  const values = useMemo(() => {
    setGuestStatus(currentGuest?.status || "Awaiting");
    return {
      name: currentGuest?.name || "",
      email: currentGuest?.email || "",
    };
  }, [currentGuest]);

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
    data.status = guestStatus;
    if (currentGuest?._id || false) {
      const guestDetails = {
        id: id,
        guestId: userDetails.guestId,
        tableId: tableId,
        guestDataId: currentGuest?._id,
        data: data,
      };
      await dispatch(updateTableGuest(guestDetails));
    } else {
      const guestDetails = {
        id: id,
        guestId: userDetails.guestId,
        tableId: tableId,
        data: data,
      };
      await dispatch(createNewTableGuest(guestDetails));
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
                errors={errors.name}
                required={true}
                labelName={"Name"}
                placeholder="Name"
                name="name"
                errorMessage="Please enter name"
              />
            </Grid.Column>
            <Grid.Column
              computer={16}
              className="paddingRemoveTop supplierDatePicker"
            >
              <InputText
                register={register}
                errors={errors.email}
                required={true}
                labelName={"Email"}
                placeholder="Email"
                name="email"
                errorMessage="Please enter email"
              />
            </Grid.Column>
            <Grid.Column
              computer={16}
              className="paddingRemoveTop supplierDatePicker"
            >
              <DropDown
                labelName="Status"
                placeholder="Status"
                defaultValue={guestStatus}
                currentData={GuestStatus}
                handleChangeState={(e: any, { value }: any) => {
                  setGuestStatus(value);
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

export default AddGuest;
