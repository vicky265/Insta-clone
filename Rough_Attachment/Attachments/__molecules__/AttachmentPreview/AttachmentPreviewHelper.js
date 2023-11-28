import React from 'react';

export const getThumbNail = (previewItemURL) => {
  if (previewItemURL.includes('.pdf') || previewItemURL.includes('.PDF')) {
    return (
      <div className="AttachmentCard-info">
        <svg className="Icon FilePdfIcon AssetIcon-coral AttachmentCard-svg-thumbnail" focusable="false" viewBox="0 0 32 32">
          <path d="M0 6a6 6 0 0 1 6-6h11.84a7 7 0 0 1 4.48 1.622l7.161 5.967A7 7 0 0 1 32 12.967V26a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6zm14.688 3.613c0 .435-.153.726-.305 1.306-.305-1.306-.305-2.322 0-3.193.152 0 .152-.145.152-.145l.153.145v.145c.152.145.152.726 0 1.452v.29zM9.048 21.37c.153-.145.458-.29.762-.436-.914 1.742-1.829 2.613-2.743 2.759.152-.436.914-1.452 1.981-2.323zm14.785-2.613c0 .145.152.145.152.145v.145h-.457c-.762 0-1.829-.29-2.896-.725v-.146h.305c2.134 0 2.744.436 2.896.581zm.61 1.161c.305-.29.457-.725.61-.87 0-.29 0-.581-.153-.872-.457-.725-1.677-1.016-3.506-1.016-.61 0-1.219.145-1.981.145-.61-.29-.915-.58-1.372-.87-.914-.871-1.829-2.178-2.439-3.775v-.145c.61-1.887 1.067-4.21 0-5.226-.304-.145-.61-.29-.914-.29h-.305c-.61 0-1.067.58-1.22 1.161-.609 2.033-.304 3.049.306 4.79-.458 1.307-.915 2.759-1.677 4.21-.61 1.016-1.067 1.887-1.524 2.613-.61.29-1.067.58-1.372.726-1.83 1.016-2.744 2.323-2.896 3.048 0 .29 0 .436.152.726v.145l.763.436c.152.145.304.145.61.145 1.219 0 2.743-1.452 4.572-4.5.152-.145.152-.145.305-.145 1.524-.58 3.505-.871 6.096-1.161 1.525.725 3.354 1.016 4.573 1.016a3.17 3.17 0 0 0 1.372-.29zm-9.908-5.66c.61 1.306 1.525 2.467 2.287 3.338.152.145.305.29.61.435-1.22.145-3.049.58-5.03 1.307h-.305c.305-.58.61-1.016.914-1.597.61-1.307 1.22-2.468 1.524-3.484z"></path>
        </svg>
      </div>
    );
  }
  if (previewItemURL.includes('.docx') || previewItemURL.includes('.DOCX') || previewItemURL.includes('.doc') || previewItemURL.includes('.DOC')) {
    return (
      <div className="AttachmentCard-info">
        <svg className="Icon FileDocIcon AssetIcon-teal AttachmentCard-svg-thumbnail" focusable="false" viewBox="0 0 32 32">
          <path d="M0 6a6 6 0 0 1 6-6h11.84a7 7 0 0 1 4.48 1.622l7.161 5.967A7 7 0 0 1 32 12.967V26a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6zm8 2a1 1 0 1 0 0 2h14a1 1 0 0 0 0-2H8zm0 5a1 1 0 0 0 0 2h15a1 1 0 0 0 0-2H8zm0 5a1 1 0 0 0 0 2h11.91a1 1 0 1 0 0-2H8zm0 5a1 1 0 0 0 0 2h15a1 1 0 0 0 0-2H8z"></path>
        </svg>
      </div>
    );
  }
  if (previewItemURL.includes('.csv') || previewItemURL.includes('.CSV')) {
    return (
      <div className="AttachmentCard-info">
        <svg className="Icon FileCellIcon AssetIcon-green AttachmentCard-svg-thumbnail" focusable="false" viewBox="0 0 32 32">
          <path d="M0 6a6 6 0 0 1 6-6h11.84a7 7 0 0 1 4.48 1.622l7.161 5.967A7 7 0 0 1 32 12.967V26a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6zm7.6 4.111a.6.6 0 0 0-.6.6v3.8a.6.6 0 0 0 .6.6h6.9a.6.6 0 0 0 .6-.6v-3.8a.6.6 0 0 0-.6-.6H7.6zm9.9 0a.6.6 0 0 0-.6.6v3.8a.6.6 0 0 0 .6.6h6.9a.6.6 0 0 0 .6-.6v-3.8a.6.6 0 0 0-.6-.6h-6.9zm-9.9 8a.6.6 0 0 0-.6.6v3.8a.6.6 0 0 0 .6.6h6.9a.6.6 0 0 0 .6-.6v-3.8a.6.6 0 0 0-.6-.6H7.6zm9.9 0a.6.6 0 0 0-.6.6v3.8a.6.6 0 0 0 .6.6h6.9a.6.6 0 0 0 .6-.6v-3.8a.6.6 0 0 0-.6-.6h-6.9z"></path>
        </svg>
      </div>
    );
  }
  if (previewItemURL.includes('.xlsx') || previewItemURL.includes('.XLSX')) {
    return (
      <div className="AttachmentCard-info">
        <svg className="Icon FileCellIcon AssetIcon-green AttachmentCard-svg-thumbnail" focusable="false" viewBox="0 0 32 32">
          <path d="M0 6a6 6 0 0 1 6-6h11.84a7 7 0 0 1 4.48 1.622l7.161 5.967A7 7 0 0 1 32 12.967V26a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6zm7.6 4.111a.6.6 0 0 0-.6.6v3.8a.6.6 0 0 0 .6.6h6.9a.6.6 0 0 0 .6-.6v-3.8a.6.6 0 0 0-.6-.6H7.6zm9.9 0a.6.6 0 0 0-.6.6v3.8a.6.6 0 0 0 .6.6h6.9a.6.6 0 0 0 .6-.6v-3.8a.6.6 0 0 0-.6-.6h-6.9zm-9.9 8a.6.6 0 0 0-.6.6v3.8a.6.6 0 0 0 .6.6h6.9a.6.6 0 0 0 .6-.6v-3.8a.6.6 0 0 0-.6-.6H7.6zm9.9 0a.6.6 0 0 0-.6.6v3.8a.6.6 0 0 0 .6.6h6.9a.6.6 0 0 0 .6-.6v-3.8a.6.6 0 0 0-.6-.6h-6.9z"></path>
        </svg>
      </div>
    );
  }
  if (previewItemURL.includes('.ppt') || previewItemURL.includes('.PPT') || previewItemURL.includes('.pptx') || previewItemURL.includes('.PPTX')) {
    return (
      <div className="AttachmentCard-info">
        <svg className="Icon FileChartIcon AssetIcon-gold AttachmentCard-svg-thumbnail" focusable="false" viewBox="0 0 32 32"><path d="M0 6a6 6 0 0 1 6-6h11.84a7 7 0 0 1 4.48 1.622l7.161 5.967A7 7 0 0 1 32 12.967V26a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6zm15.024 3H15a8 8 0 1 0 8 8c-4.267.028-.037.048-7.977.033-.003-.992-.05-2.545.001-8.033zM25 14.976A7.976 7.976 0 0 0 17.024 7c-.052 5.472-.004 7.02 0 8.009 7.93.014 3.682-.005 7.976-.033z"></path></svg>
      </div>
    );
  }
  if (previewItemURL.includes('.zip') || previewItemURL.includes('.ZIP') || previewItemURL.includes('.tz') || previewItemURL.includes('.TZ')) {
    return (
      <div className="AttachmentCard-info">
        <svg className="Icon FileZipIcon AssetIcon-default AttachmentCard-svg-thumbnail" focusable="false" viewBox="0 0 32 32">
          <path d="M0 6a6 6 0 0 1 6-6h11.84a7 7 0 0 1 4.48 1.622l7.161 5.967A7 7 0 0 1 32 12.967V26a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6zm12.7 10a.7.7 0 0 0-.7.7v6.6a.7.7 0 0 0 .7.7h5.6a.7.7 0 0 0 .7-.7v-6.6a.7.7 0 0 0-.7-.7h-5.6zm.8 2h4a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5zm2.75-16a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25h-2.5zm0 6a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25h-2.5zm-4 3a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25h-2.5zm0-6a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25h-2.5z"></path>
        </svg>
      </div>
    );
  }
  if (previewItemURL.includes('.mp4') || previewItemURL.includes('.MP4') || previewItemURL.includes('.mov') || previewItemURL.includes('.MOV')) {
    return (
      <div className="AttachmentCard-info">
        <svg className="Icon FileVideoIcon AssetIcon-default AttachmentCard-svg-thumbnail" focusable="false" viewBox="0 0 32 32">
          <path d="M0 6a6 6 0 0 1 6-6h11.84a7 7 0 0 1 4.48 1.622l7.161 5.967A7 7 0 0 1 32 12.967V26a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6zm12.115 3.257A1.4 1.4 0 0 0 10 10.46v12.096a1.4 1.4 0 0 0 2.108 1.208l10.246-6.008a1.4 1.4 0 0 0 .007-2.411L12.115 9.257z"></path>
        </svg>
      </div>
    );
  }
  return (
    <div className="AttachmentCard-info">
      <svg className="Icon FileDefaultIcon AssetIcon-default AttachmentCard-svg-thumbnail" focusable="false" viewBox="0 0 32 32">
        <path d="M0 6a6 6 0 0 1 6-6h11.84a7 7 0 0 1 4.48 1.622l7.161 5.967A7 7 0 0 1 32 12.967V26a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6zm8 2a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H8zm0 5a1 1 0 1 0 0 2h15a1 1 0 1 0 0-2H8zm0 10a1 1 0 1 0 0 2h15a1 1 0 1 0 0-2H8zm0-5a1 1 0 1 0 0 2h11.91a1 1 0 1 0 0-2H8z"></path>
      </svg>
    </div>
  );
};
