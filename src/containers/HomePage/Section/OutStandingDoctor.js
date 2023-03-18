import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutStandingDoctor.scss'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
class OutStandingDoctor extends Component {

    render() {

        return (
            <div className='section-share section-out-standing-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize '>
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-out-standing-doctor' />
                                        <div className='position text-center'>
                                            <div>Giáo sư, Tiến sĩ Bùi Minh Tiến</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize '>
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-out-standing-doctor' />
                                        <div className='position text-center'>
                                            <div>Giáo sư, Tiến sĩ Bùi Minh Tiến</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize '>
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-out-standing-doctor' />
                                        <div className='position text-center'>
                                            <div>Giáo sư, Tiến sĩ Bùi Minh Tiến</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize '>
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-out-standing-doctor' />
                                        <div className='position text-center'>
                                            <div>Giáo sư, Tiến sĩ Bùi Minh Tiến</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize '>
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-out-standing-doctor' />
                                        <div className='position text-center'>
                                            <div>Giáo sư, Tiến sĩ Bùi Minh Tiến</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-out-standing-doctor' />
                                        <div className='position text-center'>
                                            <div>Giáo sư, Tiến sĩ Bùi Minh Tiến</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>

                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);