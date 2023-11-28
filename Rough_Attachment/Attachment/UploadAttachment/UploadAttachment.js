import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import PropTypes, { bool } from 'prop-types';
import { Upload } from 'antd';
import { isEmpty } from '@tekion/tap-components/utils/helper';
import Tooltip from 'tcomponents/atoms/tooltip';
import FontIcon from 'tcomponents/atoms/FontIcon';
import { getCookie } from 'utils/helpers';
import { NO_OP } from '@tekion/tap-components/constants/Constants';
import { toaster } from '@tekion/tap-components/v2/molecules/NotificationWrapper';
import Button from '@tekion/tekion-components/src/atoms/Button';
import { beforeUpload as beforeUploads } from './UploadAttachmentHelper';
import style from '../Attachment.module.scss';
import styles from './UploadAttachment.module.scss';
import AttachmentPreview from '../AttachmentPreview/AttachmentPreview';
import { getThumbNail } from '../AttachmentPreview/AttachmentPreview.Helper';
import AttachmentList from '@tekion/tap-components/atoms/Attachments/AttachmentList';


const UploadAttachment = ({
  files, updateFiles, beforeUpload: parentBeforeUpload, passRef,
}) => {
  useEffect(() => {
    passRef(innerRef);
  }, [innerRef]);

  // const email = getCookie('email');
  const checkThumbnail = name => name.includes('.png') || name.includes('.jpg') || name.includes('.jpeg') || name.includes('.PNG') || name.includes('.JPG') || name.includes('.JPEG') || name.includes('.gif') || name.includes('.GIF') || name.includes('.ico') || name.includes('.ICO');
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [activeFile, setActiveFile] = useState({});
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  // const [dynamicProps, setDynamicProps] = useState({ fileList: [] });
  const innerRef = useRef(null);
  const actionUrl = 'https://tst-nca-tap-api.tekion.xyz/tapapi/tap_document_mgmt/public/v1/tasks/2950683/attachments';
  const props = {
    action: actionUrl,
    multiple: true,
    listType: 'picture',
    headers: { email: getCookie('email'), 'tap-api-token': getCookie('access_token') },
    showUploadList: false,
    // data: { taskId, isDeletable: false },
    onChange: (info) => {
      const [...newFiles] = info.fileList;
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
      if (info.file.status === 'done') {
        const { link: url, id } = info.file.response;
        const { name } = info.file;
        const doneIndex = newFiles.findIndex(file => file.tempId === info.file.uid);
        newFiles[doneIndex] = { name, url, id };
        toaster('success', `${info.file.name}  ${__('file uploaded successfully')}`);
        // handlePreview(info.file);
        setPreviewVisible(true);
      } else if (info.file.status === 'error') {
        toaster('error', `${info.file.name} ${__('file upload failed')}`);
      }
      updateFiles(newFiles);
      // flushSync(() => {
      //   setFileList(info.fileList);
      // });
    },
  };

  const modalTitleNode = () => {
    const { name, url, preview } = activeFile;
    if (isEmpty(activeFile)) {
      return null;
    }
    const previewTitle = name || url.substring(url.lastIndexOf('/') + 1);
    const previewImage = url || preview;
    return (
      <div className={styles.modalTitle}>
        <h2>{previewTitle}</h2>
        <Button>
          <a className="Image-preview-modal" href={previewImage} tabIndex="0">
            <FontIcon>icon-download1</FontIcon>
            <span className={styles.downloadTitle}>{__('Download')}</span>
          </a>
        </Button>
      </div>
    );
  };

  const customArrow = type => (<div><FontIcon style={styles.customArrowStyle}>{type}</FontIcon></div>);

  const modalProps = {
    visible: true,
    title: modalTitleNode(),
    centered: true,
    footer: 'null',
    onCancel: handleCancel,
    destroyOnClose: true,
    submitBtnText: __('Delete'),
    bodyStyle: styles.bodyStyle,
    className: 'modal__attachmentPreview',
  };

  const sliderProps = {
    afterChange: onCarouselChange,
    dots: bool,
    arrows: bool,
    initialSlide: activeFileIndex,
    customPaging: index => customPaging(index),
    nextArrow: customArrow('tap-icon-arrow-right'),
    prevArrow: customArrow('tap-icon-arrow-left'),
    lazyLoad: 'ondemand',
  };

  const beforeUpload = (file) => {
    if (parentBeforeUpload) {
      parentBeforeUpload();
    }
    beforeUploads(file);
  };

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = (currFile) => {
    if (currFile && currFile.url) {
      const {
        fileIndex,
      } = currFile;
      setActiveFile(currFile);
      setActiveFileIndex(fileIndex);
      setPreviewVisible(true);
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
            <div className={styles.thumbNails} style={{ backgroundImage: `url(${thumbNail})`, backgroundSize: 'cover' }}></div>
          </Tooltip>
        )}
        {!isThumbnail && (
          <Tooltip placement="top" title={name || 'untitled'}>
            <div className={styles.dummyPreviewDot}>{name && getThumbNail(name)}</div>
          </Tooltip>
        )}
      </div>
    );
  };

  return (
    <div className={style.attachmentContainer}>
      <Upload
        {...props}
        ref={innerRef}
        beforeUpload={beforeUpload}
        fileList={files}
        // onPreview={handlePreview}
      >
        <Tooltip className={style.attaches} placement="right" title={__('Attach a file')}>
          <FontIcon>icon-attach</FontIcon>
          <p>Attach</p>
        </Tooltip>
      </Upload>
      <AttachmentList files={files} />
      {/* <AttachmentPreview fileList={files} modalProps={modalProps} sliderProps={sliderProps} /> */}
    </div>
  );
};

UploadAttachment.propTypes = {
  files: PropTypes.string.isRequired,
  updateFiles: PropTypes.func.isRequired,
  beforeUpload: PropTypes.func,
  passRef: PropTypes.func,
};

UploadAttachment.defaultProps = {
  beforeUpload: NO_OP,
  passRef: NO_OP,
};

export default UploadAttachment;
