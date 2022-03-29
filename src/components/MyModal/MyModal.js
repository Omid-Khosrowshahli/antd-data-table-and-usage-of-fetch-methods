import './MyModal.css';
import { Modal } from 'antd';

const MyModal = ({children, isModalVisible, setIsModalVisible, modalTitle, whichModal, setData , newData, setNewData, whichId}) => {
  const handleOk = (id) => {
    if(whichModal.delete) {
      (async () => {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
          method: 'DELETE',
          headers: {'content-type': 'application/json'},
          body: null
        });
        const data = await response.json();
        setData(data);
      })();
    }

    if(whichModal.newData) {
      (async () => {
        const response = await fetch(`http://localhost:3000/posts`, {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(newData)
        });
        const data = await response.json();
        setData(data);
        setNewData({id:"", userId: "", title: "", body: ""});
      })();
    }

    if(whichModal.edit) {
      (async () => {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
          method: 'PUT',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(newData)
        });
        const data = await response.json();
        setData(data);
        setNewData({id:"", userId: "", title: "", body: ""});
      })();
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