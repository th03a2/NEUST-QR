import React from 'react';
import ModalStyle from '../../../containers/Feedback/Modal/modal.style';
import Modals from '../../../components/feedback/modal';
import WithDirection from '../../../config/withDirection';
import { MDBIcon, MDBInput } from 'mdbreact';

//Log in
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Actions from '../../../redux/platformSwitcher/actions.js';
import authAction from '../../../redux/auth/actions';
// Database
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../../../firebase'


const { switchActivation, changePlatform } = Actions;

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

const { login } = authAction;

const getDefaultUrl = role => {
    switch (role) {
        case 'dev': return { pathname: '/smis/hq/banner' }
        case 'superadmin': return { pathname: '/smis/hq/banner' }
        default: return { pathname: '/smis/admission/banner' }
    }
}

class Login extends React.Component {
    state = {
        visible: false,
        login: 'door-open',
        model: {
            email: undefined,
            password: undefined
        },
        redirectToReferrer: false,
        message: undefined,
        has_msg: false,
        from: { pathname: '/smis/enrollment/banner' }
    };

    // componentDidMount() { axios.get('sanctum/csrf-cookie', { withCredentials: true }) }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (
            this.props.isLoggedIn !== nextProps.isLoggedIn &&
            nextProps.isLoggedIn === true
        ) {
            this.setState({ redirectToReferrer: true });
        }
    }

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        });
    };

    submitHandler = async (event) => {
        event.preventDefault();
        this.setState({ login: 'door-closed' });
        const { email, password } = this.state.model

        // try {
        const authRef = await this.props.firebase.signInWithEmailAndPassword(email, password)
        const userDoc = await this.props.firebase.user(authRef.user.uid)
        const user = await userDoc.get()

        const rolename = 'dev';
        this.redirectToLandingPage(user.data())
        this.setState({ redirectToReferrer: true, from: getDefaultUrl(rolename) })
        // this.props.history.push(PATHS.flights)
        // } catch (error) {
        // console.log(error);
        // this.setState({ loading: false, error: utils.authErrorHandler(error) })
        // }

        // await axios.post('api/auth/login', this.state.model).then(res => {
        //     if (res.status === 200) {
        //         let { token, user } = res.data;
        //         localStorage.setItem('token', token);
        //         const { rolename } = user;
        //         const { changePlatform } = this.props
        //         let myCurrentApp = user.currentApp || getDeafultPlatform(rolename);
        //         localStorage.setItem('auth', JSON.stringify(user));

        //         localStorage.getItem('advisory')
        //         this.setState({ redirectToReferrer: true, from: getDefaultUrl(rolename) })
        //         changePlatform(myCurrentApp)

        //         const { login } = this.props;
        //         login();
        //     } else {
        //         alert('something went wrong')
        //     }
        // });
    }

    changeHandler = (event) => {
        let { model } = this.state;
        model[event.target.name] = event.target.value;
        this.setState({ model });
    }

    render() {
        const { email, password } = this.state.model;
        const { has_msg, message, redirectToReferrer, from } = this.state;
        if (redirectToReferrer) { return <Redirect to={from.pathname} />; }

        return (
            <div>
                <strong className='nav-link Ripple-parent' onClick={this.toggle}>
                    <span>LOGIN</span>
                </strong>
                <Modal
                    visible={this.state.visible}
                    title="LOGIN FORM"
                    onCancel={this.toggle}
                    footer={null}
                >
                    <form onSubmit={this.submitHandler} method="POST">
                        {has_msg &&
                            <div className='alert alert-warning' >
                                <MDBIcon icon='exclamation-triangle' className="text-danger" /> <strong className="text-dark">{message}</strong>
                            </div>}
                        <MDBInput
                            type="text"
                            icon="user"
                            label="E-mail | LRN | Mobile number"
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
                        <div className="text-center mt-4">
                            <button className="btn btn-primary" type="submit">
                                <MDBIcon icon={this.state.login} /> Login
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default
    compose(
        withFirebase,
        withRouter
    )(connect(state => ({
        isLoggedIn: true,
        ...state.PlatformSwitcher.toJS()
    }),
        { switchActivation, changePlatform, login })(Login));

