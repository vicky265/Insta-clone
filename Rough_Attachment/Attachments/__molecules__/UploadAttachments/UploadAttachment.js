//  Need to work on this
import Slider from 'react-slick';
import AttachmentList, { PreviewModal } from '@tekion/tap-components/atoms/Attachments';
import Modal from '@tekion/tekion-components/src/molecules/Modal';
import { isEmpty } from '@tekion/tap-components/utils/helper';
import { checkThumbnail } from './UploadAttachmentHelper';
import { getThumbNail } from '../AttachmentPreview/AttachmentPreviewHelper';

const bodyStyle = {
    height: 'calc(100% - 56px)',
    padding: 0,
    paddingLeft: 40,
    paddingRight: 40,
  };

  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewItemURL, setPreviewItemURL] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleCancel = () => {
    setShowPreview(false);
    setPreviewItemURL('');
    setPreviewTitle('');
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
    <FontIcon style={style.customArrowStyle}>{type}</FontIcon>
  );

  {!Utility.isArrayEmpty(attachments) ? (
    <AttachmentPreview
      files={attachments}
    />
  ) : null}
/*
  {files.length > 0 && (
    <AttachmentList
      files={files}
      onClick={onClickAttachment}
    />
  )}
  {showPreview && (
    <PreviewModal
      name={previewInfo.name}
      type={previewInfo.type}
      url={previewInfo.thumbUrl || previewInfo.url}
      onClose={onClosePreview}
    />
  )}
*/

setPageLoader
getPageLoader