import './MyModal.css';
import { Modal } from 'antd';

const MyModal = ({children, isModalVisible, setIsModalVisible, modalTitle, whichModal, setData , newData, setNewData, whichId}) => {
  const getModifiedData = async () => {
    const response = await fetch(`http://localhost:3000/posts`);
    const data = await response.json();
    setData(data);
  }
  
  const handleOk = (id) => {
    if(whichModal.delete) {
      (async () => {
        await fetch(`http://localhost:3000/posts/${id}`, {
          method: 'DELETE',
          headers: {'content-type': 'application/json'},
          body: null
        });
      })();

      getModifiedData();
    }

    if(whichModal.newData) {
      (async () => {
        await fetch(`http://localhost:3000/posts`, {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(newData)
        });
        
        setNewData({id:"", userId: "", title: "", body: ""});
      })();

      getModifiedData();
    }

    if(whichModal.edit) {
      newData.id = whichId;
      
      (async () => {
        await fetch(`http://localhost:3000/posts/${id}`, {
          method: 'PUT',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(newData)
        });

        setNewData({id:"", userId: "", title: "", body: ""});
      })();

      getModifiedData();
    }
    
    setIsModalVisible(false);
  }

  const handleCancle = () => {
    setIsModalVisible(false);
  }
  
  return (
    <Modal title={modalTitle} visible={isModalVisible} onOk={() => handleOk(whichId)} onCancel={handleCancle}>
      {children}
    </Modal>
  );
}

export default MyModal;