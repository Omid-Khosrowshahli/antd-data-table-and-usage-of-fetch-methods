import { useEffect } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import './DataTable.css';

const DataTable = ({setIsModalVisible, setModalTitle, setWhichModal, data, setData, setWhichId}) => {
  const loadData = async () => {
    const response = await fetch('http://localhost:3000/posts');
    const data = await response.json();

    setData(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  const openEditModal = (record) => {
    setIsModalVisible(true);
    setModalTitle("ویرایش اطلاعات");
    setWhichModal({edit: true, delete: false, newData: false});
    setWhichId(record);
  }

  const openDeleteModal = (record) => {
    setIsModalVisible(true);
    setModalTitle("آیا اطمینان دارید؟");
    setWhichModal({edit: false, delete: true, newData: false});
    setWhichId(record);
  }

  const columns = [
    {
      title: 'شناسه',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'شناسه کاربر',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: 'عنوان',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'متن',
      dataIndex: 'body',
      key: 'body'
    },
    {
      title: 'عملیات',
      dataIndex: 'id',
      key: 'operations',
      render: (record) =>
      <div className='operations'>
        <span onClick={() => openEditModal(record)}><i class="material-icons edit">edit</i></span>
        <span onClick={() => openDeleteModal(record)}><i class="material-icons delete">delete</i></span>
      </div>
    }
  ];

  return(
    <Table dataSource={data} columns={columns} />
  );
}

export default DataTable;