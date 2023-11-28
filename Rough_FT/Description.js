//   const descriptionChangeHandler = ({ json, text }) => {
//     onChangeHandler('description', text);
//     onChangeHandler('descriptionJson', JSON.stringify(json));
//     console.log(json, text);
//   };

// { editorFiles, onCancel, onChange, onSubmit }


const resetEditor = () => {
    editorData.current = {};
    setAttachmentIds([]);
    setEditorFiles([]);
  };


// export const addDescription = (data = []) => (dispatch) => {
//   const { featureId } = parseFeatureLink();
//   const payload = {
//     featureId,
//     html: data.html,
//     json: JSON.stringify(data.json),
//     plainText: data.text,
//     inlineAttachmentIds: [],
//   };
//   updateDescription(payload).then(() => {
//     dispatch(fetchDescription());
//   });
// };



    // const newlyAddedAttachments = getNewlyAddedAttachments(attachmentIds, previousAttachments);
    // if (!Utility.isArrayEmpty(newlyAddedAttachments)) {
    //   deleteAttachments({
    //     attachmentIds: newlyAddedAttachments,
    //   });
    // }
    // setAttachmentIds(previousAttachments);
    // setEditorFiles(getAvailableEditorFilesFromAttachments(getAttachements, prevAttachments));
    // editorData.current = { text: descriptionPlain, json: descriptionJson };

    && (editorData.current.json !== descriptionJson)





    export const editDescription = (data, previousAttachments, attachmentIds, editorFiles, getAttachements) => (dispatch) => {
        const addedAttachementIds = ((attachmentIds || []).filter(id => !previousAttachments.some(prevId => prevId === id)));
        const deletedAttachementIds = (previousAttachments.filter(prevId => !attachmentIds.some(id => prevId === id)));
        const attachmentsAfterDeleted = getAttachements.filter(({ id }) => !deletedAttachementIds.some(deletedId => deletedId === id));
        const attachmentsToAdd = encapsulateEditorFilesAsAttachments(editorFiles)?.filter(({ id }) => addedAttachementIds.some(addedId => addedId === id));
        const { featureId } = parseFeatureLink();
        const payload = {
          featureId,
          html: data.html,
          plainText: data.text,
          json: JSON.stringify(data.json),
          inlineAttachmentIds: attachmentIds || [],
          updatedIds: {
            addedAttachmentIds: addedAttachementIds,
            deletedAttachmentIds: deletedAttachementIds,
          },
        };
        dispatch(setDescription(payload));
        dispatch(setAttachments([...attachmentsToAdd, ...attachmentsAfterDeleted]));
        updateDescription(featureId, payload).then(() => {
          toaster(TOASTER_TYPE.SUCCESS, __('Description Edited Successfully'));
        }).catch(() => {
          dispatch(setDescription(data));
          dispatch(setAttachments(getAttachements));
        });
      };




  // const onDeleteFile = (deletedFile, e) => {
  //   if (e) {
  //     e.preventDefault();
  //   }
  //   if (Utility.isEmptyElement(content) || !previousAttachments.find(prevId => prevId === deletedFile.id)) {
  //     deleteAttachments({
  //       currentAttachments: [deletedFile.id],
  //     });
  //   }
  //   setAttachmentIds(currentAttachments.filter(id => id !== deletedFile.id));
  //   setEditorFiles(editorFiles.filter(({ id }) => id !== deletedFile.id));
  // };



  // const updateAttachment = {
  //   inline: true,
  //   onUpload: async (files, callback) => {
  //     const formData = new window.FormData();
  //     const editorDataClone = _cloneDeep(editorData.current);
  //     toaster(TOASTER_TYPE.INFO, 'Uploading Files');
  //     const validFiles = files.filter(item => validateUploadFile(item))
  //     await validFiles.forEach((file) => {
  //         if (featureId)(formData.append('featureId', featureId));
  //         formData.append('file', file);
  //         formData.append('isDeletable', 'true');
  //         formData.append('resource', 'description');
  //         uploadAttachments(featureId || 'NULL', formData).then(({ data: { link, name, id } }) => {
  //           const s3Attachment = {
  //             name,
  //             url: link,
  //             id,
  //             thumbUrl: link,
  //             link,
  //           };
  //           setEditorFiles([...editorFiles, s3Attachment]);
  //           setAttachmentIds([...currentAttachments, id]);
  //           editorData.current = editorDataClone;
  //           callback([s3Attachment]);
  //         });
  //     });
  //   },
  // };


    // const editorData = useRef({ text: descriptionPlain, html: descriptionHtml, json: descriptionJson });
  // const [attachmentIds, setAttachmentIds] = useState([...prevAttachments]);
  // const previousAttachments = useMemo(() => prevAttachments, [prevAttachments]);


  <>{!featureId ? <AddDescription featureId={featureId} onChangeDescription={onChangeDescription} actions={actions} attachments={attachments} />
      : <EditDescription actions={actions} attachments={attachments} featureDetails={featureDetails} featureId={featureId} onChangeDescription={onChangeDescription} />}
    </>
