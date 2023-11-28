import React from 'react';
import Modal from '@tekion/tekion-components/src/molecules/Modal';

export default function AttachmentPreview1() {
  return (
    <Modal
      bodyStyle={bodyStyle}
      centered={false}
      className="modal__attachmentPreview"
      destroyOnClose
      footer={null}
      onCancel={this.handleCancel}
      submitBtnText={__('Delete')}
      title={previewTitle}
      visible={previewVisible || false}
    >
      <Slider
        afterChange={this.onCarouselChange}
        arrows
        customPaging={index => this.customPaging(index)}
        dots
        initialSlide={activeFileIndex}
        lazyLoad="ondemand"
        nextArrow={this.customArrow('tap-icon-arrow-right')}
        prevArrow={this.customArrow('tap-icon-arrow-left')}
      >
        {attachments && attachments.map((file) => {
          const { attachmentId } = file;
          const { link, name } = taskAttachments.find(attachment => attachment.id === attachmentId) || {};
          return (<div className="carouselItem"><PreviewModal fileName={name || ''} previewItemURL={link || previewItemURL} /></div>);
        })}
      </Slider>
    </Modal>
  );
}
