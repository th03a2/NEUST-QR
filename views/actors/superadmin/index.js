import React, { Component } from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import { Row, Col } from 'antd';
import basicStyle from '../../../config/basicStyle';
import Button, { ButtonGroup } from '../../../components/uielements/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUserTimes } from '@fortawesome/free-solid-svg-icons'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Popover from '../../../components/uielements/popover';
import { tanong, itala, baguhin, itago } from '../../../talaan';
import Card from './card';
import { SelectOption } from '../../../components/uielements/select';
// import { counter } from '@fortawesome/fontawesome-svg-core';

export default class extends Component {
    constructor() {
        super()
        let auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            entity: 'users',
            models: [],
            model: '',
            exhibit: false,
            activeIndex: 0,
            auth: auth,
            users: []
        };
    }
    componentDidMount() { this.onSearch() }

    onSearch = (key) => {
        tanong(`users/promotion`).then(datas => {
            let users = datas.map(data => {
                return <SelectOption value={data._id}>{data.fullname}</SelectOption>
            })
            this.setState({ users })
        })

        let params = { school: this.state.auth.school_id, role: '6028f7713e320000f40026be' };
        if (key) {
            let p = key.split(',');
            if (p.length > 1) {
                params['lname'] = p[0].trim();
                params['key'] = p[1].trim();
            } else {
                params['key'] = key
            }
        }
        tanong(`${this.state.entity}/superadmin`, params).then(data => { this.setState({ models: [...data] }) })
    }
    onExhibit = (i) => {
        let model = this.state.models[i];
        model.role_id = '6028f7713e320000f40026bf'
        baguhin(
            this.state.entity,
            model._id,
            model,
        )
            .then(
                data => {
                    this.state.users.push(<SelectOption value={data._id}>{data.fullname}</SelectOption>)
                    let models = this.state.models;
                    models.splice(i, 1);
                    this.setState({ models });
                });
    }
    newExhibit = () => {
        this.setState({
            model: {
                user_id: ''
            },
            newModel: true
        });
        this.switchExhibitStatus()
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, exhibit: false });
        }, 2000);
    };

    onSave = async () => {
        await itala(this.state.entity, this.state.model)
            .then(
                data => {
                    let { models } = this.state;
                    models.push(data);
                    this.setState({ models: models });
                });
        tanong(`users/promotion`).then(datas => {
            let users = datas.map(data => {
                return <SelectOption value={data._id}>{data.fullname}</SelectOption>
            })
            this.setState({ users })
        })
    }
    onUpdate = () => {
        baguhin(
            this.state.entity,
            this.state.model._id,
            this.state.model
        )
            .then(
                data => {
                    // console.log(data);
                    // this.state.users.push(<SelectOption value={data._id}>{data.fullname}</SelectOption>)
                    let models = this.state.models;
                    models.splice(this.state.activeIndex, 1);
                    this.setState({ models });
                });
    }
    onDelete = async (i, pk) => {
        let has_removed = await itago(this.state.entity, pk)
        if (has_removed) {
            let models = this.state.models;
            models.splice(i, 1);
            this.setState({ models });
        }
    }
    switchExhibitStatus() { this.setState({ exhibit: !this.state.exhibit }) }
    handleSearchReset = (key) => this.onSearch(key)

    // Callback function
    closeModal = () => this.switchExhibitStatus()
    handleSubmit = (model) => {
        this.setState({ model });
        this.state.newModel ? this.onSave() : this.onUpdate();
        this.switchExhibitStatus()
    }
    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        let writer = this.state.models.map((model, index) => {
            return (
                <tr key={model._id}>
                    <td>{index + 1}</td>
                    <td>{model.fullname}</td>
                    <td className="text-capitalize">{model.rolename}</td>
                    <td className="text-capitalize">{model.position}</td>
                    <td>{model.is_male ? 'Male' : 'Female'}</td>
                    <td>{model.lrn}</td>
                    <td>{model.dob}</td>
                    <td>{model.pob}</td>
                    <td>
                        <ButtonGroup>
                            <Popover content="Demote" placement="left">
                                <Button className="btn btn-outline-danger">
                                    <FontAwesomeIcon icon={faUserTimes} onClick={this.onExhibit.bind(this, index, model._id)} />
                                </Button>
                            </Popover>
                            {/* <Popover content="Delete" placement="right"                            >
                                <Button className="btn btn-outline-danger" onClick={this.onDelete.bind(this, index, model._id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </Popover> */}
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })
        return (
            <LayoutContentWrapper>
                <LayoutContent>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={23} sm={12} xs={24} style={colStyle}>
                            <h2>Superadmin</h2>
                        </Col>
                        <Col md={1} sm={12} xs={24} style={colStyle}>
                            <ButtonGroup>
                                <Popover content='Add a User' >
                                    <Button className="btn btn-outline-primary" onClick={this.newExhibit}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                </Popover>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <MDBTable striped hover responsive>
                        <MDBTableHead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Position</th>
                                <th>Gender</th>
                                <th>LRN</th>
                                <th>DOB</th>
                                <th>POB</th>
                                <th>Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>{writer}</MDBTableBody>
                    </MDBTable>
                </LayoutContent>
                <Card
                    model={this.state.model}
                    newModel={this.state.newModel}
                    exhibit={this.state.exhibit}
                    onClose={this.closeModal}
                    onSubmit={this.handleSubmit}
                    role={this.state.auth.role.name}
                    users={this.state.users}
                />
            </LayoutContentWrapper>
        );
    }
}
