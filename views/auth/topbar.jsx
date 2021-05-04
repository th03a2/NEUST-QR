import React, { Component } from 'react';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
} from 'mdbreact';
import Login from './forms/login';
import Register from './forms/register';

export default class extends Component {
    state = {
        collapseID: ''
    };

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ''
        }));

    render() {
        const overlay = (
            <div
                id='sidenav-overlay'
                style={{ backgroundColor: 'transparent' }}
                onClick={this.toggleCollapse('mainNavbarCollapse')}
            />
        );

        const { collapseID } = this.state;

        return (
            <div>
                <MDBNavbar className="indigo accent-4" dark expand="md" fixed="top" scrolling>
                    <MDBNavbarBrand className='py-0 font-weight-bold'>
                        <strong className='align-middle'>NEUST-Express Assistance</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <Login />
                        </MDBNavItem>
                        <MDBNavItem>
                            <Register />
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBNavbar>
                {collapseID && overlay}
            </div>
        );
    }
}
