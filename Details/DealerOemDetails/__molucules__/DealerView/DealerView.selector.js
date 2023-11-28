import get from 'lodash/get';
export const getDealerDetails = state => get(state, 'dealer.dealerDetails');
export const getDealerFields = state => get(state, 'dealer.dealerFields');
export const getFeatureData = state => get(state, 'dealer.featureData');
export const getDealersSort = state => get(state, 'dealer.dealersSort');
