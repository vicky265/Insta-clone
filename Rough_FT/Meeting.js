export const Descrition = (props) => {
    const {
      meetingState, handleDealerForms, placeholder = 'Description', label = 'Description',
    } = props;
    const { activity_description = '' } = meetingState;
    const [descriptionLogNotesAttachment, setdescriptionLogNotesAttachment] = useState([]);
    const descriptionLogNotesUpdateMedia = {
      inline: true,
      onUpload: (files, callback) => onUpload({
        files,
        callback,
        state: descriptionLogNotesAttachment,
        updateState: payload => setdescriptionLogNotesAttachment(payload),
      }),
    };
    useEffect(() => {
      pluginOptions.image = { ...descriptionLogNotesUpdateMedia };
      pluginOptions.media = { ...descriptionLogNotesUpdateMedia };
    }, [descriptionLogNotesAttachment]);
    const onEditorHasChanges = (value) => {
      handleDealerForms({
        type: 'ON_CHANGE',
        payload: {
          id: 'activity_description',
          value,
        },
      });
    };
    const onEditorHasChangesDebounced = _debounce(onEditorHasChanges, 1500);
    const onDescriptionChange = (changeEvent) => {
      const { html } = changeEvent;
      onEditorHasChangesDebounced(html);
    };
    return (
      <div style={{ width: '100%', marginBottom: '10px' }}>
        <div
          className={styles.labelTitle}
          style={{ margin: '8px 0px' }}
        >
          {label}<sup>*</sup>
          {placeholder !== 'Description'
            && (
              <span style={{ fontSize: 12 }}>
                (Limit 2000 characters)
              </span>
            )
          }
        </div>
        <div className={styles.activeLogCallDescription}>
          <Editor
            id="activities_description_editor"
            plugins={['list', 'image', 'table', 'image', 'media']}
            key="activities_description_editor"
            defaultValue={activity_description}
            pluginOptions={pluginOptions}
            onChange={onDescriptionChange}
            rows={15}
          />
        </div>
      </div>
    );
  };


  Collapse
  has context menu


  // const onEditorHasChanges = ({ type: actionType, payload }) => {
  //   const { id, value } = payload;
  //   if (actionType === 'ON_CHANGE') {
  //     console.log('payload-> ', payload);
  //     const formValue = { ...formState, [id]: value };
  //     setFormState(formValue);
  //   }
  // };
  // const {
  //   handleDealerForms,
  // } = props;

  const onEditorHasChanges = (value) => {
    // handleDealerForms({
    //   type: 'ON_CHANGE',
    //   payload: {
    //     id: 'activity_description',
    //     value,
    //   },
    // });
    console.log('value', value);
  };

  const onEditorHasChangesDebounced = _debounce(onEditorHasChanges, 1500);
  const onDescriptionChange = (changeEvent) => {
    const { html } = changeEvent;
    // onEditorHasChangesDebounced(html);
  };

//   formAction
  if (id === 'date') {
    // setDateValue(value._d);
  }



  else if (!Utility.isValidEmail(id)) {
    toaster('error', 'Please enter valid Email Id');
  } else {
    addParticipant({
      id,
      tagName: id,
    });
  }


  tagsLabel[tg.tagName || tg.name] = { label: tg.tagName || tg.name, value: tg.tagId || tg.id, searchKey: tg.tagName || tg.name, email: tg.email };
      // tagsLabel[tg.email] = { label: tg.email, value: tg.email };


                    // fileList.reduce((promise, data) => promise.then(uploadAttachmentsInitiate(data).then((res) => {
              //   dispatch({ payload: res });
              // }).catch(() => dispatch({ payload: EMPTY_ARRAY }))), Promise.resolve());
              // setFileDetails(fileList);

***********
    // updateEmployeeInfo(payload).then(() => {
    //   onAction({ type: 'GET_DATA' });
    //   employeeMasterActions.setAddEmployeeFormLoader({ btnLoader: false });
    //   TravelSchedulerUtils.getEmployeesList(dispatch);
    //   cancelCallback();
    //   toaster('success', 'Updated Successfully');
    // }).catch(() => {
    //   employeeMasterActions.setAddEmployeeFormLoader({ btnLoader: false });
    //   toaster('error', 'Failed to update');
    // });
***********
{/* <Button label="Cancel" onClick={cancelCallback} view="secondary" className={s.drawerButtons} loading={addEmployeeFormLoader.btnLoader} />
      <Button label="Save" onClick={() => handleSave()} view="primary" className={s.drawerButtons} loading={addEmployeeFormLoader.btnLoader} /> */}
      