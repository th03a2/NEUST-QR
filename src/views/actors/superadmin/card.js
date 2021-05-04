import React, { Component } from 'react'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup, } from '../../../components/uielements/input';
import Modals from '../../../components/modal';
import ModalStyle from '../../../components/modal/modal.style';
import WithDirection from '../../../config/withDirection';
import Button from '../../../components/uielements/button';
import { Col } from 'antd';
import { listahan } from '../../../talaan';
import Select, { SelectOption } from '../../../components/uielements/select';


const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: '',
            loading: false,
            roles: undefined,
            schools: undefined
        };
    }
    componentDidMount() {
        listahan('roles', { name: this.props.role }).then(roles => {
            let access = roles.map(role => {
                return <SelectOption value={role._id}>{role.display_name}</SelectOption>
            })
            this.setState({ roles: access })
        })
        listahan('schools/details').then(models => {
            console.log(models);
            let schools = models.map(school => {
                return <SelectOption value={school._id}>{school.name}</SelectOption>
            })
            this.setState({ schools })
        })
    }
    onChange = e => { this.setState({ [e.target.name]: e.target.value }) }
    handleClose = () => this.props.onClose()
    onSubmit = (e) => {
        e.preventDefault();
        let model = this.state.model;
        this.props.onSubmit(model)
    }
    render() {
        // eslint-disable-next-line
        if (this.props.exhibit) { this.state.model = this.props.model }

        return (
            <Modal
                visible={this.props.exhibit}
                title={this.props.newModel ? "Promote a Superadmin" : "Demote Superadmin"}
                onOk={this.handleOk}
                onCancel={this.handleClose}
                footer={[
                    <Button key="back" size="large" type="danger" onClick={this.handleClose}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        size="large"
                        loading={this.state.loading}
                        onClick={this.onSubmit}
                    >
                        {this.props.newModel ? "Submit" : "Update"}
                    </Button>,
                ]}
            >
                {this.props.newModel ?
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="User"
                                disabled={true}
                            />
                            <Select
                                style={{ width: '80%' }}
                                placeholder="Select User"
                                value={this.state.model.user_id !== '' ? this.state.model.user_id : ''}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.user_id = e
                                    this.setState({ model });
                                }}
                            >
                                {this.props.users}
                            </Select>
                        </InputGroup>
                    </Col>
                    :
                    <InputGroup size="large" style={{ marginBottom: '15px' }}>
                        <Col span="24">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Name"
                                    disabled={true}
                                />
                                <Input
                                    style={{ width: '80%' }}
                                    placeholder="Enter Name"
                                    disabled={true}
                                    value={this.state.model.fullname || ''}
                                />
                            </InputGroup>
                        </Col>
                        <Col span="24">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Role"
                                    disabled={true}
                                />
                                <Select
                                    style={{ width: '80%' }}
                                    placeholder="Enter Role"
                                    defaultValue={this.state.model.role_id === '6028f7713e320000f40026be' ? this.state.model.role.display_name : ''}

                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.role_id = e
                                        this.setState({ model });
                                    }}
                                >
                                    {this.state.roles}
                                </Select>
                            </InputGroup>
                        </Col>
                        {this.state.model.role_id === "6028f7713e320000f40026bf" &&
                            <Col span="24">
                                <InputGroup compact style={{ marginBottom: '15px' }}>
                                    <Input
                                        style={{ width: '20%' }}
                                        defaultValue="Tag school"
                                        disabled={true}
                                    />
                                    <Select
                                        style={{ width: '80%' }}
                                        placeholder="Enter Tag school"
                                        defaultValue={this.state.model.schoolname || ''}

                                        onChange={(e) => {
                                            let { model } = this.state;
                                            model.school_id = e
                                            this.setState({ model });
                                        }}
                                    >
                                        {this.state.schools}
                                    </Select>
                                </InputGroup>
                            </Col>}
                    </InputGroup>
                }

            </Modal>
        )
    }
}