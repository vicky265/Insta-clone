/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAttachment } from './AttachmentsAction';

export default function Attachments() {
  const [selectedFile, setSelectedFile] = useState(null);
  const attachments = useSelector((state) => state.attachments);
  // const attachments = useSelector(state => state.getIn([attachments]));
  const dispatch = useDispatch();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(addAttachment(selectedFile));
      setSelectedFile(null);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleUpload}>Upload</button>
      {attachments.map((attachment, index) => (
        <div key={index}>
          <img
            alt={`Attachment ${index}`}
            src={URL.createObjectURL(attachment)}
            style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }}
          />
        </div>
      ))}
    </div>
  );
}
