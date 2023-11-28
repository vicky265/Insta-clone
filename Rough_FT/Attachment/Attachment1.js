import React, { useState, useRef } from 'react';
import './index.css';
import { flushSync } from 'react-dom';
import CommentInputArea from '../CommentInputArea';
import UploadAttachment from '../CommentsHelperComponents/UploadAttachment';
import { renderCommentsFooter } from '../CommentsHelperComponents/CommentsHelper';
import TMAvatar from '../../atoms/TMAvatar';
import { NEW } from '../../constants/constants';

function CommentBox(props) {
  const [content, setContent] = useState('');
  const [contentPlainText, setContentPlainText] = useState('');
  const [resetContent, setResetContent] = useState(false);
  const [files, setFiles] = useState([]);
  const [shouldRenderAsHtml, setShouldRenderAsHtml] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const uploadRef = useRef();

  const onChangeRender = () => {
    setShouldRenderAsHtml(false);
  };

  const passRef = (innerRef) => {
    uploadRef.current = innerRef;
  };

  const closeCommentEditor = () => {
    const { commentCancelled } = props;
    commentCancelled();
    setShouldRenderAsHtml(true);
  };

  const onCancel = () => {
    setResetContent(true);
    closeCommentEditor();
  };

  const addCommentClick = () => {
    const { actions } = props;

    if (files && files.length) {
      const { addMultipleComments } = props;
      addMultipleComments(content, contentPlainText, files);
    } else if (content && contentPlainText.trim()) {
      const { addComment } = props;
      addComment(content, contentPlainText);
    }

    onChangeFiles([]);
    actions.addDraftComments({
      groupId: NEW,
      isDraftDeletable: true,
    });

    setContent('');
    setContentPlainText('');
    setResetContent(true);
    setShouldRenderAsHtml(true);
  };

  const handleChange = ({ json: newContent, text: newContentPlainText }) => {
    setContent(newContent);
    setContentPlainText(newContentPlainText);

    const { onChange } = props;
    if (onChange) {
      onChange(newContent, newContentPlainText);
    }
  };

  const onChangeFiles = (newFiles) => {
    flushSync(() => {
      setFiles(newFiles);
    });

    const { onChangeFiles } = props;
    if (onChangeFiles) {
      onChangeFiles(newFiles);
    }
  };

  const onDeleteFile = (deletedFile) => {
    const { actions } = props;

    if (uploadRef.current && deletedFile.file) {
      uploadRef.current.upload.abort(deletedFile.file);
    }

    if (deletedFile?.id) {
      actions.deleteAttachments(deletedFile?.id);
    }
  };

  const onChangeUploadStatus = (status) => {
    setDisableSubmit(status === 'in-progress');
  };

  const renderCommentText = () => {
    const { users, userList, newtaskFieldDisabled, isTeamMember, selectProjectDetail, ...restProps } = props;
    const commentText = shouldRenderAsHtml ? (
      <span className="commentsPlaceHolder"> Add Comment </span>
    ) : (
      <div className="commentInputTextWrapper">
        <CommentInputArea
          {...restProps}
          userList={userList}
          resetContent={resetContent}
          noBorder
          customKeymap={{ 'Ctrl-Enter': addCommentClick }}
          suggestionPosition="top"
          onChange={handleChange}
          allowUploads
          files={files}
          canDeleteFile
          onBlur={onBlur}
          isComment
          onChangeFiles={onChangeFiles}
          onDeleteFile={onDeleteFile}
          newtaskFieldDisabled={shouldRenderAsHtml}
          onChangeUploadStatus={onChangeUploadStatus}
        />
      </div>
    );

    return (
      <div onClick={onChangeRender} role="button" tabIndex="0">
        {commentText}
      </div>
    );
  };

  const onBlur = () => {
    const { actions } = props;

    if (contentPlainText !== '') {
      const payload = {
        groupId: NEW,
        content,
        contentPlainText,
        files,
      };

      actions.addDraftComments(payload);
    }
  };

  const renderCommentInput = () => {
    const { taskId } = props;

    return (
      <div className={shouldRenderAsHtml ? 'commentInput noComment' : 'commentInput'}>
        {renderCommentText()}
        {!shouldRenderAsHtml && renderCommentsFooter(taskId, disableSubmit, getButton, addCommentClick, onCancel)}
      </div>
    );
  };

  const getButton = (taskId) => {
    const { actions } = props;

    return (
      <UploadAttachment
        taskId={taskId}
        groupId={NEW}
        updateFiles={onChangeFiles}
        onChangeUploadStatus={onChangeUploadStatus}
        beforeUpload={beforeUpload}
        files={files}
        actions={actions}
        passRef={passRef}
      />
    );
  };

  return (
    <div className="commentBox">
      <div className="userIcon">
        <TMAvatar user={props.userList[props.userId]} displayName={false} />
      </div>
      <div className="rightSection">
        {renderCommentInput()}
      </div>
    </div>
  );
}

export default CommentBox;
