import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';
import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {



    render() {

        return (
            <div className='home-footer'>
                <p>&copy; 2022 Bùi Minh Tiến. More Infomation, please visit my facebook.
                    <a target='blank' href='https://www.facebook.com/minhtien.bui.9/'>&#62;&#62; Click here &#60;&#60;</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
