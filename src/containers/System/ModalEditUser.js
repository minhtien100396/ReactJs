import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import logger from 'redux-logger';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        let user = this.props.userEdit;
        //let {userEdit} = this.props; : cách viết nhanh
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashcode ',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggleFromUserEditParent();
    }

    handleOnChangeInput = (event, id) => {
        //bad code  
        /**
         * this.state = {
         * email:''
         * password:''
         * firstName:''
         * lastName:''
         * address:''
         * }
         * 
         * Để lấy ra giá trị của state
         * this.state.email <=> this.state['email']
         */
        // id ở đây là pram động gồm nhìu trường như: email, password,..
        // event.target.value : giá trị update sau khi nhập
        // this.state[id] = event.target.value; (modifier trực tiếp)
        // this.setState({
        //     // ...: coppy lại state ở trên đã cập nhật
        //     ...this.state
        // }, () => {
        //     console.log('a', this.state);
        // })

        //good code: coppy state lại rồi modifier(sửa đổi) 

        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('state', this.state);
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['firstName', 'lastName', 'address'];
        // formap() || forEach(): khoogn dùng được câu lệnh break
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api create modal
            this.props.editUser(this.state);
        }
    }

    render() {
        console.log('con', this.props);

        // toggle: kích ra 
        return (
            < Modal isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size="lg" // sm, md, lg 
            // centered: nằm giữa
            >
                <ModalHeader toggle={() => this.toggle()}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className='model-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type='text'

                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                type='password'
                                value={this.state.password}
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                value={this.state.firstName}

                            />
                        </div>
                        <div className='input-container'>
                            <label>Lats Name</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                value={this.state.address}
                            />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3'
                        onClick={() => this.handleSaveUser()}
                    >Save changes</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => this.toggle()}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



