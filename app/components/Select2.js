import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'select2';

export default class Select2 extends Component {



  constructor(props) {
    super(props);
    this.el = null;
  }

  componentDidMount() {
    this.el = $(ReactDOM.findDOMNode(this));
    this.el.select2(this.props);

    this.props.events.forEach(event => {
      this.el.on(event[0], this.props[event[1]]);
    });
  }

  componentWillUnmount() {
    this.el.select2('destroy');
  }

  render() {
    return (
        <select id={this.props.id} className="form-control col-md-5">

        </select>
    );
  }
}

Select2.propTypes = {
  data: PropTypes.array,
  tags:PropTypes.bool,
  events: PropTypes.array,
  options: PropTypes.object,
  multiple: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  onUnselect: PropTypes.func
};
Select2.defaultProps =  {
  data: [],
  events: [
    ['change', 'onChange'],
    ['select2:open', 'onOpen'],
    ['select2:close', 'onClose'],
    ['select2:select', 'onSelect'],
    ['select2:unselect', 'onUnselect']
  ],
  options: {},
  multiple: false
};