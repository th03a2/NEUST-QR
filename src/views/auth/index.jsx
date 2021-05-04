import {
    MDBCol,
    MDBRow,
    MDBEdgeHeader,
    MDBFreeBird,
    MDBCardBody,
    MDBAnimation,
    MDBContainer,
    MDBCard,
    MDBCardTitle,
    MDBIcon,
    MDBCardText,
} from 'mdbreact';
import React, { Component } from 'react';
import './index.css';
import Topbar from './topbar';

export default class extends Component {
    render() {
        return (
            <div>
                <Topbar />
                <MDBEdgeHeader color='darken-3' className='sectionPage indigo accent-4' />
                <div className='mt-3 mb-5'>
                    <MDBFreeBird>
                        <MDBRow>
                            <MDBCol
                                md='10'
                                className='mx-auto float-none white z-depth-1 py-2 px-2'
                            >
                                <MDBCardBody className='text-center'>
                                    <h2 className='h2-responsive mb-4'>
                                        <strong className='font-weight-bold'>
                                            Home
                                        </strong>
                                    </h2>
                                    <MDBRow />
                                    <p>React Bootstrap with Material Design</p>
                                    <p className='pb-4'>
                                        This application shows the actual use of MDB React
                                        components in the application.
                                    </p>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBFreeBird>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md='12' className="mt-4">
                                <h2 className='text-center my-5 font-weight-bold'>
                                    Why is it so great?
                                </h2>
                                <p className='text-center text-muted mb-1'>
                                    Google has designed a Material Design to make the web more
                                    beautiful and more user-friendly.
                                </p>
                                <p className='text-center text-muted mb-1'>
                                    Twitter has created a Bootstrap to support you in faster and
                                    easier development of responsive and effective websites.
                                </p>
                                <p className='text-center text-muted'>
                                    We present you a framework containing the best features of
                                    both of them - Material Design for Bootstrap.
                                </p>
                                <hr className='my-5' />

                                <MDBRow id="categories">
                                    <MDBCol md='4'>
                                        <MDBAnimation reveal type='fadeInLeft'>
                                            <MDBCard cascade className='my-3 grey lighten-4'>
                                                <img
                                                    alt="#"
                                                    className="img-fluid"
                                                    src='https://mdbootstrap.com/wp-content/uploads/2016/08/mdb.jpg'
                                                />
                                                <MDBCardBody cascade className='text-center'>
                                                    <MDBCardTitle>
                                                        <MDBIcon
                                                            icon='css3'
                                                            brand
                                                            className='pink-text pr-2'
                                                        />
                                                        <strong>CSS</strong>
                                                    </MDBCardTitle>
                                                    <MDBCardText>
                                                        Animations, colours, shadows, skins and many more!
                                                        Get to know all our css styles in one place.
                                                    </MDBCardText>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBAnimation>
                                    </MDBCol>
                                    <MDBCol md='4'>
                                        <MDBAnimation reveal type='fadeInDown'>
                                            <MDBCard cascade className='my-3 grey lighten-4'>
                                                <img
                                                    alt="#"
                                                    className="img-fluid"
                                                    src='https://mdbootstrap.com/img/Marketing/mdb-press-pack/mdb-main.jpg'
                                                />
                                                <MDBCardBody cascade className='text-center'>
                                                    <MDBCardTitle>
                                                        <MDBIcon icon='cubes' className='blue-text pr-2' />
                                                        <strong>COMPONENTS</strong>
                                                    </MDBCardTitle>
                                                    <MDBCardText>
                                                        Ready-to-use components that you can use in your
                                                        applications. Both basic and extended versions!
                                                    </MDBCardText>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBAnimation>
                                    </MDBCol>
                                    <MDBCol md='4'>
                                        <MDBAnimation reveal type='fadeInRight'>
                                            <MDBCard cascade className='my-3 grey lighten-4'>
                                                <img
                                                    alt="#"
                                                    className="img-fluid"
                                                    src='https://mdbootstrap.com/wp-content/uploads/2018/11/mdb-jquery-free.jpg'
                                                />
                                                <MDBCardBody cascade className='text-center'>
                                                    <MDBCardTitle>
                                                        <MDBIcon icon='code' className='green-text pr-2' />
                                                        <strong>ADVANCED</strong>
                                                    </MDBCardTitle>
                                                    <MDBCardText>
                                                        Advanced components such as charts, carousels,
                                                        tooltips and popovers. All in Material Design
                                                        version.
                                                    </MDBCardText>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBAnimation>
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow id='categories'>
                                    <MDBCol md='4'>
                                        <MDBAnimation reveal type='fadeInLeft'>
                                            <MDBCard cascade className='my-3 grey lighten-4'>
                                                <img
                                                    alt="#"
                                                    className="img-fluid"
                                                    src='https://mdbootstrap.com/wp-content/uploads/2017/06/navigation-1.jpg'
                                                />
                                                <MDBCardBody cascade className='text-center'>
                                                    <MDBCardTitle>
                                                        <MDBIcon icon='bars' className='pink-text pr-2' />
                                                        <strong>NAVIGATION</strong>
                                                    </MDBCardTitle>
                                                    <MDBCardText>
                                                        Ready-to-use navigation layouts, navbars,
                                                        breadcrumbs and much more! More about our navigation
                                                        components.
                                                    </MDBCardText>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBAnimation>
                                    </MDBCol>
                                    <MDBCol md='4'>
                                        <MDBAnimation reveal type='fadeIn'>
                                            <MDBCard cascade className='my-3 grey lighten-4'>
                                                <img
                                                    alt="#"
                                                    className="img-fluid"
                                                    src='https://mdbootstrap.com/wp-content/uploads/2015/08/forms.jpg'
                                                />
                                                <MDBCardBody cascade className='text-center'>
                                                    <MDBCardTitle>
                                                        <MDBIcon icon='edit' className='blue-text pr-2' />
                                                        <strong>FORMS</strong>
                                                    </MDBCardTitle>
                                                    <MDBCardText className='mb-4 pb-3'>
                                                        Inputselecst, date and time pickers. Everything in
                                                        one place is ready to use!
                                                    </MDBCardText>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBAnimation>
                                    </MDBCol>
                                    <MDBCol md='4'>
                                        <MDBAnimation reveal type='fadeInRight'>
                                            <MDBCard cascade className='my-3 grey lighten-4'>
                                                <img
                                                    alt="#"
                                                    className="img-fluid"
                                                    src='https://mdbootstrap.com/wp-content/uploads/2015/08/table-fb.jpg'
                                                />
                                                <MDBCardBody cascade className='text-center'>
                                                    <MDBCardTitle>
                                                        <MDBIcon icon='table' className='green-text pr-2' />
                                                        <strong>TABLES</strong>
                                                    </MDBCardTitle>
                                                    <MDBCardText>
                                                        Basic and advanced tables. Responsive, datatables,
                                                        with sorting, searching and export to csv.
                                                    </MDBCardText>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBAnimation>
                                    </MDBCol>
                                </MDBRow>

                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}
