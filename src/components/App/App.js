import Button from '../Button/Button';
import { useState } from 'react';
import DataTable from '../DataTable/DataTable';
import MyModal from '../MyModal/MyModal';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [whichModal, setWhichModal] = useState({edit: false, delete: false, newData: false});
  const [newData, setNewData] = useState({id:"", userId: "", title: "", body: ""});
  const [whichId, setWhichId] = useState(null);

  const handleNewData = () => {
    setIsModalVisible(true);
    setModalTitle("افزودن اطلاعات");
    setWhichModal({edit: false, delete: false, newData: true});
  }

  const handleNewId = (id) => {
    const dataWithNewInfo = {...newData, id};
    setNewData(dataWithNewInfo);
  }

  const handleNewUserId = (userId) => {
    const dataWithNewInfo = {...newData, userId};
    setNewData(dataWithNewInfo);
  }

  const handleNewTitle = (title) => {
    const dataWithNewInfo = {...newData, title};
    setNewData(dataWithNewInfo);
  }

  const handleNewBody = (body) => {
    const dataWithNewInfo = {...newData, body};
    setNewData(dataWithNewInfo);
  }

  return (
    <div className="App">
      <Button handleClick={handleNewData}>افزودن اطلاعات جدید</Button>
      <DataTable
      data={data} setData={setData}
      isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
      setModalTitle={setModalTitle} setWhichModal={setWhichModal} setWhichId={setWhichId}
      />
      <MyModal
      isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
      modalTitle ={modalTitle} whichModal={whichModal} setData={setData}
      setNewData={setNewData} newData={newData} whichId={whichId}
      >
        {whichModal.delete && <p>در صورت تایید، اطلاعات به طور دائم حدف می شوند</p>}

        {whichModal.edit &&
        <div className='edit-modal'>
          <label>شناسه کاربر</label>
          <input type='text' onChange={(event) => handleNewUserId(event.target.value)} />
          <label>عنوان</label>
          <input type='text' onChange={(event) => handleNewTitle(event.target.value)} />
          <label>متن</label>
          <textarea onChange={(event) => handleNewBody(event.target.value)}></textarea>
        </div>}

        {whichModal.newData &&
          <div className='newData-modal'>
            <label>شناسه</label>
            <input type='text' onChange={(event) => handleNewId(event.target.value)} />
            <label>شناسه کاربر</label>
            <input type='text' onChange={(event) => handleNewUserId(event.target.value)} />
            <label>عنوان</label>
            <input type='text' onChange={(event) => handleNewTitle(event.target.value)} />
            <label>متن</label>
            <textarea onChange={(event) => handleNewBody(event.target.value)}></textarea>
          </div>}
      </MyModal>
    </div>
  );
}

export default App;
