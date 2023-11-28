import React, { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
// import PropTypes from 'prop-types';
// import { NO_OP } from '@tekion/tap-components/constants/Constants';
import style from './Attachment.module.scss';
import UploadAttachment from './UploadAttachment/UploadAttachment';

export default function Attachment() {
  const [files, setFiles] = useState([]);
  // const [disableSubmit, setDisableSubmit] = useState(false);

  const uploadRef = useRef();

  const passRef = (innerRef) => {
    uploadRef.current = innerRef;
  };
  const onChangeFile = (file) => {
    console.log(file);
    flushSync(() => {
      setFiles(file);
    });
  };

  return (
    <div className={style.attachment_container}>
      <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Attachments</h3>
      <UploadAttachment
        files={files}
        passRef={passRef}
        updateFiles={onChangeFile}
        // onChangeUploadStatus={onChangeUploadStatus}
      />
    </div>
  );
}

Attachment.propTypes = {
};

Attachment.defaultProps = {
};
