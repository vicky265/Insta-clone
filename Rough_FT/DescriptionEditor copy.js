import React, { useState } from 'react';
import produce from 'immer';
import PropTypes from 'prop-types';
import { flushSync } from 'react-dom';

import { EMPTY_ARRAY, EMPTY_OBJECT } from '@tekion/tekion-base/app.constants';
import Editor from '../../../../../../atoms/Editor';
import { parseFeatureLink } from '../../../../../../utils/LinkUtils';
import { validateUploadFile } from '../../../../../../utils/fileUtils';
import { deleteAttachments, uploadAttachments } from '../../../../../../services/Comments.service';
import { getCancelTokenSource } from '../../../../../../services/http';

const DescriptionEditor = (props) => {
  const {
    content,
    // previousAttachments,
    updateAttachmentIds,
    updateEditorFiles,
    onChange,
    onSubmit,
  } = props;

  const { featureId } = parseFeatureLink();
  // const [, setFileList] = useState(EMPTY_ARRAY);

  // const updateFileList = (updateType, tempId, data) => {
  //   flushSync(() => setFileList(produce((draft) => {
  //     const fileIndex = draft.findIndex(item => item.tempId === tempId);
  //     switch (updateType) {
  //       case 'upload_complete':
  //         draft.splice(fileIndex, 1);
  //         break;
  //       case 'upload_progress':
  //         if (fileIndex > -1) {
  //           draft[fileIndex].percent = Math.round(data?.percent);
  //         } else {
  //           const { percent = 0, file } = data;
  //           const { url, name, cancelTokenSource } = file;
  //           draft.push({
  //             tempId, percent: Math.round(percent), file, name, url, cancelTokenSource,
  //           });
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   })));
  // };

  const onUploadSuccess = (response) => {
    const { name, link, id } = response?.data || EMPTY_OBJECT;
    // updateFileList('upload_complete', tempFile?.tempId);
    const s3Attachment = {
      name,
      url: link,
      id,
      thumbUrl: link,
      link,
    };
    updateEditorFiles(s3Attachment, 'add');
    updateAttachmentIds(id, 'add');
    return (s3Attachment);
  };

  const processUpload = (file) => {
    const formData = new FormData();
    // let tempFile = {};
    const cancelTokenSource = getCancelTokenSource();
    const isValidFile = validateUploadFile(file);
    if (!isValidFile) return false;
    formData.append('file', file);
    formData.append('isDeletable', true);
    formData.append('resource', 'description');
    formData.append('resourceId', '1');
    // tempFile = {
    //   tempId: Math.random().toString(36).substring(7),
    //   name: file.name,
    //   percent: 0,
    //   cancelTokenSource,
    // };
    const axiosConfig = {
      // onUploadProgress: (progressEvent) => {
      //   const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   updateFileList('upload_progress', tempFile?.tempId, { file: tempFile, percent });
      // },
      cancelToken: cancelTokenSource.token,
    };
    return uploadAttachments(featureId, formData, axiosConfig).then(response => onUploadSuccess(response));
  };

  const updateAttachment = {
    inline: true,
    onUpload: (files, callback) => {
      if (files && files.length > 0) {
        const promises = files.map(file => processUpload(file));
        Promise.all(promises).then((response) => {
          callback(response);
        });
      }
    },
  };

  // const onDeleteFile = (deletedFile, e) => {
  //   if (e) {
  //     e.preventDefault();
  //   }
  //   if (deletedFile.id && !previousAttachments.find(prevId => prevId === deletedFile.id)) {
  //     deleteAttachments({
  //       currentAttachments: [deletedFile.id],
  //     });
  //   }
  //   updateAttachmentIds(deletedFile.id, 'remove');
  //   updateEditorFiles(deletedFile, 'remove');
  // };

  return (
    <div style={{ padding: '1rem' }}>
      <Editor
        allowInlineImage
        allowUploads
        defaultValue={content}
        // files={fileList.concat(editorFiles)}
        pluginOptions={{
          image: updateAttachment,
          media: updateAttachment,
        }}
        plugins={['link', 'list', 'mention', 'image']}
        onBlur={onSubmit}
        onChange={onChange}
        // onDeleteFile={onDeleteFile}
      />
    </div>
  );
};
export default DescriptionEditor;

DescriptionEditor.propTypes = {
  content: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  previousAttachments: PropTypes.array,
  updateAttachmentIds: PropTypes.array,
  updateEditorFiles: PropTypes.array,
};

DescriptionEditor.defaultProps = {
  content: EMPTY_OBJECT,
  previousAttachments: EMPTY_ARRAY,
  updateAttachmentIds: EMPTY_ARRAY,
  updateEditorFiles: EMPTY_ARRAY,
};
