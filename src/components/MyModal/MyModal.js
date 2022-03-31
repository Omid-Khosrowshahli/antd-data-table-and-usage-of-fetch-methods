import './MyModal.css';
import { useState } from 'react';
import { Modal } from 'antd';

const MyModal = ({isModalVisible, setIsModalVisible, modalTitle, whichModal, data, setData , whichId}) => {
  const [newData, setNewData] = useState({id:"", userId: "", title: "", body: ""});
  const [isIdEntered, setIsIdEntered] = useState(false);
  const [message, setMessage] = useState(false);
  
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
      if(!isIdEntered) {
        setMessage(true);
        return;
      }
      else {
        setMessage(false);
      }

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

  const handleNewId = (id) => {
    const isIdUnique = data.map((item) => (
      id === item.id ? true : false
    ));

    if(isIdUnique.includes(true) || (!id.length))
    {
      setIsIdEntered(false);
      setMessage(true);
    }
    else {
      const dataWithNewInfo = {...newData, id};
      setNewData(dataWithNewInfo);
      setIsIdEntered(true);
      setMessage(false);
      }
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
    <Modal title={modalTitle} visible={isModalVisible} onOk={() => handleOk(whichId)} onCancel={handleCancle}>
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
          <input type='number' onChange={(event) => handleNewId(event.target.value)} />
          {message && <p style={{color: 'red'}}>Please enter a unique id</p>}
          <label>شناسه کاربر</label>
          <input type='text' onChange={(event) => handleNewUserId(event.target.value)} />
          <label>عنوان</label>
          <input type='text' onChange={(event) => handleNewTitle(event.target.value)} />
          <label>متن</label>
          <textarea onChange={(event) => handleNewBody(event.target.value)}></textarea>
        </div>}
    </Modal>
  );
}

export default MyModal;