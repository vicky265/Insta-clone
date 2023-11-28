import React from 'react';

import Header from './Header';
import TabSection from '../../organisms/Tabs';
import Overview from './Overview';
import DealerOemDetails from './DealerOemDetails/DealerOemDetails';

import s from './Details.module.scss';

export default function Details() {
  return (
    <div className={s.details_container}>
      <Header title="Feature Name" />
      <TabSection
        defaultTabs="name"
        tabs={[
          {
            key: 'Overview',
            value: 'Overview',
            label: 'Overview',
            component: <Overview />,
          },
          {
            key: 'Dealer & OEM Details',
            value: 'Dealer & OEM Details',
            label: 'Dealer & OEM Details',
            component: <DealerOemDetails />,
          },
        ]}
      />
    </div>
  );
}
