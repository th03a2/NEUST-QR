import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, LocaleProvider } from 'antd';
import { Debounce } from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import { ThemeProvider } from 'styled-components';
import authAction from '../../redux/auth/actions';
import appActions from '../../redux/app/actions';

import Topbar from '../Topbar/Topbar';
import ThemeSwitcher from '../../containers/ThemeSwitcher';

import AppRouter from './AppRouter';
import { siteConfig } from '../../config.js';
import themes from '../../config/themes';
import AppHolder from './commonStyle';
import "./global.css";
import "./scss/style.scss";

import {
  sClassroom,
  fClassroom, fTracking,
  aHeadquarter, aTracking,
  Forbidden
} from '../Sidebar';

const { Content, Footer } = Layout;
const { logout } = authAction;
const { toggleAll } = appActions;
const getSidebar = (sp) => {
  switch (sp) {
    // Student
    case 'sClassroom': return sClassroom
    // Faculty
    case 'fClassroom': return fClassroom
    case 'fTracking': return fTracking
    // Admin
    case 'aHeadquarter': return aHeadquarter
    case 'aTracking': return aTracking
    case 'aForbidden': return Forbidden
    default: console.log('None of the above')
  }
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.auth = JSON.parse(localStorage.getItem('auth'));
    this.advisory = JSON.parse(localStorage.getItem('advisory'));
    this.newbies = this.auth.role_id === "60764981ea6c0000fa00595b" || this.auth.role_id === "6028f7713e320000f40026c2" ? this.advisory ? true : false : true;
    this.state = { platform: this.auth.currentApp }
    // this.newbies = this.advisory ? true : this.auth.role_id ? true : false; // ?
  }

  render() {
    const { url } = this.props.match;
    const { selectedTheme, selectedPlatform } = this.props;
    const Sidebar = getSidebar(selectedPlatform || this.state.platform);

    return (
      <LocaleProvider>
        <ThemeProvider theme={themes[selectedTheme]}>
          <AppHolder>
            <Layout style={{ height: '100vh' }}>
              <Debounce time="1000" handler="onResize">
                <WindowResizeListener
                  onResize={windowSize =>
                    this.props.toggleAll(
                      windowSize.windowWidth,
                      windowSize.windowHeight
                    )}
                />
              </Debounce>
              <Topbar url={url} />
              <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
                {this.newbies && <Sidebar url={url} />}
                <Layout
                  className="isoContentMainLayout"
                  style={{ height: '100vh' }}>
                  <Content
                    className="isomorphicContent"
                    style={{
                      padding: '70px 0 0',
                      flexShrink: '0',
                      background: '#f1f3f6',
                    }}>
                    <AppRouter url={url} />
                  </Content>
                  <Footer
                    style={{
                      background: '#ffffff',
                      textAlign: 'center',
                      borderTop: '1px solid #ededed',
                    }}>
                    {siteConfig.footerText}
                  </Footer>
                </Layout>
              </Layout>
              {this.newbies && <ThemeSwitcher />}
            </Layout>
          </AppHolder>
        </ThemeProvider>
      </LocaleProvider >
    );
  }
}

export default connect(
  state => ({
    selectedTheme: state.ThemeSwitcher.toJS().changeThemes.themeName,
    selectedPlatform: state.PlatformSwitcher.toJS().selectedPlatform.code,
  }),
  { logout, toggleAll }
)(App);
