import React, { useContext, useState } from 'react';
import IconAsBtn from 'tcomponents/atoms/iconAsBtn';
import PropTypes from 'prop-types';
import { EMPTY_STRING, EMPTY_OBJECT } from '@tekion/tekion-base/app.constants';
import { Modal } from 'antd';
// import { DetailContext } from '../../../pages/Details/context/Detail.context';
import style from '../attachmentFT.module.scss';

const getBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export const AttachmentViewer = ({ file_name, attachment }) => {
  // const { onAction } = useContext(DetailContext);
  const [show, setShow] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  // const attachmentClickHandler = () => {
  // onAction({ type: 'PRESIGNED', payload: attachment_id });
  // };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 10)
    );
  };

  const removeHandler = () => {
    // onAction({ type: 'REMOVE_ATTACHMENT', payload: attachment_id });
  };
  const handleCancel = () => setPreviewOpen(false);

  return (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={style.attachmentBtn}
      onClick={handlePreview}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {file_name}
      {/* {attachment} */}
      <IconAsBtn
        size="M"
        style={{ visibility: show ? 'visible' : 'hidden', color: 'red' }}
        onClick={removeHandler}
      >
        icon-trash
      </IconAsBtn>
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
  );
};

AttachmentViewer.propTypes = {
  // attachment_id: PropTypes.number,
  attachment: PropTypes.object,
  file_name: PropTypes.string,
};
AttachmentViewer.defaultProps = {
  // attachment_id: null,
  attachment: EMPTY_OBJECT,
  file_name: EMPTY_STRING,
};
