import React from 'react';
// import { flushSync } from 'react-dom';
// import PropTypes from 'prop-types';
// import { NO_OP } from '@tekion/tap-components/constants/Constants';
import style from './Attachment.module.scss';
import UploadAttachment from './UploadAttachment/UploadAttachment';

export default function Attachment() {
  return (
    <div className={style.attachment_container}>
      <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Attachments</h3>
      <UploadAttachment />
    </div>
  );
}

Attachment.propTypes = {
};

Attachment.defaultProps = {
};
