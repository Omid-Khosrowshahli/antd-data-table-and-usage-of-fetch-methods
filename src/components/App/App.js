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
  const [whichId, setWhichId] = useState(0);

  const handleNewData = () => {
    setIsModalVisible(true);
    setModalTitle("افزودن اطلاعات");
    setWhichModal({edit: false, delete: false, newData: true});
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
      modalTitle ={modalTitle} whichModal={whichModal} setData={setData} whichId={whichId} data={data}
      >
      </MyModal>
    </div>
  );
}

export default App;
