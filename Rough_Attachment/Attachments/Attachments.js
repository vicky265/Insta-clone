import React, { useState, useRef } from 'react';

import { flushSync } from 'react-dom';
import Card from '../../../../atoms/Card/Card';
import UploadAttachment from './__molecules__/UploadAttachment/UploadAttachment';
import style from './Attachments.module.scss';
import { parseFeatureLink } from '../../../../utils/LinkUtils';

export default function Attachments() {
  const [, setDisableSubmit] = useState(false);
  const [files, setFiles] = useState([]);
  const uploadRef = useRef();
  const { featureId } = parseFeatureLink();

  const passRef = (innerRef) => {
    uploadRef.current = innerRef;
  };

  const onChangeUploadStatus = (status) => {
    setDisableSubmit(status === 'in-progress');
  };

  const onChangeFiles = (newFiles) => {
    flushSync(() => {
      setFiles(newFiles);
    });
  };


  return (
    <div>
      <Card
        body={(
          <UploadAttachment
            featureId={featureId}
            files={files}
            passRef={passRef}
            updateFiles={onChangeFiles}
            onChangeUploadStatus={onChangeUploadStatus}
          />
        )}
        header={__('Attachments')}
        headerClassName={style.attachments}
      />
    </div>
  );
}
