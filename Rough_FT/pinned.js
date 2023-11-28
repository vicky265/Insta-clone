import React from 'react';
import Accordion from './accordion';
import './style.css';

const Pinned = () => {
  const pinnedData = {
    title: 'Pinned',
    content: {
      CurrentStatus: 'Current Status',
      DueDate: 'Due Date',
    },
  };

  return (
    <div>
      <div className="accordion">
        <Accordion content={pinnedData.content} title={pinnedData.title} />
      </div>
    </div>
    //     <table className="accordian">
    //   <tr>
    //     <td>{__('Current Status:')}</td>
    //     <td>
    //       <Status feature_id={feature_id} status={status} onAction={onAction} />
    //     </td>
    //   </tr>
    //   <tr>
    //     <td>{__('Due Date:')}</td>
    //     <td>
    //       <DueDate
    //         date={due_date}
    //         feature_id={feature_id}
    //         onAction={onAction}
    //       />
    //     </td>
    //   </tr>
    //   <tr>
    //     <td>{__('Assignee:')}</td>
    //     <td>
    //       <Assignee
    //         assignee={assignee}
    //         feature_id={feature_id}
    //         onAction={onAction}
    //       />
    //     </td>
    //   </tr>
    // </table>
  );
};

export default Pinned;
