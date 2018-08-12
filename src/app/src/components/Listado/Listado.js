import React, { Component } from 'react'

import axios from 'axios';

import autoBind from 'react-autobind';

const apiURL= 'http://localhost:5000/tasks'

export default class Listado extends Component {

  constructor(props){
    super(props);

    autoBind(this);
  }


  componentWillUpdate(newProps,newState){   
    if(newProps !== newState){
      return true;
    }else{
      return false;
    }
  }

  renderTable(data){

    if(data && data.length >= 1 && data !== undefined){
      return (
          data.map((item, key)=> {
            return (
              <tr key={item._id}>
                <th scope="row">{key + 1}</th>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <button type="button" onMouseEnter={()=>this.props.edit(item)} style={{marginRight: 5}} onClick={()=>this.props.edit(item)} className="btn btn-outline-info" data-toggle="modal" data-target="#editForm">Edit</button>
                  <button type="button" onClick={()=>this.props.delete(item)} className="btn btn-outline-danger">Del</button>
                </td>
              </tr>
            )
          })
      )
    }else{
        return (
            <tr>
              <th scope="row">-</th>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
        )
    }
  }

  refreshList(){
    this.setState({
      data:[]
    });

    let $this=this;
      axios.get(apiURL)
            .then(tasks => {
                console.log(tasks.data)
                $this.setState({
                  data: tasks.data
                })
            })
            .catch(err => {
              console.error(err)
            })
  }

  render() {

    const { data } = this.props;

    return (
      <div className="table-responsive">
          <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                  {this.renderTable(data)}
              </tbody>
            </table>
            </div>
    )
  }
}
