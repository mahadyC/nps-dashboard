import { Modal, Button} from 'react-bootstrap';

export default function InfoModal(props){
    return(
        <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.modalBody}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    );
}