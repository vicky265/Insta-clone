import React, { useState } from 'react';

import CollapseSection from 'organisms/CollapseSection';

import DrawerSection from '../../../organisms/DrawerSection';
import FeatureRequestForm from '../../../organisms/FeatureRequestForm';

import s from './Overview.module.scss';
import Btn from '../../../atoms/Button/Button';
export default function Overview() {
  const [open, setOpen] = useState(false);
  const panels = [
    {
      header: 'Pinned',
      key: 'Pinned',
      component: <div>pinned section</div>,
    },
    {
      header: 'JIRA',
      key: 'JIRA',
      component: <div>pinned section</div>,
    },
    {
      header: 'Program Tracker',
      key: 'Program Tracker',
      component: <div>pinned section</div>,
    },
  ];

  const onClose = () => {
    setOpen(false);
  };

  return (
    <section className={`${s.overview}`}>
      <div className={`${s.overview_left} DP1`}>
        <Btn onClick={() => setOpen(true)}>{__('Add Feature')}</Btn>
        <DrawerSection
          title={__('Add Feature')}
          visible={open}
          width="70%"
          onClose={onClose}
        >
          <FeatureRequestForm setOpen={setOpen} />
        </DrawerSection>
      </div>
      <div className={`${s.overview_right} DP3`}>
        <CollapseSection defaultActiveKey={['Pinned']} panels={panels} />
      </div>
    </section>
  );
}
