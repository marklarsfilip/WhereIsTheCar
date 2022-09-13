import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ProgressBar } from 'react-loader-spinner'

import readDB from '../api/readDB';
import addToDB from '../api/addToDB';
import removeFromDB from '../api/removeFromDB';

import ModalContent from '../modules/setTimeModal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '600px',
    },
};


Modal.setAppElement('#root');

const SetTimes = () => {

    const [loading, setLoading] = useState(true);
    const [pinnedItems, setPinnedItems] = useState([]);
    const [clientUpdated, setClientUpdated] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        readDB("set-times").then(result => {
            if (result.length) {
                setPinnedItems(result);
            }
            setLoading(false);
        })
    }, [clientUpdated])

    const openModal = () => {
        setIsOpen(true);
    }

    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const addSetTimeConfirmation = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const info = data.get('info');
        addToDB({ info: info }, "set-times")
        setClientUpdated(clientUpdated + 1)
        closeModal();
    }

    const removeDocument = (collection, docId) => {
        removeFromDB(collection, docId)
        setClientUpdated(clientUpdated + 1)
    }

    return (
        <>
            {
                loading ? (<ProgressBar
                    height="80"
                    width="80"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass="progress-bar-wrapper"
                    borderColor='#000'
                    barColor='#51E5FF'
                />) : (
                    <div className="flex flex-wrap p-3 flex-col">
                        <h2 className="text-xl font-bold">Stående tider</h2>
                        <p className="italic">då bilen (ofta) används eller kan behöva finnas tillgänglig..</p>
                        <ul className="mt-4 mb-3">
                            {pinnedItems.map((item) => {
                                return (
                                    <li className="relative flex justify-between mt-1 mb-2 p-3 bg-[#1b1b1b] text-white" key={item.id}>
                                        <span className="mr-4">{item.data.info}</span>
                                        <button className="absolute text-2xl top-[0px] right-[10px] text-[#d41730]" type="button" onClick={() => removeDocument("set-times", item.id)}>×</button>
                                    </li>
                                )
                            })}
                        </ul>
                        <button className="underline hover:text-[#3D9970]" type="button" onClick={openModal}>Lägg till fler</button>

                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Lägg till stående tid"
                        >
                            <ModalContent closeModal={closeModal} confirm={addSetTimeConfirmation} />
                        </Modal>
                    </div>
                )}
        </>
    )
}

export default SetTimes;