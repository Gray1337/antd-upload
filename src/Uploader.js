import React, { useState } from 'react'
import { Upload, Button,message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const Uploader = () =>{
  const [data, setData] = useState([])
  const [uploading, setUploading] = useState(false)
  const handleUpload =async() =>{
    const formData = new FormData();
    data.forEach(file => {
      formData.append('newImg', file);
    });
    
    setUploading(true)

    const uploadData =await fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76',{
      method: 'POST', 
      body: data, 
    })
    if(uploadData.status===200){
      setData([])
      setUploading(false)
      message.success('upload successfully')
    }else{
      setUploading(false)
      message.error('upload failed')
    }
    
  }
  const onRemove= (file) => {
    const index = data.indexOf(file)
    const newFileList = data.slice(0)
    const deletedItem = newFileList.splice(index,1)
    setData(newFileList);
    console.log('new',newFileList,'deletedItem',deletedItem);
  }
  const beforeUpload= (file) => {
    setData([...data,file])
    return false;
  }

  return (
    <>
      {console.log(data)}
      <Upload onRemove={onRemove} beforeUpload={beforeUpload} fileList={data}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={data.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
}



export default Uploader