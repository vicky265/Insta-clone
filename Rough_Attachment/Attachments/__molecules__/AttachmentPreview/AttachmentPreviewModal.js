import React, { Suspense, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { isEmpty } from '@tekion/tap-components/utils/helper';
import { toaster } from '@tekion/tap-components/v2/molecules/NotificationWrapper';
import ImageWithPlaceHolder from '@tekion/tekion-components/src/molecules/MediaView/ImageWithPlaceHolder';
import { EMPTY_STRING } from '@tekion/tap-components/constants/Constants';
import {
  IMAGE_TYPE, PDF_TYPE, AUDIO_TYPE, VIDEO_TYPE, UNSUPPORTED,
  IS_IMAGE_REGEX, IS_PDF_REGEX, IS_AUDIO_REGEX, IS_VIDEO_REGEX,
  UNSUPPORTED_TXT,
} from './AttachmentPreviewConstants';
import useIntersectionalObserver from '../../../../../../common/hooks/useIntersectionalObserver';

const Document = React.lazy(() => import('react-pdf').then(module => ({ default: module.Document })));
const Page = React.lazy(() => import('react-pdf').then(module => ({ default: module.Page })));
const fileType = (url) => {
  const filePath = url ? url.split('?')[0] : '';
  if (filePath.match(IS_IMAGE_REGEX)) {
    return IMAGE_TYPE;
  }
  if (filePath.match(IS_PDF_REGEX)) {
    return PDF_TYPE;
  }
  if (filePath.match(IS_AUDIO_REGEX)) {
    return AUDIO_TYPE;
  }
  if (filePath.match(IS_VIDEO_REGEX)) {
    return VIDEO_TYPE;
  }
  return UNSUPPORTED;
};

const getFileType = url => url ? url.split('.').pop() : '';

const PreviewModal = ({
  previewItemURL, fileName, type, unsupportedText,
}) => {
  const [numPages, setNumPages] = useState(0);
  const [pageList, setPageList] = useState([]);

  const [elementRef, elementVisible] = useIntersectionalObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  });

  useEffect(() => {
    if (elementVisible && pageList.length < numPages) {
      setPageList([...pageList, pageList.length + 1]);
    }
  }, [elementVisible, numPages, pageList]);

  const onError = () => {
    toaster('error', __('Error in File-viewer'));
  };

  const onDocumentLoadSuccess = ({ numPages: pageCount }) => {
    setNumPages(pageCount);
    setPageList([1]);
  };

  const renderPDF = hasMore => (
    <div className="pdfWrapper">
      <div className="documentWrapper">
        <Suspense>
          <Document file={previewItemURL} loading={__('Loading PDF')} onLoadSuccess={props => onDocumentLoadSuccess(props)}>
            {!isEmpty(pageList) && pageList.map((pageNum, index) => (
              <>
                <Page pageNumber={pageNum} wrap={false} />
                {index === pageList.length - 1 && <span ref={elementRef} />}
              </>
            ))}
          </Document>
        </Suspense>
        { hasMore
          ? <div className="pdf-loader"> {__('Loading')}...</div> : <div></div>
        }
      </div>
    </div>
  );

  const renderAudio = file => (
    <div className="audiowrapper">
      <audio controls>
        <track kind="captions"></track>
        <source src={file} type={`audio/${getFileType(file)}`} />
        <p>{__('Audio format not supported')}</p>
      </audio>
    </div>
  );


  const renderVideo = file => (
    <div className="videoWrapper">
      <video controls preload="auto">
        <track kind="captions"></track>
        <source src={file} />
        <p>{__('Video format not supported')}</p>
      </video>
    </div>
  );

  const renderUnsupported = unsupportedtext => (<div className="unsupported">{unsupportedtext || UNSUPPORTED_TXT}</div>);

  const fileTypeName = fileType(type || previewItemURL);
  const hasMore = numPages > pageList.length;

  return (
    <div className="attachmentPreviewModal">
      {fileTypeName === IMAGE_TYPE && (
        <ImageWithPlaceHolder
          alt={__('Media')}
          className="Thumbnail-richAttachments Thumbnail-image-modal"
          placeHolder={fileName}
          src={previewItemURL}
          type="image"
          onError={onError}
        />
      )}
      {fileTypeName === PDF_TYPE && renderPDF(hasMore)}
      {fileTypeName === AUDIO_TYPE && renderAudio(previewItemURL)}
      {fileTypeName === VIDEO_TYPE && renderVideo(previewItemURL)}
      {fileTypeName === UNSUPPORTED && renderUnsupported(unsupportedText)}
    </div>
  );
};

PreviewModal.propTypes = {
  previewItemURL: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  type: PropTypes.string,
  unsupportedText: PropTypes.string,
};

PreviewModal.defaultProps = {
  type: EMPTY_STRING,
  unsupportedText: EMPTY_STRING,
};

export default PreviewModal;
