import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-loader-spinner'

import readDB from '../api/readDB';
import addToDB from '../api/addToDB';
import Modal from 'react-modal';
import ModalContent from '../modules/rentModal';
import CarStatus from '../modules/CarStatus'
import SetTimes from '../modules/SetTimes'

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

const Start = () => {

  const [loading, setLoading] = useState(true);
  const [clientUpdated, setClientUpdated] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [itemToDisplay, setItemToDisplay] = useState({ available: true });

  useEffect(() => {
    readDB("car-rents").then(result => {
      if (result.length) {
        const filteredData = result.map((item) => item.data);
        setItems(filteredData.sort((a, b) => parseInt(a.dateTime) - parseInt(b.dateTime)));
      }
      setLoading(false);
    })
  }, [clientUpdated])

  useEffect(() => {
    if (items.length) {
      setItemToDisplay(items.slice(-1)[0])
    }
  }, [items])

  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const useCarConfirmation = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const user = data.get('user');
    const timeForReturn = data.get('timeForReturn');
    const comment = data.get('comment');
    addToDB({ available: false, user: user, estimatedReturn: timeForReturn, comment: comment, dateTime: new Date().getTime() }, "car-rents")
    setClientUpdated(clientUpdated + 1)
    closeModal();
  }

  const registerReturn = (e) => {
    addToDB({ available: true, dateTime: new Date().getTime() }, "car-rents")
    setClientUpdated(clientUpdated + 1)
  }

  return (
    <div className="grow flex flex-wrap p-3 flex-col">
      {loading ? (<ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor='#000'
        barColor='#51E5FF'
      />) : (
        <>
          <div className="flex flex-wrap p-5 basis-1/4 bg-[#1b1b1b] mb-5">
            <CarStatus status={itemToDisplay} />
            {itemToDisplay.available ? (
              <button className="bg-[#0d730d] hover:bg-[#084508 text-white p-5" type="button" onClick={openModal}>Använd bilen</button>
            ) : (
              <button className="w-full bg-[#d41730] hover:bg-[#730b19] text-white p-5 mt-4" type="button" onClick={registerReturn}>KLAR MED BILEN?</button>
            )
            }
          </div>
          <div className="flex flex-wrap p-5 basis-1/4 bg-[#ececec]">
            <SetTimes />
          </div>
        </>
      )}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Låna bil"
      >
        <ModalContent closeModal={closeModal} useCarConfirmation={useCarConfirmation} />
      </Modal>

    </div>
  );
}

export default Start;
