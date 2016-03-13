import React, { Component, PropTypes } from 'react';

import styles from './HeaderBar.sass';

export default class HeaderBar extends Component {
  render() {
    return (
      <div className={ styles.headerBar + (this.props.className ? ' ' + this.props.className : '') } >
        <div className={ styles.headerText + (this.props.textClassName ? ' ' + this.props.textClassName : '') } >
          { this.props.header }
          { this.props.subheader &&
            <div className={ styles.subheaderText }>
              { this.props.subheader }
            </div>
          }
        </div>
        <div className={ styles.rightActions } >
          { this.props.actions }
        </div>
      </div>
    );
  }
}

HeaderBar.propTypes = {
  header: PropTypes.any,
  subheader: PropTypes.any,
  actions: PropTypes.node,
  className: PropTypes.string,
  textClassName: PropTypes.string
};
