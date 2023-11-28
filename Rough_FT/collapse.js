import React from 'react';
import { Collapse } from 'antd';
import './style.css';
import style from './pinned.module.scss';


const { Panel } = Collapse;

function callback(key) {
  // eslint-disable-next-line no-console
  console.log(key);
}

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandIconPosition: 'right',
    };
  }

  onPositionChange = (expandIconPosition) => {
    this.setState({ expandIconPosition });
  };

  render() {
    const { expandIconPosition } = this.state;
    return (
      <div>
        <Collapse
          className={style.accordion}
          defaultActiveKey={['1']}
          expandIconPosition={expandIconPosition}
          onChange={callback}
        >
          <Panel key="1" className={style.accordionItem} header="Pinned">
            <tr className={style.accordionContent}>
              <td>{__('Current Status')}</td>
              <td>{__('Value')}</td>
            </tr>
            <tr className={style.accordionContent}>
              <td>{__('Due Date')}</td>
              <td>{__('Value')}</td>
            </tr>
            <tr className={style.accordionContent}>
              <td>{__('Assignee')}</td>
              <td>{__('Value')}</td>
            </tr>
          </Panel>
        </Collapse>
        <br />
      </div>
    );
  }
}

export default Accordion;
