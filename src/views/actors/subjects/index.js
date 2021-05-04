import React, { Component } from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import { Row, Col } from 'antd';
import basicStyle from '../../../config/basicStyle';
import Button, { ButtonGroup } from '../../../components/uielements/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Popover from '../../../components/uielements/popover';
import Select, { SelectOption } from '../../../components/uielements/select';
import { tanong, itala, baguhin, itago } from '../../../talaan';
import Card from './card';



export default class extends Component {
    constructor() {
        super()
        let auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            entity: 'subjects',
            models: [],
            model: { name: '', display_name: '' },
            exhibit: false,
            activeIndex: 0,
            auth: auth,
            optionLevel: undefined,
            level: undefined
        };
    }
    componentDidMount() {
        let params = { school: this.state.auth.school_id };
        tanong(this.state.entity, params).then(datas => {
            this.setState({ models: [...datas] })
            let distictLevel = [...new Set(datas.map(data => data.level_id))]
            distictLevel.sort((a, b) => { return Number(a) - Number(b); }) // Ascending
            let optionLevel = distictLevel.map(level => {
                return <SelectOption key={level} value={level}>Grade {level - 3}</SelectOption>;
            })
            let level = distictLevel[0];
            this.setState({ optionLevel, level })
        })
    }

    onSearch = (key) => {
        let params = { school: this.state.auth.school_id };
        tanong(this.state.entity, params).then(data => {
            this.setState({ models: [...data] })
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
    newExhibit = () => {
        this.setState({
            model: {
                id: '',
                name: '',
                display_name: '',
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

    onSave = () => {
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
        let writer = this.state.models.filter(model => model.level_id === this.state.level).map((model, index) => {
            return (
                <tr key={model._id}>
                    <td>{index + 1}</td>
                    <td>{model.code}</td>
                    <td>{model.name}</td>
                    <td>{model.description}</td>
                    {/* <td>{model.yr_lvl}</td> */}
                    <td>{model.lab}</td>
                    <td>{model.lec}</td>
                    <td>{model.units}</td>
                    <td>
                        <ButtonGroup>
                            <Popover content="Edit" >
                                <Button className="btn btn-outline-info">
                                    <FontAwesomeIcon icon={faEdit} onClick={this.onExhibit.bind(this, index, model._id)} />
                                </Button>
                            </Popover>
                            <Popover
                                content="Delete"
                                placement="right"
                            >
                                <Button className="btn btn-outline-danger" onClick={this.onDelete.bind(this, index, model._id)}>
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
                            <h1>Subjects</h1>
                            <label style={{ fontSize: 16 }}>Grade Level : </label>
                            <Select
                                style={{ width: '20%' }} value={this.state.level || ''}
                                onChange={async (e) => {
                                    let { level } = this.state;
                                    level = e
                                    await this.setState({ level });
                                }}
                            >
                                {this.state.optionLevel}
                            </Select>
                        </Col>
                        <Col md={1} sm={12} xs={24} style={colStyle}>
                            <ButtonGroup>
                                <Popover content='Add a Subjects' >
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
                                <th rowSpan="2">#</th>
                                <th rowSpan="2">Code</th>
                                <th rowSpan="2">Name</th>
                                <th rowSpan="2">Description</th>
                                {/* <th rowSpan="2">Year Level</th> */}
                                <th colSpan="2" className="text-center">Units</th>
                                <th rowSpan="2">Tot Units</th>
                                <th rowSpan="2">Action </th>
                            </tr>
                            <tr>
                                <th>Lecture</th>
                                <th>Laboratory</th>
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
                />
            </LayoutContentWrapper>
        );
    }
}
