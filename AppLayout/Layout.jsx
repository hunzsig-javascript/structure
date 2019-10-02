import React, {Component} from 'react';
import {Toast} from 'antd-mobile';
import './Layout.scss';
import Api from 'api';

export default class AppLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
    if (Api.auth.isOnline() === false) {
      Toast.fail('login offline', 3.00);
      if (window.location.hostname.indexOf('127.0.0.1') === 0 || window.location.hostname.indexOf('localhost') === 0) {
        this.props.history.replace('/sign/in');
      } else {
        this.props.history.replace(Api.auth.getLoginPath());
      }
    }
  }

  componentDidMount() {
    Api.connect().cache('User.Info.getInfo', {uid: Api.auth.getUid()}, (resUser) => {
      if (resUser.code === 200) {
        // nothing
      } else {
        Toast.fail(resUser.response);
      }
    });
  }

  to = (url) => {
    this.props.history.push(url);
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
