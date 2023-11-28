import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';

import { flushSync } from 'react-dom';
import PropTypes from 'prop-types';
import FontIcon from '@tekion/tekion-components/src/atoms/FontIcon';
import Tooltip from 'tcomponents/atoms/tooltip';
import AttachmentList from '@tekion/tap-components/atoms/Attachments';

import { Upload } from 'antd';
import { toaster } from '@tekion/tap-components/v2/molecules/NotificationWrapper';
import { getCookie } from 'utils/helpers';
import { NO_OP } from '@tekion/tap-components/constants/Constants';
import { isEmpty } from '@tekion/tap-components/utils/helper';
import { beforeUpload as beforeUploads, checkThumbnail } from './UploadAttachmentHelper';
import { getThumbNail } from '../AttachmentPreview/AttachmentPreviewHelper';
import PreviewModal from '../AttachmentPreview/AttachmentPreviewModal';

import style from './uploadattachment.module.scss';


export default function UploadAttachment({
  files, featureId, onChangeUploadStatus, updateFiles, beforeUpload: parentBeforeUpload, passRef,
}) {
  useEffect(() => {
    passRef(innerRef);
  }, [innerRef]);
  const [fileList, setFileList] = useState([]);
  const innerRef = useRef(null);
  const actionUrl = 'https://tst-nca-tap-api.tekion.xyz/tapapi/tap_document_mgmt/public/v1/tasks/2951457/attachments';
  // const actionUrl = `${process.env.BASE_URL}/tapapi/tap_document_mgmt/public/v1/feature/${featureId}/attachments`;

  const access_token = 'eyJraWQiOiJrbjFxVkVYRVAtYlEtWlFjc0hTOEJjd1pYeEhqUHVpSUQ5S3M4WDNVbHNZIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjkyMHdfbVVCS250T3luY2w1cEQyZkthRjI3MVN3ZVJTbnV3Q0FYTEg3Sm8iLCJpc3MiOiJodHRwczovL2VtcGxveWVlLnRla2lvbi5jb20vb2F1dGgyL2F1czJtcTFqN2xrV1RlNjhBNHg3IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTY5NTcxODAxOCwiZXhwIjoxNjk1NzQ2ODE4LCJjaWQiOiIwb2Exb3gwYzhuSXZoaGtKWDR4NyIsInVpZCI6IjAwdTI3Mjd3YUoxeWZuWWd1NHg2Iiwic2NwIjpbIm9wZW5pZCIsImVtYWlsIiwicHJvZmlsZSJdLCJhdXRoX3RpbWUiOjE2OTU2MjA0NDEsInN1YiI6InZtdXJ1Z2FuQHRla2lvbi5jb20ifQ.JW_h94gzkaNKbvjx4efwL1bj_rDkjlH_t2DCzWve2d_Brzzbx2VcjpAMRYK5J8_cwMlsQX55PJv25U6rd96Zwk2a-om5liddP41Mo7HcybbATtin8eUxr4cKnjlOw729AP9Odz-Z_qB5bRkEXpFoBfvEc4BRCuLPVdfus-gkv46MqpdTGuqdcqr3mUi_AMl2cqcC45PcmJLtJs8Stf8e4PSZ_bn1HxgRWmeFgZRliQBCjwZhj3KBnjP22pnv3uN8Ma9elSO8fjrZZ5Qmfvnsu5mb6jT-EYYJHvplUdeV1wATlg5W9McezGCBP21PBN0-v6ZIiMElBRPPR4SRbTquxQ';

  const props = {
    action: actionUrl,
    multiple: true,
    listType: 'picture',
    headers: { email: getCookie('email'), 'tap-api-token': access_token },
    // headers: { email: getCookie('email'), 'tap-api-token': getCookie('access_token') },
    data: { featureId, isDeletable: false },
    onChange: (info) => {
      const [...newFiles] = files;
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
        toaster('success', `${info.file.name}  ${__('file uploaded successfully')}`);
      } else if (info.file.status === 'error') {
        toaster('error', `${info.file.name} ${__('file upload failed')}`);
      }
      updateFiles(newFiles);
      flushSync(() => {
        setFileList(info.fileList);
      });
      // setFileList(info.fileList);
    },
  };

  const [, setActiveFile] = useState({});
  const [activeFileIndex, setActiveFileIndex] = useState(0);

  const [showPreview, setShowPreview] = useState(false);
  const [, setPreviewInfo] = useState({
    url: '',
    name: '',
    thumbUrl: '',
  });

  const beforeUpload = (file) => {
    if (parentBeforeUpload) {
      parentBeforeUpload();
    }
    beforeUploads(file);
  };

  const onClosePreview = () => {
    setShowPreview(false);
    setPreviewInfo({});
  };

  const onClickAttachment = ({ url, name, thumbUrl }) => {
    setShowPreview(true);
    setPreviewInfo({ url, name, thumbUrl });
  };

  const handlePreview = async (currFile) => {
    if (currFile && currFile.url) {
      const { fileIndex } = currFile;
      setShowPreview(true);
      setActiveFile(currFile);
      setActiveFileIndex(fileIndex);
    }
  };

  const onCarouselChange = (fileIndex) => {
    setActiveFile(fileList[fileIndex]);
    setActiveFileIndex(fileIndex);
  };

  const customPaging = (index) => {
    if (isEmpty(fileList)) {
      return <></>;
    }
    const file = fileList[index];
    const { url, preview, name } = file || {};
    const thumbNail = url || preview;
    const isThumbnail = checkThumbnail(name);
    return (
      <div>
        {isThumbnail && (
          <Tooltip placement="top" title={name || 'untitled'}>
            <div className={style.thumbNails} style={{ backgroundImage: `url(${thumbNail})`, backgroundSize: 'cover' }}></div>
          </Tooltip>
        )}
        {!isThumbnail && (
          <Tooltip placement="top" title={name || 'untitled'}>
            <div className={style.dummyPreviewDot}>{name && getThumbNail(name)}</div>
          </Tooltip>
        )}
      </div>
    );
  };

  const customArrow = type => (
    // <div>
    <FontIcon style={style.customArrowStyle}>{type}</FontIcon>
    // </div>
  );

  // return (
  //   <Slider
  //     arrows
  //     dots
  //     afterChange={onCarouselChange}
  //     customPaging={index => customPaging(index)}
  //     initialSlide={activeFileIndex}
  //     lazyLoad="ondemand"
  //     nextArrow={customArrow('tap-icon-arrow-right')}
  //     prevArrow={customArrow('tap-icon-arrow-left')}
  //   >
  //     {fileList
  //       && fileList.map(file => (
  //         <div key={file.uid}>{showPreview && (
  //           <PreviewModal
  //             name={previewInfo.name}
  //             type={previewInfo.type}
  //             url={previewInfo.thumbUrl || previewInfo.url}
  //             onClose={onClosePreview}
  //           />
  //         )}
  //         </div>
  //       ))}
  //   </Slider>
  // );

  return (
    <div className={style.attachmentContainer}>
      <Upload
        {...props}
        ref={innerRef}
        multiple
        beforeUpload={beforeUpload}
        fileList={fileList}
        showUploadList={false}
        onPreview={handlePreview}
      >
        <Tooltip
          className={style.attaches}
          placement="right"
          title={__('Attach a file')}
        >
          <FontIcon>icon-attach</FontIcon>
          <p>Attach</p>
        </Tooltip>
      </Upload>
      {files.length > 0 && (
        <AttachmentList
          files={files}
          onClick={onClickAttachment}
        />
      )}

      {/* {showPreview && (
        <PreviewModal
          name={previewInfo.name}
          type={previewInfo.type}
          url={previewInfo.thumbUrl || previewInfo.url}
          onClose={onClosePreview}
        />
      )} */}
      {showPreview && (
        <Slider
          arrows
          dots
          afterChange={onCarouselChange}
          customPaging={index => customPaging(index)}
          initialSlide={activeFileIndex}
          lazyLoad="ondemand"
          nextArrow={customArrow('tap-icon-arrow-right')}
          prevArrow={customArrow('tap-icon-arrow-left')}
        >
          {fileList
          && fileList.map(file => (
            <div key={file.uid}>
              <PreviewModal
                // name={file.name}
                // type={file.type}
                // url={file?.response.link}
                // onClose={onClosePreview}
                fileName={file.name || ''}
                previewItemURL={file?.response.link}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

UploadAttachment.propTypes = {
  maxFileCount: PropTypes.number,
  canDeleteFile: PropTypes.bool,
  onFilePreview: PropTypes.func,
  onDeleteFile: PropTypes.func,
  onChangeUploadStatus: PropTypes.func.isRequired,
  files: PropTypes.string.isRequired,
  featureId: PropTypes.number.isRequired,
  updateFiles: PropTypes.func.isRequired,
  beforeUpload: PropTypes.func,
  passRef: PropTypes.func,
};

UploadAttachment.defaultProps = {
  maxFileCount: 3,
  canDeleteFile: false,
  onFilePreview: null,
  onDeleteFile: null,
  beforeUpload: NO_OP,
  passRef: NO_OP,
};
