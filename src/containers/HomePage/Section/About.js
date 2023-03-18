import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';
import { FormattedMessage } from 'react-intl';


class About extends Component {



    render() {

        return (
            <div className='section-about-outer'>
                <div className='section-share section-about'>
                    <div className='section-about-header'>
                        Truyền thông nói về C0622G1
                    </div>
                    <div className='section-about-content'>
                        <div className='content-left'>
                            <iframe width="100%" height="400px"
                                src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                                title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className='content-right'>
                            <p>Hiện tại, mình đang đi làm fulltime, vì vậy không thể dành 100% thời gian
                                làm video khóa học này được.
                                Tuy nhiên, mình luôn cố gắng để làm video đều đặn và thường xuyên,
                                vì mình nhận được rất nhiều tin nhắn cũng như comment của các bạn,
                                mong muốn được học khóa học này ❤
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
