import React, { Component } from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import axios from 'axios';
import { MDBIframe } from 'mdbreact';

export default class extends Component {
    constructor() {
        super();
        this.auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            data: undefined,
            attachments: this.auth.attachments || []
        }
    }
    render() {
        console.log(this.state.attachments);
        return (
            <LayoutContentWrapper >
                <LayoutContent>
                    {this.state.attachments.map(data =>
                        <button className={`btn btn-info`} onClick={() => { this.setState({ file: data }) }}>{data.slice(4, 12).split('.')[0]}</button>
                    )}
                    {this.state.file && <MDBIframe src={`${axios.defaults.baseURL}storage/Users/${this.auth.email}/${this.state.file}`} />}
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}
