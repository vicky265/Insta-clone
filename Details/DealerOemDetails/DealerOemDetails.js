import React, { useRef } from 'react';
import Button from '@tekion/tekion-components/src/atoms/Button';
import Style from './DealerOemDetails.module.scss';
import { ALL_PRIORITY } from './DealerOemDetails.constants';
import DealerView from './__molucules__/DealerView';

export default function DealerOemDetails() {
  const DealerRef = useRef(null);

  return (
    <section className={Style.Dealer_details}>
      <div ref={DealerRef} className={Style.dealer_details_content}>
        <div className={Style.details_content_header}>
          <div className={Style.priorityBanner}>
            {Object.keys(ALL_PRIORITY).map(pri => (
              <div className={Style.priority}>
                <p className={Style.icon}>{ALL_PRIORITY[pri]}</p>
                <p>
                  {pri}
                </p>
              </div>
            ))}
          </div>
          <div className={Style.btns}>
            <Button
              className="BUTTON"
              view="primary"
            >
              {__('Add Dealer')}
            </Button>
          </div>
        </div>
        <DealerView />
      </div>
    </section>
  );
}
