import React, { useState } from 'react';
// import { StarOutlined } from '@ant-design/icons';
import FontIcon from 'tcomponents/atoms/FontIcon';
import { Modal, Upload } from 'antd';
import style from './attachments.module.scss';
import './attachments.css';

const getBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export default function Attachments() {
  const props = {
    multiple: true,
    action: 'https://localhost:8000/fileUpload',
    listType: 'picture',
    maxCount: 8,
    showUploadList: {
      // showDownloadIcon: true,
      // showPreviewIcon: true,
      // downloadIcon: 'Download',
      showRemoveIcon: false,
      // removeIcon: <StarOutlined onClick={e => console.log(e, 'custom removeIcon event')} />,
    },
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };
  const handleCancel = () => setPreviewOpen(false);
  return (
    <>
      <div className={style.attachmentContainer}>
        <p style={{ fontWeight: 600 }}>Attachments</p>
        <Upload {...props} showDownloadIcon className={ style.thumbImages} onPreview={handlePreview}>
          <div className={style.attaches}>
            <FontIcon>icon-attach</FontIcon>
            <p>Attach</p>
          </div>
        </Upload>
        <Modal
          footer={null}
          open={previewOpen}
          title={previewTitle}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            src={previewImage}
            style={{
              width: '100%',
            }}
          />
        </Modal>
      </div>
    </>
  );
}
