import React, {Component} from 'react';
import {Layout, message} from 'antd';
import {withRouter} from 'react-router-dom';
import {Auth} from 'api';

import './Layout.scss';

const {Content} = Layout;

class hLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    if (Auth.isOnline() === false) {
      message.error('login offline', 3.00);
      this.props.history.replace(Auth.getLoginPath());
    }
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <Layout style={style.FullHV}>
        <Content style={style.Content} id="layout">
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

const style = {
  loading: {width: '100%', marginTop: '100px'},
  FullHV: {minHeight: '100hv'},
  Layout: {height: '100hv', display: 'flex', flexDirection: 'column'},
  Header: {margin: 0, padding: 0},
  HeaderMenu: {lineHeight: '50px'},
  Content: {margin: 0, background: '#ffffff'},
};

export default withRouter(hLayout);
