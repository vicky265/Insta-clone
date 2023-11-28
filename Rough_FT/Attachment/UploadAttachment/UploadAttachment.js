import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import PropTypes from 'prop-types';
import { Upload } from 'antd';
import Tooltip from 'tcomponents/atoms/tooltip';
import FontIcon from 'tcomponents/atoms/FontIcon';
import { getCookie } from 'utils/helpers';
import { NO_OP } from '@tekion/tap-components/constants/Constants';
import { toaster } from '@tekion/tap-components/v2/molecules/NotificationWrapper';
import { beforeUpload as beforeUploads } from './UploadAttachmentHelper';
import style from '../Attachment.module.scss';

const UploadAttachment = ({
  files, updateFiles, taskId, onChangeUploadStatus, groupId, actions, beforeUpload: parentBeforeUpload, passRef,
}) => {
  useEffect(() => {
    passRef(innerRef);
  }, [innerRef]);

  const [fileList, setFileList] = useState([]);
  const innerRef = useRef(null);
  const actionUrl = `${process.env.BASE_URL}/tapapi/tap_document_mgmt/public/v1/tasks/${taskId}/attachments`;
  const props = {
    action: actionUrl,
    multiple: true,
    listType: 'picture',
    headers: { email: getCookie('email'), 'tap-api-token': getCookie('access_token') },
    showUploadList: false,
    data: { taskId, isDeletable: false },
    onChange: (info) => {
      console.log("files ",files);
      const newFiles = info.file;
      const fileIndex = newFiles.findIndex(file => file.tempId === info.file.uid);
      if (fileIndex > -1) {
        newFiles[fileIndex] = { ...newFiles[fileIndex], percent: Math.round(info.file.percent) };
      } else {
        const {
          url, name, uid, percent,
        } = info.file;
        newFiles.push({
          tempId: uid, url, name, percent: Math.round(percent), file: info.file,
        });
      }
      if (info.file.status === 'uploading') {
        onChangeUploadStatus('in-progress');
      } else if (info.file.status === 'done') {
        onChangeUploadStatus('done');
        const { link: url, id } = info.file.response;
        const { name } = info.file;
        const doneIndex = newFiles.findIndex(file => file.tempId === info.file.uid);
        newFiles[doneIndex] = { name, url, id };
        if (groupId) {
          actions.addDraftComments({
            groupId,
            addOnlyAttachments: true,
            files: [{
              name, url, id,
            }],
          });
        }
       
        toaster('success', `${info.file.name}  ${__('file uploaded successfully')}`);
      } else if (info.file.status === 'error') {
        toaster('error', `${info.file.name} ${__('file upload failed')}`);
      }
      updateFiles(newFiles);
      console.log("check2",newFiles);
      flushSync(() => {
        setFileList(info.fileList);
      });
    },
  };

  return (
    <>
      <Upload
        {...props}
        ref={innerRef}
        // beforeUpload={beforeUpload}
        fileList={fileList}
      >
        <Tooltip className={style.attaches} placement="right" title={__('Attach a file')}>
          <FontIcon>icon-attach</FontIcon>
          <p>Attach</p>
        </Tooltip>
      </Upload>
    </>
  );
};

UploadAttachment.propTypes = {
  files: PropTypes.string.isRequired,
  updateFiles: PropTypes.func.isRequired,
  taskId: PropTypes.number.isRequired,
  onChangeUploadStatus: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  beforeUpload: PropTypes.func,
  passRef: PropTypes.func,
};

UploadAttachment.defaultProps = {
  beforeUpload: NO_OP,
  passRef: NO_OP,
};

export default UploadAttachment;
