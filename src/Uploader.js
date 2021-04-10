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

    await fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76',{
      method: 'POST', 
      body: data, 
    }).then(res=>{
      setData([])
      setUploading(false)
      console.log('success',data)
      message.success('upload successfully.')
    }).catch(err=>{
      setUploading(false)
      console.log('error')
      message.error('upload failed.')
    })
  }
  const onRemove= file => {
    const index = data.indexOf(file)
    const newFileList = data.slice()
    const newData = newFileList.splice(index,1)
    setData(newData);
    
    console.log(data);
  }
  const beforeUpload= file => {
    setData([...data,file])
    console.log('臨時上傳',typeof file,file)
    return false;
  }
  return (
    <>
      <Upload onRemove={onRemove} beforeUpload={beforeUpload}>
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