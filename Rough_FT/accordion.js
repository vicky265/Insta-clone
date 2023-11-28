/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import CaretDown from './svg/CaretDown.svg';
import CaretRight from './svg/CaretRight.svg';
import style from './pinned.module.scss';
import Line from './svg/line.svg';

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>{isActive ? <img alt="caretDown" src={CaretDown} /> : <img alt="caretRight" src={CaretRight} />}</div>
      </div>
      {/* {isActive && <img alt="line" className="straight-line" src={Line} /> } */}
      {/* {isActive && <div className="accordion-content">{content.CurrentStatus}</div>}
      {isActive && <div className="accordion-content">{content.DueDate}</div>} */}
      {isActive
      && (
        <table>
          <tr className={style.accordionContent}>
            <td>{__('Current Status')}</td>
          </tr>
          <tr className={style.accordionContent}>
            <td>{__('Due Date')}</td>
          </tr>
          <tr className={style.accordionContent}>
            <td>{__('Assignee')}</td>
          </tr>
        </table>
      )}
    </div>
  );
};

export default Accordion;
