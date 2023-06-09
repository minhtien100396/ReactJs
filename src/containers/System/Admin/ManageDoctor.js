import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';




const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
           contentMarkdown:'',
           contentHTML:'',
           selectedOption:'',
           description:'',
           listDoctors:[]
        }
    }

    //update lại state
    componentDidMount() {
        this.props.fetchAllDoctor();
    }

    buildDataInputSelect = (inputData) => {
       // Theo mẫu object[{value,label}]
        // const option = [
        //     {value:'chocoalate', label:'Chocolate'},
        //     {value:'tien123',label:'tien123'}
        // ];
        let result  = [];
        let {language} = this.props;
        if(inputData && inputData.length >0) {
            inputData.map((item,index)=> {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            }) 
          
        }
        return result;
    }

    //khi nhận thấy sự thay đổi 
    componentDidUpdate(prevProps,prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors:dataSelect
            })
        }

        if(prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors:dataSelect
            })
        }
    }

    // Finish!
    handleEditorChange = ({ html, text }) =>  {
        this.setState({
            contentMarkdown:text,
            contentHTML:html
        })
    }

    handleSaveContentMarkdown = () => {
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value
        })
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    handleOnchangeDesctiption = (event) => {
        this.setState({
            description : event.target.value
        })
    }     

    render() {
        console.log('satra',this.state.listDoctors)
        return (
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>
                        Tạo thêm thông tin doctors
                    </div>
                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label>Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='content-right form-group'>
                            <label>Thông tin giới thiệu</label>
                            <textarea className='form-control' rows="4"
                                onChange ={(event)=>this.handleOnchangeDesctiption(event)}
                                value = {this.state.description}
                            >

                            </textarea>
                        </div>
                      
                    </div>
                    <div className='manage-doctor-editor'>
                         <MdEditor 
                         style={{ height: '500px' }} 
                         renderHTML={text => mdParser.render(text)} 
                         onChange={this.handleEditorChange} />
                    </div>
                    <button className='save-content-doctor'
                    onClick={() => this.handleSaveContentMarkdown()}>
                        Lưu thông tin   
                    </button>
                </div> 
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
