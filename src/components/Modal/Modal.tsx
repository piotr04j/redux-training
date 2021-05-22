import { createPortal } from 'react-dom';
import './Modal.css'
import {Provider} from 'react-redux';
import store from '../../store/store';
import ModalContent from './ModalContent';

const Modal = () => {
    const modalRoot = document.getElementById('modal');
    if(modalRoot) {
        return createPortal(
            <Provider store={store}>
                <ModalContent />
            </Provider>, modalRoot);
    }

    return null
}

export default Modal
