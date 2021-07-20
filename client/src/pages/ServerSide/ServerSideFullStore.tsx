import React, { Component} from 'react';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { AllModules, ColumnApi, GridReadyEvent, IServerSideGetRowsParams, ModelUpdatedEvent, GridApi, ColDef, ServerSideStoreType, GridOptions, ModuleRegistry} from '@ag-grid-enterprise/all-modules';

import axios from "axios";

//redux
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ApplicationState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { serverSideFullStoreRequest, serverSideFullStoreGetRequest } from "../../store/serversidefullstore/actionCreators";

import Wrapper from '../../components/Wrapper';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

// import {LicenseManager} from "ag-grid-enterprise";
// LicenseManager.setLicenseKey("Peace_OTY2OTQ1OTQ1Njk3Mw==7e213e88aef89910e528cf77b5ac1af0");


export interface GridState {
  rowData?: any;
  defaultColDef?: ColDef;
  columnDefs?: ColDef[]; 
  rowModelType?: string;
  cacheBlockSize?: number;
  maxConcurrentDatasourceRequests?: number;
  maxBlocksInCache?: number;
  debug?: boolean;
  purgeClosedRowNodes?: boolean;
  blockLoadDebounceMillis?: number;
  serverSideStoreType?: ServerSideStoreType | any;
  getServerSideStoreParams?: any;
  rowSelection?:  string;
  getRowStyle?: any;
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
      // columnDefs: [
      //   {field: 'athlete'},
      //   {field: 'country', rowGroup: true, hide: true},
      //   {field: 'sport', rowGroup: true, hide: true},
      //   {field: 'year', filter: 'number', filterParams: {newRowsAction: 'keep'}},
      //   {field: 'gold', aggFunc: 'sum'},
      //   {field: 'silver', aggFunc: 'sum'},
      //   {field: 'bronze', aggFunc: 'sum'},
      // ],
      // columnDefs: [
      //   {
      //     field: 'athlete',
      //     minWidth: 220,
      //     filter: 'agTextColumnFilter',
      //   },
      //   {
      //     field: 'country',
      //     minWidth: 200,
      //   },
      //   { 
      //     field: 'year',
      //     filter: 'agNumberColumnFilter',
      //   },
      //   {
      //     field: 'sport',
      //     minWidth: 200,
      //   },
      //   { field: 'gold' },
      //   { field: 'silver' },
      //   { field: 'bronze' },
      // ],
      columnDefs: [
        // {
        //   field: 'id',
        //   hide: true,
        // },
        { field: 'athlete' },
        {
          field: 'country',
          rowGroup: true,
          hide: true,
        },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true
      },
      rowModelType: 'serverSide',
      serverSideStoreType: ServerSideStoreType.Full,
      debug: true,
      cacheBlockSize: 20,
      maxBlocksInCache: 3,
      purgeClosedRowNodes: true,
      maxConcurrentDatasourceRequests: 2,
      blockLoadDebounceMillis: 1000,
      rowSelection: 'multiple',
      getRowStyle: (params: any): any => {
        if (params.node.rowIndex % 2 === 0) {
            return { background: 'red' };
        }
      },
      getServerSideStoreParams: function (params: any): any {
        var noGroupingActive = params.rowGroupColumns.length === 0;
        var res;
        if (noGroupingActive) {
          res = {
            storeType: 'partial',
            cacheBlockSize: 100,
            maxBlocksInCache: 2,
          };
        } else {
          var topLevelRows = params.level === 0;
          res = {
            storeType: topLevelRows ? 'full' : 'partial',
            cacheBlockSize: params.level === 1 ? 5 : 2,
            maxBlocksInCache: -1,
          };
        }
        console.log('############## NEW STORE ##############');
        console.log(
          'getServerSideStoreParams, level = ' +
            params.level +
            ', result = ' +
            JSON.stringify(res)
        );
        return res;
      }
    };
  }

  public componentDidMount(): void { 
    console.log("componentDidMount params..");
    console.log(this.params);

    //this.setFullData();
    
  }

  onGridReady = (params: any) => {
    console.log("onGridReady params...");
    console.log(params);
    this.gridApi = params.api;
    this.ColumnApi = params.columnApi;

    //const dataSource = this.updateDataSource();
    const dataSource = this.updateFullSource();
    params.api.setServerSideDatasource(dataSource);
  }


  setFullData = async() => {
    await this.props.serverSideFullStoreGetRequest();
    this.setState({ rowData: this.props.data });
  };

  updateFullSource = () => {

    const dataSource = {
      getRows : async(params: any) => {
        console.log("getRows params");
        console.log(JSON.stringify(params.request, null, 1));

        await this.setFullData();
        params.successCallback(this.state.rowData);

      }
    };

    return dataSource;
  }

  setData = (reqParams: any) => {
    this.props.serverSideFullStoreRequest(reqParams);
    console.log("this.props.data...");
    console.log(this.props.data);
    //this.setState({ rowData: this.props.data });
  };

  updateDataSource = () => {
  
    const dataSource = {
        getRows : async(params: any) => {
          console.log("getRows params");
          console.log(JSON.stringify(params.request, null, 1));
          
          // try{          
            // const res = await fetch('http://localhost:8000/olympicWinners',  {
            //   method: 'post',
            //   body: JSON.stringify(params.request),
            //   headers: {"Content-Type": "application/json; charset=utf-8"}
            // });
            
            // console.log("res...");
            // console.log(res);
            // const data = await res.json();
            // console.log("data...");
            // console.log(data);

            // this.setData(params.request);
            // params.successCallback(this.state.rowData.rows, this.state.rowData.lastRow);
            await this.props.serverSideFullStoreRequest(params.request);
            // this.setState({ rowData: this.props.data });
            // console.log("state rowData...");
            // console.log(this.state.rowData);
            // params.successCallback(this.state.rowData.rows, this.state.rowData.lastRow);
            params.successCallback(this.props.data.rows, this.props.data.lastRow);

          // } catch (err) {
          //   console.error(err);
          //   params.failCallback();
          // }

          

        }
    };

    return dataSource;
  };

  refreshStore = () => {
    this.gridApi.refreshServerSideStore({ purge: true });
  };

  updateSelectedRows = () => {
    console.log("updateSelectedRows...");

    var selectedRows = this.gridApi.getSelectedNodes();
    if (!selectedRows || selectedRows.length === 0) { return; }

    var selectedRow = selectedRows[0];
    console.log("selectedRow...");
    console.log(selectedRow);

    // var idsToUpdate = this.gridApi.getSelectedNodes().map(function (node) {
    //   return node.data.id;
    // });
    // console.log("idsToUpdate...");
    // console.log(idsToUpdate);
    // var updatedRows: any = [];
    // this.gridApi.forEachNode(function (rowNode) {
    //   if (idsToUpdate.indexOf(rowNode.data.id) >= 0) {
    //     var updated = JSON.parse(JSON.stringify(rowNode.data));
    //     console.log("updated...");
    //     console.log(updated);

    //     updated.gold += 1;
    //     updated.silver += 2;
    //     updated.bronze += 3;
    //     rowNode.setData(updated);
    //     updatedRows.push(updated);
    //   }
    // });
    //updateServerRows(updatedRows);
  };

  isRowSelectable = (rowNode: any) => {
    return !rowNode.group;
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
            <div style={{ marginBottom: '5px' }}>
              <button onClick={() => this.updateSelectedRows()}>
                Update Selected Rows
              </button>
              <button onClick={() => this.refreshStore()}>Refresh Store</button>
            </div>
            <AgGridReact
              modules={AllModules}
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
              // getServerSideStoreParams={this.state.getServerSideStoreParams}
              enableCellChangeFlash={true}
              rowSelection={this.state.rowSelection}
              isRowSelectable={this.isRowSelectable}
              // getRowStyle={this.state.getRowStyle}
              
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
    serverSideFullStoreRequest: (params: any) => dispatch(serverSideFullStoreRequest(params)),
    serverSideFullStoreGetRequest: () => dispatch(serverSideFullStoreGetRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerSideFullStore);