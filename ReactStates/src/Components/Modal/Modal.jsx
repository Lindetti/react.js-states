import "../../Styles/Modal.scss";
const Modal = ({showModal, closeModal}) => {
const modalClassName = showModal ? "modal display-block" : " modal display-none";
    return  (
        <div className={modalClassName}>
        <div className="modal">
        <div className="modal-content">
        <p>Hello, im a modal</p>
         <div className="closeDiv">
            <div className="close-icon" onClick={closeModal}>
              <span className="close-x">&times;</span>
            </div>
          </div>
        </div>
        </div>
        </div>
    )
}

export default Modal;