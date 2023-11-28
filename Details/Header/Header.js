import React from 'react';
import PropTypes from 'prop-types';

import IconAsBtn from 'tcomponents/atoms/iconAsBtn';

import s from './Header.module.scss';

export default function Header({ title }) {
  return (
    <header className={s.header}>
      <div className={s.header_left} data-testid="header-left">
        <IconAsBtn className="ICON">icon-left-arrow-thick</IconAsBtn>
        <h1 className="FS18 FW600">{title}</h1>
      </div>
      <div className={s.header_right} data-testid="header-right">
        <IconAsBtn className="ICON">icon-reload</IconAsBtn>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
