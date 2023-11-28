import React,
{
  useMemo, useState, useRef, useContext
} from 'react';
import FontIcon from 'tcomponents/atoms/FontIcon';
import { ACCEPTED_FILE_TYPES } from '@tekion/tap-components/constants/Constants';
// import { EMPTY_ARRAY } from '@tekion/tekion-base/app.constants';
// import attachment from '@tekion/tmatter/lib/components/atoms/attachment';
import { toaster } from 'tcomponents/organisms/NotificationWrapper';
import ContentWithDesc from '../__molecules__/ContentWithDesc/ContentWithDesc';
// import { DetailContext } from '../../pages/Details/context/Detail.context';
import style from './attachmentFT.module.scss';
import { AttachmentViewer } from './AttachmentViewer/AttachmentViewer';
// import { uploadAttachment2 } from '../../services/FeatureRequest.service';

export default function AttachmentFT() {
  const uploaderRef = useRef(null);
  const [fileList, setFileList] = useState(null);

  // const { onAction } = useContext(DetailContext);
  // const {
  //   task_id,
  // } = featureInfo;


  // console.log('featureInfo', featureInfo);
  const handleFileChange = (e) => {
    setFileList(e.target.files);
  };

  const handleUploadClick = () => {
    if (!fileList) {
      return;
    }

    // 👇 Create new FormData object and append files
    const data = new FormData();
    attachments.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });

    // 👇 Uploading the files using the fetch API to the server
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  const featureAction = (files, task_id) => {
    const node = files.target.cloneNode(true);
    const filesCache = node.files;
    // eslint-disable-next-line no-param-reassign
    files.target.value = '';
    const form = new FormData();
    form.append('file', filesCache[0]);
    form.append('isDeletable', true);
    // uploadAttachment2(form, task_id).then(
    //   () => {
    //     toaster(
    //       'success',
    //       `Successfully uploaded attachment: ${filesCache[0].name} to feature`
    //     );
    //     // callGetData(feature_id, setState);
    //   },
    //   () => {
    //     toaster(
    //       'error',
    //       `Error occurred while uploading attachment: ${filesCache[0].name} to feature`
    //     );
    //     // setState({ loading: false });
    //   }
    // );
    attachments.forEach((file, i) => {
      form.append(`file-${i}`, file, file.name);
    });

    // 👇 Uploading the files using the fetch API to the server
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: form,
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  const uploadFile = (files) => {
    // handleFileChange(e);
    handleUploadClick();
    const task_id = '1234';
    // onAction({ type: 'ADD_ATTACHMENT', files, task_id });
    featureAction({ files, task_id });
  };
  const attachments = fileList ? [...fileList] : [];
  // const attachments = [];

  const DealerScreenShot = useMemo(
    () => (
      <div className={style.attachmentWrapper}>
        <div>
          <input
            ref={uploaderRef}
            accept={ACCEPTED_FILE_TYPES}
            max={5}
            multiple="multiple"
            name="attachments"
            style={{ display: 'none' }}
            type="file"
            onChange={uploadFile}
          />
          <div className={style.addAttachment} onClick={() => uploaderRef.current.click()}>
            <FontIcon>
              icon-attach
            </FontIcon>
            <p>Attach</p>
          </div>
        </div>
        {(
          attachments.map(file => (
            <AttachmentViewer
              // attachment_id={attachment_id}
              attachment={file}
              file_name={file.name}
            />
          ))
        )}
      </div>
    ),
    [attachments]
  );

  return (
    <ContentWithDesc
      component={DealerScreenShot}
      header={__('Attachments')}
    />
  );
}

AttachmentFT.propTypes = {
};

AttachmentFT.defaultProps = {
};
