import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import Upload from '@tekion/tekion-components/src/molecules/uploader';
import Slider from 'react-slick';
import Tooltip from 'tcomponents/atoms/tooltip';
import Modal from '@tekion/tekion-components/src/molecules/Modal';
import Button from '@tekion/tekion-components/src/atoms/Button';
import NewFontIcon from '@tekion/tekion-components/src/atoms/FontIcon';
import { toaster } from '@tekion/tap-components/v2/molecules/NotificationWrapper';
import { isEmpty } from '@tekion/tap-components/utils/helper';
import { getCookie } from '../../utils/helpers';
import PreviewModal from './AttachmentPreviewModal';
import { getThumbNail } from './AttachmentPreview.Helper';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';
import styles from './AttachmentPreview.module.scss';
import { NEW } from '../../constants/constants';
import { beforeUpload as beforeUploads } from '../CommentsHelperComponents/CommentsHelper';

const AttachmentPreview = (props) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [fileList, setFileList] = useState([]);
  const [dynamicProps, setDynamicProps] = useState({ fileList: [] });
  const [activeFile, setActiveFile] = useState({});
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [filesInUpload, setFilesInUpload] = useState([]);

  const uploadRef = useRef();

  const { taskAttachments: comments, filesInUpload } = props;

  const generateFiles = (comments, filesInUpload) => {
    const files = comments ? comments
      .filter(item => item && typeof item.link === 'string' && item.link.includes('http'))
      .map((item, index) => ({
        uid: `-${index}`,
        name: item.name,
        status: 'done',
        url: item.link,
        isDeletable: item.isDeletable,
        id: item.id,
        fileIndex: index,
      })) : [];
    if (filesInUpload && filesInUpload.length > 0) {
      filesInUpload.forEach(file => files.push(file));
    }
    return files;
  };

  useEffect(() => {
    const fileList = generateFiles(comments, filesInUpload);
    setFileList(fileList);
    setDynamicProps({ fileList });
    setActiveFile(fileList[0] || {});
    setTaskId(props.taskId);
  }, [comments, filesInUpload, props.taskId]);

  useEffect(() => {
    const nextFileList = generateFiles(comments, filesInUpload);
    setFileList(nextFileList);
    setDynamicProps({ fileList: nextFileList });
  }, [taskId]);

  useEffect(() => {
    if (comments && comments.length > 0) {
      const nextFileList = generateFiles(comments, filesInUpload);
      if (nextFileList.length !== fileList.length) {
        setFileList(nextFileList);
        setDynamicProps({ fileList: nextFileList });
      }
    }

    if (comments.length === 0 && filesInUpload.length !== 0) {
      setFileList(filesInUpload);
      setDynamicProps({ fileList: filesInUpload });
    }

    if (taskId !== NEW && comments.length === 0) {
      setFileList([]);
      setDynamicProps({ fileList: [] });
    }
  }, [comments, filesInUpload, fileList, taskId]);

  useEffect(() => {
    const { scrollToAttachments } = props;
    const { scrollToAttachments: prevScrollToAttachments } = prevProps;
    if (scrollToAttachments !== prevScrollToAttachments && scrollToAttachments
      && uploadRef && uploadRef.current) {
      uploadRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [props.scrollToAttachments]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (currFile) => {
    if (currFile && currFile.url) {
      const {
        fileIndex,
      } = currFile;
      setActiveFile(currFile);
      setActiveFileIndex(fileIndex);
      setPreviewVisible(true);
    }
  };

  const beforeUpload = (file) => {
    setDynamicProps({});
    return beforeUploads(file);
  }

  const onCarouselChange = (fileIndex) => {
    setActiveFile(fileList[fileIndex]);
    setActiveFileIndex(fileIndex);
  }

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
            <NewFontIcon>icon-download1</NewFontIcon>
            <span className={styles.downloadTitle}>{__('Download')}</span>
          </a>
        </Button>
      </div>
    );
  };

  const customPaging = (index) => {
    const { fileList } = state;
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
            <div style={{ backgroundImage: `url(${thumbNail})`, backgroundSize: 'cover' }} className={styles.thumbNails}></div>
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


  // Rest of the code remains unchanged

  return (
    <div className={`attachmentPreview ${styles.root}`}>
      {/* validateUserPermissions(userRolePermissions, MODULE_S3UPLOAD, ACTION_CREATE) */}
      {
        <Upload
          action={actionUrl}
          multiple
          headers={header}
          data={{ isDeletable: true }}
          onChange={info => handleChange(info)}
          listType="text"
          disabled={taskId === NEW || disableTaskFields}
          defaultFileList={taskAttachments}
          showUploadList={{
            showPreviewIcon: true,
          }}
          onPreview={handlePreview}
          {...dynamicProps}
          beforeUpload={beforeUpload}
        >
          {uploadButton}
        </Upload>
      }
      <Modal
        visible={previewVisible || false}
        title={modalTitleNode()}
        centered
        footer={null}
        onCancel={handleCancel}
        destroyOnClose
        submitBtnText={__('Delete')}
        bodyStyle={bodyStyle}
        className="modal__attachmentPreview"
      >
        <Slider
          afterChange={onCarouselChange}
          dots
          arrows
          initialSlide={activeFileIndex}
          customPaging={index => customPaging(index)}
          nextArrow={customArrow('tap-icon-arrow-right')}
          prevArrow={customArrow('tap-icon-arrow-left')}
          lazyLoad="ondemand"
        >
          {fileList && fileList.map((file) => {
            const { url, name } = file;
            return (<div key={file.uid}><PreviewModal previewItemURL={url} fileName={name || ''} /></div>);
          })}
        </Slider>
      </Modal>
    </div>
  );
};

export default AttachmentPreview;
