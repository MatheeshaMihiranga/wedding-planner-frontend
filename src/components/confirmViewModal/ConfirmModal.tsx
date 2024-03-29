import { Button, Modal } from "semantic-ui-react";
import "./confirmModal.scss";

const ConfirmModal = ({
  viewModal = false,
  closeModal = () => {},
  cancel = () => {},
  approve = () => {},
  size = "mini",
  title = "",
  subTitle = "",
}: any) => {
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
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => cancel()}>
            No
          </Button>
          <Button positive onClick={() => approve()}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ConfirmModal;
