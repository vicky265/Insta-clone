import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@tekion/tekion-components/src/molecules/Modal';
import Slider from 'react-slick';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '@tekion/tekion-base/app.constants';
import PreviewModal from './AttachmentPreviewModal';


export default function AttachmentPreview({ fileList, modalProps, sliderProps }) {
  return (
    // <Modal>
      <Slider {...sliderProps}>
        {fileList && fileList.map((file) => {
          const { url, name } = file;
          return (<div key={file.uid}><PreviewModal fileName={name || ''} previewItemURL={url} /></div>);
        })}
      </Slider>
    // </Modal>
  );
}

AttachmentPreview.propTypes = {
  fileList: PropTypes.array,
  modalProps: PropTypes.object,
  sliderProps: PropTypes.object,
};

AttachmentPreview.defaultProps = {
  fileList: EMPTY_ARRAY,
  modalProps: EMPTY_OBJECT,
  sliderProps: EMPTY_OBJECT,
};
