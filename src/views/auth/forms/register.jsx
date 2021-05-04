import React from 'react';
import ModalStyle from '../../../containers/Feedback/Modal/modal.style';
import Modals from '../../../components/feedback/modal';
import WithDirection from '../../../config/withDirection';
import { MDBInput, MDBIcon, MDBRow, MDBCol, MDBBtnGroup } from 'mdbreact';
import Tabs, { TabPane } from '../../../components/uielements/tabs';
import './register.css'
import { Popover } from 'antd';
import Default from '../../../image/defaults/default.png'
import axios from 'axios';
import * as Swal from 'sweetalert2';
import Address from './address';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

//add validation in contact number
//add requirement in forms 
//relocate submit button

class Register extends React.Component {
    state = {
        form: {},
        visible: false,
        register: 'sign-in-alt',
        is_code_unique: true,
        image: undefined,
        submit: false,
        attachments: [],
        model: {
            school_id: "60264978b22e00009a006436",
            email: undefined,
            password: undefined,
            cpassword: undefined,
            image: undefined,
            fname: undefined,
            lname: undefined,
            mname: undefined,
            suffix: undefined,
            dob: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
            is_male: 0,
            contact: undefined,
            attachments: [],
            address: {
                country: 'Philippines',
                region: undefined,
                province: undefined,
                municipality: undefined,
                baranggay: undefined
            },
            role_id: undefined
        }
    };

    toggle = () => {
        this.setState({
            visible: true
        });
    };

    clearState = () => {
        document.getElementById("tab1").click();
        let { model } = this.state;
        model.email = undefined;
        model.password = undefined;
        model.cpassword = undefined;
        model.image = undefined;
        model.fname = '';
        model.lname = '';
        model.mname = '';
        model.suffix = undefined;
        model.dob = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        model.is_male = 0;
        model.contact = '';
        model.attachments = [];
        model.address = {
            country: 'Philippines',
            region: '',
            province: '',
            municipality: '',
            baranggay: ''
        }
        model.role_id = undefined;
        model.profile = undefined;
        model.school_id = "60264978b22e00009a006436"

        this.setState({
            form: {},
            visible: false,
            register: 'sign-in-alt',
            is_code_unique: true,
            image: undefined,
            attachments: [],
            model
        })
    }

    closeModal = (action) => {
        if (action === 'submit') {
            this.clearState()
        } else {
            Swal.fire({
                title: 'Are you sure to close this?',
                text: 'Closing this modal will delete all filled up data.',
                showDenyButton: true,
                confirmButtonText: `Dont close`,
                denyButtonText: `Close`,
            }).then((result) => {
                if (result.isDenied) {
                    this.clearState()
                }
            })
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.message) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You still have error messages, Please read them and follow the instruction'
            })
        } else {
            this.setState({ submit: true, register: 'check-double' })
            let { model, attachments } = this.state;
            if (model.image) {
                this.fileUploadHandler()
            }
            if (attachments) {
                attachments.forEach(name => {
                    let file = model[name.split('_')[1]]
                    this.fileUploadHandler(file, name)
                    model.attachments.push(`${name}.${file.name.split('.').pop()}`)
                    console.log(model[name.split('_')[1]]);
                    console.log(name);
                    console.log(model.attachments);
                })
            }
            model.profile = model.image ? `${model.fname}.${model.image.name.split('.').pop()}` : null
            model.address.region = model.address.region.split('.')[0];
            model.address.province = model.address.province.split('.')[0];
            model.address.municipality = model.address.municipality.split('.')[0];
            axios.post('api/auth/register', model).then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your account has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.closeModal('submit')
            }).catch(err => {
                this.setState({
                    message: err.response.data ? err.response.data.message : null,
                    submit: false
                });
            })
        }
    }

    fileUploadHandler = async (file, name) => {
        console.log(file);
        console.log(name);
        const files = file || this.state.model.image
        const reader = new FileReader()
        reader.readAsDataURL(files);
        reader.onload = () => {
            let { form } = this.state;
            form.file_base64 = reader.result
            form.name = `${name || this.state.model.fname}.${files.name.split('.').pop()}`
            form.url = `Users/${this.state.model.email}`;
            this.setState({ form });
            axios.post('api/auth/upload', this.state.form, {
                onUploadProgress: progressEvent => {
                    console.log('Upload progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
                }
            })
        };
    }

    selectedGender = (key) => {
        let { model } = this.state;
        model.is_male = key;
        this.setState({ model });
    }

    warnUser(message) {
        return <div className='alert alert-warning'>
            <MDBIcon icon='exclamation-triangle' className="text-danger" /> <strong className="text-dark">{message}</strong>
        </div>
    }

    onImageChange = (event) => {
        let { model } = this.state
        model.image = event.target.files[0]
        this.setState({ model, image: URL.createObjectURL(event.target.files[0]) })
    }

    changeHandler = (event) => {
        let key = event.target.name;
        let { model } = this.state;
        model[event.target.name] = event.target.value;
        this.setState({ model });

        if (key === 'email' || key === 'contact') {
            if (key === 'contact') {
                let message;
                if (event.target.value.length < 11) {
                    message = 'Mobile number must be 11 digit';
                } else {
                    message = undefined;
                }
                this.setState({ message })
            }
            let params = { [key]: model[key] };
            return (axios.post('api/auth/exist', params).then(() => {
                this.setState({
                    message: undefined
                })
            }).catch(err => {
                this.setState({
                    message: err.response.data ? err.response.data.message : null
                });
            }))
        } else if (key === 'password') {
            if (model.password.length < 8) {
                this.setState({ message: 'Password must at least be 8 letters or higher.' })
            } else {
                this.setState({ message: undefined })
            }
        } else if (key === 'cpassword') {
            if (model.password !== event.target.value) {
                this.setState({ message: 'Passwords does not match.' })
            }
        }
    }

    handleSubmit = (address) => {
        let { model } = this.state;
        model.address = address;
        this.setState({ model })
    }

    render() {
        const { email, password, cpassword, fname, mname, lname, suffix, dob, is_male, contact } = this.state.model;
        const { image, message, submit, register } = this.state;
        return (
            <div>
                <strong className='nav-link Ripple-parent' onClick={this.toggle}>
                    <span>REGISTER</span>
                </strong>
                <Modal
                    visible={this.state.visible}
                    title="REGISTRATION FORM"
                    onCancel={this.closeModal}
                    footer={null}
                >
                    <form onSubmit={this.submitHandler}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span id="tab1">Account</span>} key="1">
                                <div className="container-fluid">
                                    <MDBRow>
                                        <MDBCol className="text-center">
                                            <div className="hoverImage mx-auto">
                                                <img
                                                    id="target"
                                                    width='125'
                                                    height='125'
                                                    src={image || Default}
                                                    alt='avatar'
                                                    className='rounded-circle img-responsive imageHover'
                                                />
                                                <div className="middleButton">
                                                    <Popover content="Upload a 2x2 image">
                                                        <label htmlFor="2x2-upload" className="btn btn-primary">
                                                            <MDBIcon icon='upload' />
                                                        </label>
                                                        <input
                                                            onChange={this.onImageChange}
                                                            style={{ display: 'none' }} type="file" accept="image/x-png,image/gif,image/jpeg" id="2x2-upload" />
                                                    </Popover>
                                                </div>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBInput
                                        type="email"
                                        icon="at"
                                        label="E-mail address"
                                        name="email"
                                        value={email}
                                        onChange={(event) => this.changeHandler(event)}
                                        required
                                    />
                                    <MDBInput
                                        type="password"
                                        icon="lock"
                                        label="Password"
                                        name="password"
                                        value={password}
                                        onChange={(event) => this.changeHandler(event)}
                                        required
                                    />
                                    <MDBInput
                                        type="password"
                                        icon="lock"
                                        label="Confirm Password"
                                        name="cpassword"
                                        value={cpassword}
                                        onChange={(event) => this.changeHandler(event)}
                                        required
                                    />
                                </div>
                            </TabPane>
                            <TabPane tab="Profile" key="2">
                                <MDBInput
                                    type="text"
                                    icon="user"
                                    label="First name"
                                    name="fname"
                                    value={fname}
                                    onChange={(event) => this.changeHandler(event)}
                                    required
                                />
                                <MDBInput
                                    type="text"
                                    icon="user"
                                    label="Middle name"
                                    name="mname"
                                    value={mname}
                                    onChange={(event) => this.changeHandler(event)}
                                />
                                <MDBInput
                                    type="text"
                                    icon="user"
                                    label="Last name"
                                    name="lname"
                                    value={lname}
                                    onChange={(event) => this.changeHandler(event)}
                                    required
                                />
                                <MDBRow>
                                    <MDBCol className="d-flex text-align-center">
                                        <MDBIcon icon="superscript" size="2x" className="mx-auto" style={{ width: '10%' }} />
                                        <select
                                            name="suffix"
                                            value={suffix}
                                            onChange={(event) => this.changeHandler(event)}
                                            className="browser-default custom-select"
                                            style={{ width: '90%' }}
                                        >
                                            <option value=''></option>
                                            <option value="SR">SR</option>
                                            <option value="JR">JR</option>
                                            <option value='III'>III</option>
                                            <option value='IV'>IV</option>
                                            <option value='V'>V</option>
                                        </select>
                                    </MDBCol>
                                </MDBRow>
                                <Address onSubmit={this.handleSubmit} />
                                <MDBInput
                                    type="date"
                                    icon="calendar-alt"
                                    label="Date of Birth"
                                    name="dob"
                                    value={dob}
                                    onChange={(event) => this.changeHandler(event)}
                                    required
                                />
                                <MDBInput
                                    type="number"
                                    icon="mobile-alt"
                                    label="Mobile number"
                                    name="contact"
                                    value={contact}
                                    onInput={(event) => {
                                        event.preventDefault()
                                        event.target.value.length <= 11 ?
                                            event.target.value = event.target.value
                                            :
                                            event.target.value = event.target.value.slice(0, -1)
                                        this.changeHandler(event)
                                    }}
                                />
                                <MDBBtnGroup className="w-100">
                                    <button type="button" className={`btn ${is_male === 0 ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => this.selectedGender(0)}>
                                        <MDBIcon icon="male" /> MALE
                                    </button>
                                    <button type="button" className={`btn ${is_male === 1 ? 'btn-secondary' : 'btn-outline-secondary'}`} onClick={() => this.selectedGender(1)}>
                                        <MDBIcon icon="female" /> FEMALE
                                    </button>
                                </MDBBtnGroup>
                            </TabPane>
                        </Tabs>
                        {message && this.warnUser(message)}
                        <div className='text-center mt-4'>
                            <button disabled={submit} className="btn btn-primary" type="submit">
                                <MDBIcon icon={register} /> REGISTER
                                 </button>
                        </div>
                    </form>
                </Modal>
            </div >
        );
    }
}

export default Register;
