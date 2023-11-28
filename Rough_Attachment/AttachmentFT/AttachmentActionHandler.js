import { toaster } from 'tcomponents/organisms/NotificationWrapper';
import { uploadAttachment2, getFeatureTrackerInfoOnID } from '../../services/FeatureRequest.service';

const callGetData = (feature_id, setState) => DetailActionHandler().GET_DATA({ feature_id }, { setState });

export const DetailActionHandler = () => ({
  GET_DATA: ({ feature_id }, { setState }) => {
    setState({ loading: true });
    getFeatureTrackerInfoOnID(feature_id, {})
      .then((data = {}) => {
        // eslint-disable-next-line no-shadow
        const { feature_id = '' } = data;
        setState({
          featureInfo: {
            ...data,
            dealers: (data.dealers || []).map((dealer = {}) => ({
              ...dealer,
              id: dealer.tekion_id,
            })),
          },
          loading: false,
          feature_id,
        });
      })
      .catch(() => toaster('error', 'Error while getting Feature Detail data'));
  },

  ADD_ATTACHMENT: ({ files, task_id }, { setState, getState }) => {
    setState({ loading: true });
    const { feature_id } = getState();
    console.log('Add Attachment ', files);
    const node = files.target.cloneNode(true);
    const filesCache = node.files;
    // eslint-disable-next-line no-param-reassign
    files.target.value = '';
    const form = new FormData();
    form.append('file', filesCache[0]);
    form.append('isDeletable', true);
    uploadAttachment2(form, task_id).then(
      () => {
        toaster(
          'success',
          `Successfully uploaded attachment: ${filesCache[0].name} to feature`
        );
        callGetData(feature_id, setState);
      },
      () => {
        toaster(
          'error',
          `Error occurred while uploading attachment: ${filesCache[0].name} to feature`
        );
        setState({ loading: false });
      }
    );
  },
});
