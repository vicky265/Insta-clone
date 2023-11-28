import React, { useEffect, useState } from 'react';
import Layout from 'tcomponents/molecules/Layout';
import Loader from '@tekion/tap-components/atoms/Loader';
import ErrorPage from '@tekion/tap-components/atoms/ErrorPage';
import PropTypes from 'prop-types';

import { isEmpty } from '@tekion/tap-components/utils/helper';
import { EMPTY_OBJECT } from '@tekion/tap-components/constants/Constants';
import { parseFeatureLink } from '../../../../../utils/LinkUtils';
import { SOMETHING_WENT_WRONG_ERROR } from '../../../../../constants';
import styles from './DealerView.module.scss';
import DealerGroupList from '../DealerGroupList';

const DealerView = ({ actions }) => {
  const [isloading, setIsLoading] = useState(true);
  const [dealerError, setDealerError] = useState(EMPTY_OBJECT);
  const { featureId, statusGroup } = parseFeatureLink();
  const feature_id = '7'; // Hard-coded Feature ID until get the fetch dealers API
  useEffect(() => {
    if (featureId) {
      setIsLoading(true);
      const callBackFunc = (respStatus, data) => {
        if (respStatus === 'success') {
          setIsLoading(false);
        } else {
          setDealerError(data);
        }
      };
      actions.fetchDealerDetails({ feature_id, statusGroup }, callBackFunc);
    }
    return () => {
      actions.resetDealerData();
      setDealerError(EMPTY_OBJECT);
    };
  }, [featureId]);

  const { Content } = Layout;

  if (!isEmpty(dealerError)) {
    return (
      <Layout style={{ overflow: 'overlay', fontSize: '1.2rem', height: 'inherit' }}>
        <Content className={styles.siteLayoutBackground} styles={{ fontSize: '1.2rem' }}>
          <ErrorPage
            hideHomeLink={false}
            message={SOMETHING_WENT_WRONG_ERROR}
          />
        </Content>
      </Layout>
    );
  }

  return (
    <div className={styles.DealerViewContainer}>
      {isloading ? <Loader />
        : (
          <>
            {featureId && (<DealerGroupList />)}
          </>
        )
      }
    </div>
  );
};

DealerView.propTypes = {
  actions: PropTypes.object,
};

DealerView.defaultProps = {
  actions: EMPTY_OBJECT,
};


export default DealerView;
