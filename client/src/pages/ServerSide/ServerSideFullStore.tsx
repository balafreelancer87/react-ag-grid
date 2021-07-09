import React, { Component} from 'react';
import { AgGridColumn, AgGridReact, AgGridReactProps } from "ag-grid-react";
import {CellValueChangedEvent, ColDef, GetMainMenuItemsParams, GridReadyEvent, GridApi, IDatasource, ColumnApi, IGetRowsParams, GridOptions } from 'ag-grid-community';
import axios from "axios";


//redux
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ApplicationState } from "../../store";
import { ThunkDispatch } from "redux-thunk";

import { serverSideFullStoreRequest } from "../../store/serversidefullstore/actionCreators";


import Wrapper from '../../components/Wrapper';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {LicenseManager} from "ag-grid-enterprise";
LicenseManager.setLicenseKey("Peace_OTY2OTQ1OTQ1Njk3Mw==7e213e88aef89910e528cf77b5ac1af0");

export interface GridState {
  rowData?: any[];
  defaultColDef?: ColDef;
  columnDefs?: ColDef[]; 
  rowModelType?: string;
  cacheBlockSize?: number;
  maxConcurrentDatasourceRequests?: number;
  maxBlocksInCache?: number;
  debug?: boolean;
  purgeClosedRowNodes?: boolean;
  blockLoadDebounceMillis?: number;
  serverSideStoreType?: any;
}


type PropsFromRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
interface OwnProps extends AgGridReactProps {};

export type Props = PropsFromRedux & OwnProps;



class ServerSideFullStore extends Component<Props, GridState> {
  gridApi!: GridApi;
  ColumnApi!: ColumnApi;
  params: any;

  constructor(props: Props){
    super(props);

    this.state = { 
      rowData: [],      
      columnDefs: [
        {field: 'athlete'},
        {field: 'country', rowGroup: true, hide: true},
        {field: 'sport', rowGroup: true, hide: true},
        {field: 'year', filter: 'number', filterParams: {newRowsAction: 'keep'}},
        {field: 'gold', aggFunc: 'sum'},
        {field: 'silver', aggFunc: 'sum'},
        {field: 'bronze', aggFunc: 'sum'},
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true
      },
      rowModelType: 'serverSide',
      serverSideStoreType: 'Partial',
      debug: true,
      cacheBlockSize: 20,
      maxBlocksInCache: 3,
      purgeClosedRowNodes: true,
      maxConcurrentDatasourceRequests: 2,
      blockLoadDebounceMillis: 1000,
    };
  }

  public componentDidMount(): void { 
    console.log("componentDidMount params..");
    console.log(this.params);
    //this.props.serverSideFullStoreRequest();
    
  }

  onGridReady = async(params: any) => {
    console.log("onGridReady params...");
    console.log(params);
    this.gridApi = params.api;
    this.ColumnApi = params.columnApi;

    // const res = await fetch('http://localhost:8000/olympicWinners');
    // console.log("res...");
    // console.log(res);
    // const data = await res.json();
    // console.log("data...");
    // console.log(data);

    const dataSource = await this.updateDataSource();
    params.api.setServerSideDatasource(dataSource);
  }

  updateDataSource = () => {
  
    const dataSource = {
        getRows : async(params: any) => {
          console.log("getRows params");
          console.log(JSON.stringify(params.request, null, 1));
          
          try{          
            const res = await fetch('http://localhost:8000/olympicWinners',  {
              method: 'post',
              body: JSON.stringify(params.request),
              headers: {"Content-Type": "application/json; charset=utf-8"}
            });

            console.log("res...");
            console.log(res);
            const data = await res.json();
            console.log("data...");
            console.log(data);

            params.successCallback(data.rows, data.lastRow);

          } catch (err) {
            console.error(err);
            params.failCallback();
          }
  
          // fetch('http://localhost:8000/olympicWinners', {
          //     method: 'post',
          //     body: JSON.stringify(params.request),
          //     headers: {"Content-Type": "application/json; charset=utf-8"}
          // })
          // .then(httpResponse => httpResponse.json())
          // .then(response => {
          //     params.successCallback(response.rows, response.lastRow);
          // })
          // .catch(error => {
          //     console.error(error);
          //     params.failCallback();
          // })
        }
    };

    return dataSource;
  };

  public render(){

    console.log("this.props..");
    console.log(this.props);

    console.log("this.states..");
    console.log(this.state);

    return (
      <Wrapper>
        <div className="row">
          <div className="col-12 mx-auto">            
            <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
            <AgGridReact
              onGridReady={this.onGridReady}
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              rowModelType={this.state.rowModelType}
              serverSideStoreType={this.state.serverSideStoreType}
              cacheBlockSize={this.state.cacheBlockSize}
              maxBlocksInCache={this.state.maxBlocksInCache}
              maxConcurrentDatasourceRequests={
                this.state.maxConcurrentDatasourceRequests
              }
              purgeClosedRowNodes={this.state.purgeClosedRowNodes}
              blockLoadDebounceMillis={this.state.blockLoadDebounceMillis}
              debug={this.state.debug}
            />

            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
  
}


const mapStateToProps = ({ serverSideFullStore }: ApplicationState) => ({
  loading: serverSideFullStore.loading,
  errors: serverSideFullStore.errors,
  data: serverSideFullStore.data
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
    serverSideFullStoreRequest: () => dispatch(serverSideFullStoreRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerSideFullStore);