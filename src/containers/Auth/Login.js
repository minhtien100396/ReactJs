import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import logger from 'redux-logger';
import { handleLogginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }
    handleOnchangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }

    handleLoggin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLogginApi(this.state.username, this.state.password);
            if (data && data.errCode != 0) {
                this.setState({
                    errMessage: data.errMessage
                });
            }

            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }

        } catch (error) {
            // console.log('aaaaaaaaa', error.response);
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.errMessage
                    })
                }
            }

        }

    }
    render() {
        //JSX

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input placeholder='Enter your username' type='text' className='form-control'
                                value={this.state.username}
                                onChange={(event) => this.handleOnchangeUsername(event)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input placeholder='Enter your password' type={this.state.isShowPassword ? 'text' : 'password'} className='form-control'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnchangePassword(event)} />
                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>

                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button type='submit' className='btn-login' onClick={() => { this.handleLoggin() }}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center text-orther-login'>
                            <span>Or Login With:</span>
                        </div>
                        <div className='col-12 social-loggin'>
                            <i className="fab fa-google google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
