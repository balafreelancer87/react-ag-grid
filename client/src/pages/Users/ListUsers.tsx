import React, { Component} from 'react';
// import { Link, RouteComponentProps } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from "ag-grid-react";
// import axios from 'axios';

//redux
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { ApplicationState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
// import { User } from "../../store/users/actionTypes";
import { fetchUsersRequest } from "../../store/users/actionCreators";


import Wrapper from '../../components/Wrapper';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

// interface ListUsersState { 
//   rowData: User[]
// }

type UsersListProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class ListUsers extends Component<UsersListProps, {}> {
  constructor(props: UsersListProps){
    super(props);

    this.state = { 
      rowData: []
    };
  }

  public componentDidMount(): void {
    this.props.fetchUsers();
  }

  public render(){
    const { data, loading, errors } = this.props;
    console.log("UsersListProps data..");
    console.log(data);

    return (
      <Wrapper>
        <div className="row">
          <div className="col-12 mx-auto">            
            <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
                <AgGridReact
                    rowData={data}>
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


const mapStateToProps = ({ users }: ApplicationState) => ({
  loading: users.loading,
  errors: users.errors,
  data: users.data
});

// const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
//   bindActionCreators(
//     {
//       fetchUsersRequest
//     },
//     dispatch
//   );

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
    fetchUsers: () => dispatch(fetchUsersRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);