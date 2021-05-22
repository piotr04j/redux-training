import { createPortal } from 'react-dom';
import './Modal.css'
import ModalContent from './ModalContent';

const Modal = () => {
    const modalRoot = document.getElementById('modal');
    if(modalRoot) {
        return createPortal(
            <>
                <ModalContent />
            </>, modalRoot);
    }

    return null
}

export default Modal
