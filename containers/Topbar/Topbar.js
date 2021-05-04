import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import appActions from '../../redux/app/actions';
import TopbarWrapper from './topbar.style';
import {
  TopbarUser,
  TopbarPlatforms
} from '../../components/topbar';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

class Topbar extends Component {
  constructor() {
    super()
    this.auth = JSON.parse(localStorage.getItem('auth'));
    this.advisory = JSON.parse(localStorage.getItem('advisory'));
    this.newbies = this.auth.role_id === "60764981ea6c0000fa00595b" || this.auth.role_id === "6028f7713e320000f40026c2" ? this.advisory && this.advisory.lenght > 0 ? true : false : true;
  }
  render() {
    const { toggleCollapsed, url, customizedTheme } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    const styling = {
      background: customizedTheme.backgroundColor,
      position: 'fixed',
      width: '100%',
      height: 70,
    };
    let is_faculty = false


    if (this.auth.rolename === "student" || this.auth.rolename === "staff") {
      is_faculty = false
    } else {
      is_faculty = true
    }

    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={collapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'}>
          <ul className="isoLeft">
            <li>
              {this.newbies &&
                <button
                  className={collapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'}
                  style={{ color: customizedTheme.textColor }}
                  onClick={toggleCollapsed}
                />
              }
            </li>
            <li>
              <div id="demo-2">
                <input id="InputTopbarSearch" type="search" placeholder="Search" autoComplete="off" />
              </div>
            </li>
          </ul>

          <ul className="isoRight">
            {is_faculty &&
              <li onClick={() => this.setState({ selectedItem: 'platform' })} className="isoPlatform">
                <TopbarPlatforms url={url} />
              </li>
            }

            <li onClick={() => this.setState({ selectedItem: 'user' })}
              className="isoUser">
              <TopbarUser />
            </li>
          </ul>
        </Header>
      </TopbarWrapper >
    );
  }
}

export default connect(
  state => ({
    ...state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().topbarTheme,
  }),
  { toggleCollapsed }
)(Topbar);
