import Http from '../../../../../services/http';
import url from '../../../../../api/urls';

export const getFeatureTrackerInfoOnID = (id, payload) => Http.post('TAP', `${url.getFeatureTrackerInfoOnID}${id}`, payload).then(({ data }) => data);
