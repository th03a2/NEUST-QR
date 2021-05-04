import React, { Component } from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import { Row, Col } from 'antd';
import basicStyle from '../../../config/basicStyle';
import Button, { ButtonGroup } from '../../../components/uielements/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Popover from '../../../components/uielements/popover';

import { tanong, itala, baguhin, itago } from '../../../talaan';
import Card from './card.jsx';
import Profile from './profile.jsx';

export default class extends Component {
    constructor() {
        super()
        this.state = {
            url: 'forbidden/attached/authority/schools',
            entity: 'schools/details',
            models: [],
            model: {
                stages: {}
            },
            exhibit: false,
            profile_exhibit: false,
            activeIndex: 0,
        };
        this.key = document.getElementById('InputTopbarSearch');
        this.key.style = "display:block";
    }
    componentDidMount() {
        this.onSearch();
        this.key.addEventListener('keydown', (e) => { if (e.key === 'Enter') { this.onSearch(); this.key.value = ''; } });
    }
    componentWillUnmount() { this.key.removeEventListener('keyup', this.onSearch); }
    onSearch = () => {
        tanong(this.state.url, this.key.value).then(data => {
            this.setState({ models: [...data] }, () => console.log('starts here'))
        })
    }
    onExhibit = (i) => {
        let model = this.state.models[i];
        this.setState({
            model: model,
            newModel: false,
            activeIndex: i
        });
        this.switchExhibitStatus()
    }
    Exhibit = (i) => {
        let model = this.state.models[i];
        this.setState({
            model: model,
            newModel: false,
            activeIndex: i
        });
        this.switchProfileExhibitStatus()
    }
    newExhibit = () => {
        this.setState({
            model: {
                id: undefined,
                name: undefined,
            },
            newModel: true
        });
        this.switchExhibitStatus()
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => { this.setState({ loading: false, exhibit: false }); }, 2000);
    };

    onSave = () => {
        console.log(this.state.model);

        itala(this.state.entity, this.state.model)
            .then(
                data => {
                    let { models } = this.state;
                    models.push(data);
                    this.setState({ models: models });
                });
    }
    onUpdate = () => {
        baguhin(
            this.state.entity,
            this.state.model._id,
            this.state.model
        )
            .then(
                data => {
                    let { models } = this.state;
                    models[this.state.activeIndex] = data;
                    this.setState({ models: models })
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
    switchExhibitStatus = () => { this.setState({ exhibit: !this.state.exhibit }) }
    handleSearchReset(key) { this.onSearch(key) }
    switchProfileExhibitStatus = () => { this.setState({ profile_exhibit: !this.state.profile_exhibit }) }

    // Callback function
    handleSubmit = (model) => {
        this.setState({ model });
        this.state.newModel ? this.onSave() : this.onUpdate();
        this.switchExhibitStatus()
    }
    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        const writer = this.state.models.map((model, index) => {
            const { _id, name, acronyms } = model;
            return (
                <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{acronyms}</td>
                    <td>
                        <ButtonGroup>
                            <Popover content="View" placement="left" >
                                <Button className="btn btn-outline-success" onClick={this.Exhibit.bind(this, index)}>
                                    <FontAwesomeIcon icon={faEye} />
                                </Button>
                            </Popover>
                            <Popover content="Edit" >
                                <Button className="btn btn-outline-info" onClick={this.onExhibit.bind(this, index, _id)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </Popover>
                            <Popover content="Delete" placement="right" >
                                <Button className="btn btn-outline-danger" onClick={this.onDelete.bind(this, index, _id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </Popover>
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
                            <h1>Schools</h1>
                        </Col>
                        <Col md={1} sm={12} xs={24} style={colStyle}>
                            <ButtonGroup>
                                <Popover content='Add a School' >
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
                                <th>Acronym </th>
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
                    onClose={this.switchExhibitStatus}
                    onSubmit={this.handleSubmit}
                />
                <Profile
                    model={this.state.model}
                    newModel={this.state.newModel}
                    exhibit={this.state.profile_exhibit}
                    onClose={this.switchProfileExhibitStatus}
                />
            </LayoutContentWrapper>
        );
    }
}
