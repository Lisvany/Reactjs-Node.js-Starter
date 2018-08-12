import React, { Component } from 'react'
import axios from 'axios';
import autoBind from 'react-autobind';

import EditForm from './EditForm'
import Listado from '../Listado/Listado'

const Swal = require('sweetalert2')

const urlApi = "http://localhost:5000/tasks"

const apiURL= 'http://localhost:5000/tasks'

export default class Form extends Component {

    constructor(props){
        super(props);
        autoBind(this);

        this.state = {
            name:'',
            description:'',
            valid: false,
            task_selected: null
        }
    }

    componentWillMount = () => {

        axios.get(`${urlApi}`)
            .then((res) => {
                this.setState({
                    data: res.data
                })

            })
            .catch(function (error) {
                console.error(error);
            });
    }

    updateItem(item){
        let $this=this;
        axios.put(`${urlApi}/${item._id}`, {
            title: item.title,
            description: item.description
          })
          .then(function (response) {
                $this.setState({
                    task_selected: null
                });

                Swal({ 
                    title:'Updated!',
                    text: 'Your data has been updated.',
                    type: 'success',
                    timer: 3000
                  });
                $this.refreshList();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    removeById(e){

        let $this=this;
    
        Swal({
          title: 'Are you sure?',
          text: 'Are you sure you want to permanently delete this data?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            axios.delete(`http://localhost:5000/tasks/${e._id}`, {
              headers: {
                'Content-Type': 'application/json'
              },
              body: null
            }).then(function (response) {
              Swal({ 
                   title:'Deleted!',
                   text: 'Your data has been deleted.',
                   type: 'success',
                   timer: 3000
                 });
    
                 $this.refreshList()
                
            })
            .catch(function (error) {
              Swal({
                title: 'Oops...', 
                text: 'Something went wrong!', 
                type:'error',
                timer: 3000
              })
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal(
              {
                title:'Cancelled',
                text: 'Your data is safe :)',
                type: 'error',
                timer: 3000
            }
            )
          }
        })
    
       
      }

    editById(e){
        this.setState({
            task_selected: e
        });
    }

    refreshList(){
         let $this=this;
        this.setState({
          data:[]
        });

          axios.get(apiURL)
                .then(tasks => {
                    // console.log(tasks.data)
                    $this.setState({
                      data: tasks.data
                    })
                })
                .catch(err => {
                  console.error(err)
                })
      }
    
    handleChangeText(e){
        const { value, name } = e.target;

        if(this.state.name.trim() !== '' && this.state.description.trim() !== ''){
            this.setState({
                        valid: true
                    });
        }else{
            this.setState({
                valid: false
            });
        }

        if(this.validateForm(value)){
            this.setState({
                [name]: value
            });
        }else{
            this.setState({
                [name]: ''
            });
        }
    }

    validateForm(value){
        if(value !== '' && value.trim() !== ''){
                return true;
        }else{
            return false;
        }

    }

    handleSubmit(){
        let $this=this;
        axios.post(urlApi, {
            title: this.state.name,
            description: this.state.description
          })
          .then(function (response) {
                $this.setState({
                    name:'',
                    description:'',
                    valid: false
                });
                $this.refreshList();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

  render() {

    const { name, description } = this.state;

    return (
        <div>
            <div className="modal" id="addForm" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Task</h5>
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
                                name="name"
                                value={name}
                                onChange={this.handleChangeText}
                                />
                            </div>
                            <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Description</label>
                            <textarea 
                                className="form-control" 
                                id="exampleFormControlTextarea1" 
                                rows="3"
                                placeholder="Type a description"
                                name="description"
                                value={description}
                                onChange={this.handleChangeText}    
                            ></textarea>
                            </div>
                        </form>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button disabled={!this.state.valid} type="button" onClick={this.handleSubmit} className="btn btn-primary">Add</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            
            <EditForm task={this.state.task_selected} editm={this.updateItem} />

             <div className="card">
                <div className="card-body">
                    <h5 className="card-title" style={{flexDirection: 'row', paddingBottom: 10}}>
                        Tasks list
                        <button style={{float: 'right'}} type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#addForm">
                            Add
                        </button>
                    </h5>
                   
                    <Listado data={this.state.data} delete={this.removeById} edit={this.editById} />
                </div>
            </div>

        </div>
    )
  }
}