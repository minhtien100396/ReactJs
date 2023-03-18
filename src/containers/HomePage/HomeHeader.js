import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.svg.svg'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant'
import { changeLanguageApp } from '../../store/actions/appActions'
class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    render() {
        const { processLogout, language } = this.props;
        console.log('check props', this.props);
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo} />
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="homeheader.speciality" /></b>
                                </div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.searchdoctor" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="homeheader.health-facility" /></b>
                                </div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.select-room" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="homeheader.doctor" /></b>
                                </div>
                                <div className='sub-title'>
                                    <div className='sub-title'>
                                        <FormattedMessage id="homeheader.select-doctor" />
                                    </div>
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="homeheader.fee" /></b>
                                </div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i>
                                <div className='text-support'>
                                    <FormattedMessage id="homeheader.support" />
                                </div>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>
                            <FormattedMessage id="banner.title1" />
                        </div>
                        <div className='title2'>
                            <FormattedMessage id="banner.title2" />
                        </div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm Chuyên Khoa Khám Bệnh' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-hospital-alt"></i> </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child1" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child2" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-notes-medical"></i> </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child3" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-vials"></i> </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child4" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-heartbeat"></i> </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child5" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-hand-holding-heart"></i> </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child6" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment >
        );
    }

}

// map cái state của reduce vào biến props của function này
// inject: giá trị của ngôn ngữ được lưu trong reduce
// trong component chúng ta muốn sử dụng biến lang này thì sử dụng hàm máptateToProps 
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
