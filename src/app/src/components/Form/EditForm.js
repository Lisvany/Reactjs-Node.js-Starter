import React, { Component } from 'react'

import autoBind from 'react-autobind';

export default class EditForm extends Component {

    constructor(props){
        super(props);

        autoBind(this);

        this.state = {
            valid: true,
            task: {
                title: '',
                description: ''
            }
        }

    }

    componentWillReceiveProps(next,prev){
        if(prev !== next){
            this.setState({
                task: next.task
            })
        }
    }
    

    handleChange(e){
        const { name, value } = e.target;
        let temp = {...this.state.task};
        temp[name]=value;

        this.setState({
            task: temp
        })

        if(value.trim() === ''){
            this.setState({
                valid: false
            })
        }else{
            this.setState({
                valid: true
            })
        }
    }

    handleSubmit(){
        const { task } = this.state;
        if(task.title.trim() !== '' && task.description.trim() !== ''){
            this.props.editm(task);
            this.refs.btnclose.click();
        }

    }
    

    render() {
        const { taskk } =this.props;
        const { task } = this.state;

            if(taskk !== null && task){
                return (
                    <div className="modal" id="editForm" tabIndex="-1" role="dialog">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit Task</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                    <div className="card card-body">
                                        <form>
                                            <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1">Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleFormControlInput1" 
                                                placeholder="Type a name" 
                                                value={task.title}
                                                name="title"
                                                onChange={this.handleChange}
                                            />
                                            </div>
                                            <div className="form-group">
                                            <label htmlFor="exampleFormControlTextarea1">Description</label>
                                            <textarea 
                                                className="form-control" 
                                                id="exampleFormControlTextarea1" 
                                                rows="3"
                                                name="description"
                                                value={task.description}
                                                onChange={this.handleChange}
                                            ></textarea>
                                            </div>
                                        </form>
                
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" disabled={!this.state.valid} onClick={this.handleSubmit} className="btn btn-primary">Save </button>
                                        <button ref="btnclose" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                )
            }else{
                return '';
            }
        
    }
}