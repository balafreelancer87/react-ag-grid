import React, { Component} from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from 'axios';

import Wrapper from '../components/Wrapper';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

interface User { 
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  phone: number,
  address: string,
  description: string,
}

interface ListUsersState { 
  rowData: User[]
}

class ListUsers extends Component<RouteComponentProps, ListUsersState> {
  constructor(props: RouteComponentProps){
    super(props);

    this.state = { 
      rowData: []
    };
  }

  public componentDidMount(): void {
    axios.get(`http://localhost:5000/users`).then(data => {
      console.log("user api data..");
      console.log(data);
      this.setState({rowData: data.data});
    });
  }

  public render(){
    console.log("rowData..");
    console.log(this.state.rowData);
    const { rowData } = this.state;

    return (
      <Wrapper>
        <div className="row">
          <div className="col-12 mx-auto">
            <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
                <AgGridReact
                    rowData={rowData}>
                    <AgGridColumn headerName="ID" field="id" sortable={ true } filter={ true }></AgGridColumn>
                    <AgGridColumn headerName="First Name" field="first_name" sortable={ true } filter={ true }></AgGridColumn>
                    <AgGridColumn headerName="Last Name" field="last_name" sortable={ true } filter={ true }></AgGridColumn>
                    <AgGridColumn headerName="Email" field="email" sortable={ true } filter={ true }></AgGridColumn>
                    <AgGridColumn headerName="Phone" field="phone" sortable={ true } filter={ true }></AgGridColumn>
                    <AgGridColumn headerName="Address" field="address" sortable={ true } filter={ true }></AgGridColumn>
                    <AgGridColumn headerName="Description" field="description" sortable={ true } filter={ true }></AgGridColumn>
                </AgGridReact>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
  
}

export default ListUsers;
