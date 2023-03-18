import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUser, createNewUserService, deleteUserService, editUserService } from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }


    async componentDidMount() { // giống onInit() trong angular chạy sau constructor
        this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUser('ALL')
        // setState(): là hàm bất đồng bộ, do đó để lấy giá trị của arrUsers 
        // ta phải dùng callback methods lồng vào
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            }, () => {
                console.log(this.state.arrUsers);
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async (data) => {
        try {
            let reponse = await createNewUserService(data);
            if (reponse.message.errCode !== 0) {
                alert(reponse.message.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModal: false
                })

                // emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'yourid' }): muốn truyền data
                emitter.emit('EVENT_CLEAR_MODAL_DATA'); // không truyền data
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
                console.log('ok');
            } else {
                console.log(res.errCode);
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (userEdit) => {
        try {
            let res = await editUserService(userEdit);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUserFromReact();
            } else {
                alert(res.errCode);
            }
        } catch (e) {

        }
    }
    /** Life cycle: vòng đời
     * Khi Run 1 component : 
     * 1. Gọi constructor ->  init state (gọi các state)
     * 2. Chạy vào hàm componentDidMount() (componentDidMount(): khi muốn gán giá trị cho biến state thì sẽ dùng trong hàm dismount())
     * 3. Chạy vào hàm render() (re-render)
     * 
     */
    render() {
        let arrUsers = this.state.arrUsers;
        //prop : viết tắt properties; để truyền dữ liệu từ component cha -> con
        return (

            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggleFromParent={this.toggleUserModal}
                    // Khi truyền một function không thêm dấu ()
                    // bởi vì
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromUserEditParent={this.toggleUserEditModal}
                        // // Khi truyền một function không thêm dấu ()
                        // // bởi vì
                        userEdit={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-center'>Manage user with Tien</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i> Add New User

                    </button>
                </div>
                <div className='users-table mx-3 mt-3'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    < tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>

                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>

                                )
                            })
                            }
                        </tbody>

                    </table>
                </div>
            </div >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
