import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImageUrl: '',
            isOpen: false,


            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

        }
    }


    async componentDidMount() {
        this.props.getGendersStart();
        this.props.getPositionsStart();
        this.props.getRolesStart();
        this.props.createNewUser({

        });

        // Cách viết khác
        // this.props.dispatch(actions.fetchGenderStart());
        // lấy gender bằng API
        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (e) {
        //     console.log(e);
        // }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //=> sau khi render chạy thì componentDidUpdate() được gọi 
        // nó sẽ so sánh giữa hiện tại và quá khứ 
        // hiện tại: this.props.genderRedux: 3 phần tử 
        // quá khứ: prevProps.genderRedux []
        if (prevProps.genderRedux != this.props.genderRedux) {
            let arrRender = this.props.genderRedux;
            this.setState({
                genderArr: arrRender,
                gender: arrRender && arrRender.length > 0 ? arrRender[0].key : ''
            })
        }
        if (prevProps.positionRedux != this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
            })
        }
        if (prevProps.roleRedux != this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : ''
            })
        }

        if(prevProps.listUsers != this.props.listUsers) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
    
            })
        }
    }
    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImageUrl: objectUrl,
                avatar: file
            })
        }

    }
    openPreviewImage = () => {
        if (this.state.previewImageUrl) {
            this.setState({
                isOpen: true
            })
        }
    }

    onChangeInput = (event, id) => {
        //đối với react không được mutate trực tiếp state mà phải coppy ra
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('state full', this.state)
        })

        //  email: '',
        // password: '',
        // firstName: '',
        // lastName: '',
        // phoneNumber: '',
        // address: '',
        // gender: '',
        // position: '',
        // role: '',
        // avatar: '',
    }

    handleSaveUser = () => {
        let isValid = this.checkValidate();
        if (!isValid) {
            return;
        }
       
        //fire redux action
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position
        })
        // setTimeout(() => {
        //     this.props.fetchUsersRedux();
        // }, 1000)
    }

    checkValidate = () => {
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber',
            'address'];
        let isValid = true;

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }
    render() {
        let genders = this.props.genderRedux;
        let language = this.props.language
        let isGetGenders = this.props.isGetGenders;
        let positions = this.props.positionRedux;
        let roles = this.props.roleRedux;
        let { email, password, firstName, lastName, phoneNumber,
            address, gender, position, role, avatar } = this.state

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Quản Lý Người Dùng
                </div>
                <div>{isGetGenders === true ? 'loading gender' : ''}</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>
                                <FormattedMessage id="manage-use.add" />
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-use.email" /></label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-use.password" /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                />
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-use.lastName" /></label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-use.firstName" /></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-use.phoneNumber" /></label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-9'>
                                <label> <FormattedMessage id="manage-use.address" /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-use.gender" /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-use.position" /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })}

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-use.role" /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-use.image" /></label>
                                <div className='priview-image-container'>
                                    <input hidden type='file' id="preview-image"
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='preview-image'>Tải ảnh<i class="fas fa-cloud-upload-alt"></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-3'
                                onClick={() => this.handleSaveUser()}
                            >
                                <button className='btn btn-primary'><FormattedMessage id="manage-use.save" /></button>
                            </div>
                            <div className='col-12 mb-5'> 
                                      <TableManageUser />    
                             </div>
                        </div>
                    </div>
                </div>
                                      
                {
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImageUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isGetGenders: state.admin.isLoadingGender,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //Đặt key getGendersStart cho action fetchGenderStart và truy cậpa
        // thông qua props: this.props.getGendersStart()
        getGendersStart: () => dispatch(actions.fetchGenderStart()),
        getPositionsStart: () => dispatch(actions.fetchPositionStart()),
        getRolesStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
        fetchUsersRedux: () => dispatch(actions.fetchAllUserStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
