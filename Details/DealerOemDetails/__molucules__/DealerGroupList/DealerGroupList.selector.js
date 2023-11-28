import get from 'lodash/get';

export const getColumnsWidthHash = state => get(state, 'feature.columnsWidthHash');
