import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ModalContent = () => {
    const status = useSelector((state: RootState) => state.posts.status)
    const content = status === 'loading' ? (
        <div className='modal'>
            Loading...
        </div>
    ) : null;

    return (
        content
    )
}

export default ModalContent
