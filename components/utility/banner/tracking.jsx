import React from 'react';
import Technowiz from '../../../image/technowiz.png';
import { Col } from 'antd';
import IsoWidgetsWrapper from '../../../containers/Widgets/widgets-wrapper';
import SaleWidget from '../../../containers/Widgets/sale/sale-widget.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPoll } from '@fortawesome/free-solid-svg-icons'

export default function () {
    return (
        <div>
            <div>
                <h3><img alt="Technowiz" src={Technowiz} width="10%" /></h3>
                <Col md={6} sm={12} xs={24}>
                    <IsoWidgetsWrapper>
                        {/* Sale Widget */}
                        <SaleWidget price={<a href="/smis/eVoting">{<FontAwesomeIcon icon={faPoll} />} Data Tracking</a>}
                            premium={true}
                            details=""
                        />
                    </IsoWidgetsWrapper>
                </Col>
            </div>
        </div>
    );
}
