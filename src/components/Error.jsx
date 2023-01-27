import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../slices/breedsSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Error.css";

export default function Error() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.breeds);

  const handleClose = () => {
    dispatch(closeModal());
  }

  return (
    <div className="error-button">
      <Modal show={error} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaExclamationTriangle />
            &nbsp;Woof Invalid Action Woof
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Oops! You must have at least one breed in your table.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
