import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from '../uielements/popover';
import authAction from '../../redux/auth/actions';
import TopbarDropdownWrapper from './topbarDropdown.style';
import { Link } from 'react-router-dom';
import Default from '../../image/defaults/default.png'
import axios from 'axios';

const { logout } = authAction;

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.advisory = JSON.parse(localStorage.getItem('advisory'));
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    const auth = JSON.parse(localStorage.getItem('auth'));;
    this.state = { visible: false, auth: auth };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const position = this.state.auth.rolename ? (`${this.state.auth.rolename.toUpperCase()} ${this.state.auth.position ? `: ${this.state.auth.position}` : ''}`) : <u>Student</u>
    // const departmentname = this.state.auth.departmentname ? (`${this.state.auth.departmentname.toUpperCase()} ${this.state.auth.departmentname ? `: ${this.state.auth.departmentname}` : ''}`) : <u>Student</u>
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <a className="isoDropdownLink"><strong>{position}</strong></a>
        {/* <a className="isoDropdownLink"><strong>{departmentname}</strong></a> */}
        {this.advisory ? <Link className="isoDropdownLink" to='/smis/cr/banner'>Home</Link> : <Link className="isoDropdownLink" to='/smis/welcome'>Home</Link>}

        <Link className="isoDropdownLink" to='/smis/profile'>Profile</Link>
        <a className="isoDropdownLink" onClick={this.props.logout}>Logout</a>
      </TopbarDropdownWrapper>
    );

    const profile = `${axios.defaults.baseURL}storage/Users/${this.state.auth.email}/${this.state.auth.profile}`

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div className="isoImgWrapper">
          <div className="rounded-circle border border-dark d-flex align-items-center" style={{ width: 50, height: 50 }}>
            <img
              alt="user"
              width="49"
              height="49"
              src={profile}
              className='rounded-circle img-responsive mx-auto'
              onError={
                (e) => {
                  e.target.onerror = null;
                  e.target.src = Default
                }}
            />
          </div>
          <span className="userActivity online" />
        </div>
      </Popover>
    );
  }
}
export default connect(null, { logout })(TopbarUser);
