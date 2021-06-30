import React, { Component} from 'react';
import { AgGridColumn, AgGridReact, AgGridReactProps } from "ag-grid-react";
import {CellValueChangedEvent, ColDef, GetMainMenuItemsParams, GridReadyEvent, GridApi, IDatasource, ColumnApi, IGetRowsParams } from 'ag-grid-community';
import axios from "axios";


//redux
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ApplicationState } from "../../store";
import { ThunkDispatch } from "redux-thunk";

import { fetchInfiniteScrollRequest } from "../../store/infinitescrollgrid/actionCreators";


import Wrapper from '../../components/Wrapper';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {LicenseManager} from "ag-grid-enterprise";
LicenseManager.setLicenseKey("Peace_OTY2OTQ1OTQ1Njk3Mw==7e213e88aef89910e528cf77b5ac1af0");

export interface GridState {
  rowData?: any[];
  defaultColDef?: ColDef;
  columnDefs?: ColDef[];
  rowSelection?: string;
  rowModelType?: string;
  rowBuffer?: number;
  paginationPageSize?: number;
  cacheOverflowSize?: number;
  cacheBlockSize?: number;
  maxConcurrentDatasourceRequests?: number;
  maxBlocksInCache?: number;
  infiniteInitialRowCount?: number;
  components?: any;
  getRowNodeId?: any
}


type PropsFromRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
interface OwnProps extends AgGridReactProps {};

export type Props = PropsFromRedux & OwnProps;



class InfiniteScrollServer extends Component<Props, GridState> {
  gridApi!: GridApi;
  ColumnApi!: ColumnApi;
  params: any;
  // dataSource!: IDatasource;

  constructor(props: Props){
    super(props);

    this.state = { 
      rowData: [],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        editable: true,
        // filter: true,
        sortable: true,   
        resizable: true,
        floatingFilter: true
      },
      // components: {
      //   loadingRenderer: function(params: any) {
      //     if (params.value !== undefined) {
      //       return params.value;
      //     } else {
      //       return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
      //     }
      //   }
      // },
      // columnDefs: [
      //   {
      //     headerName: "ID",
      //     maxWidth: 100,
      //     valueGetter: "node.id",
      //     cellRenderer: "loadingRenderer",
      //     sortable: false,
      //     suppressMenu: true
      //   },
      //   {
      //     headerName: "Athlete",
      //     field: "athlete",
      //     suppressMenu: true
      //   },
      //   {
      //     headerName: "Age",
      //     field: "age",
      //     filter: 'agNumberColumnFilter',
      //     filterParams: {
      //       filterOptions: ['equals','lessThan','greaterThan'],
      //       suppressAndOrCondition: true,
      //     }
      //   },
      //   {
      //     headerName: "Country",
      //     field: "country",
      //     filter: 'agSetColumnFilter', 
      //     filterParams: {
      //       values: countries
      //     }
      //   },
      //   {
      //     headerName: "Year",
      //     field: "year",
      //     filter: 'agSetColumnFilter', 
      //     filterParams: {
      //       values: ['2000','2004','2008','2012'], 
      //     }
      //   },
      //   {
      //     headerName: "Date",
      //     field: "date",
      //     suppressMenu: true
      //   },
      //   {
      //     headerName: "Sport",
      //     field: "sport",
      //     suppressMenu: true
      //   },
      //   {
      //     headerName: "Gold",
      //     field: "gold",
      //     suppressMenu: true
      //   },
      //   {
      //     headerName: "Silver",
      //     field: "silver",
      //     suppressMenu: true
      //   },
      //   {
      //     headerName: "Bronze",
      //     field: "bronze",
      //     suppressMenu: true
      //   },
      //   {
      //     headerName: "Total",
      //     field: "total",
      //     suppressMenu: true
      //   }
      // ],
      rowSelection: "multiple",
      rowModelType: "infinite",
      rowBuffer: 0,
      cacheOverflowSize: 2,
      maxConcurrentDatasourceRequests: 1,
      maxBlocksInCache: 10,
      cacheBlockSize: 50,
      paginationPageSize: 50,
      infiniteInitialRowCount: 50,
      getRowNodeId: function (item: any): any {
        return item.id;
      }
    };
  }

  public componentDidMount(): void { 
    console.log("componentDidMount params..");
    console.log(this.params);
    //this.setData();
  }

  // setData = async() => {
  //   await this.props.fetchInfiniteScroll();
  //   this.setState({ rowData: this.props.data });
  // };

  // onGridReady = async(params: any): Promise<any> => {
  //   console.log("params..");
  //   console.log(params);
  //   this.params = params;
  //   this.gridApi = params.api;
  //   await this.setData();
  //   this.updateData(this.state.rowData);

  // }

  // updateData = (data: any): void => {
  //   // console.log("data.length..");
  //   // console.log(data.length);
  //   data.forEach(function (data: any, index: any) {
  //     data.id = 'R' + (index + 1);
  //   });
  //   const dataSource = {
  //     rowCount: null,
  //     getRows: function(params: any): void {
  //       console.log("getRows params..");
  //       console.log(params);
  //       setTimeout(function() {
  //         let dataAfterSortingAndFiltering = sortAndFilter(
  //           data,
  //           params.sortModel,
  //           params.filterModel
  //         );
  //         let rowsThisPage = dataAfterSortingAndFiltering.slice(
  //           params.startRow,
  //           params.endRow
  //         );
  //         let lastRow = -1;
  //         if (dataAfterSortingAndFiltering.length <= params.endRow) {
  //           lastRow = dataAfterSortingAndFiltering.length;
  //         }
  //         params.successCallback(rowsThisPage, lastRow);
  //       }, 500);
  //     }
  //   };
  //   this.params?.api.setDatasource(dataSource);
  // };


  // function onGridReady(params) {
  //   setGridApi(params.api);
  //   setGridColumnApi(params.columnApi);
  // }

    onGridReady = async(params: any): Promise<any> => {
      console.log("params..");
      console.log(params);
      this.params = params;
      this.gridApi = params.api;
      // await this.setData();
      // this.updateData(this.state.rowData);
      //await this.gridApi.setDatasource(this.updateDataSource)

    }

  updateDataSource = (): IDatasource => {
    let currentPage = 0;
    console.log("updateDataSource..");
    
    const dataSources = {
      getRows: (params: any) => {
        currentPage = params.endRow / 10;
        let sortModel = params.sortModel[0];
        let filterModel = params.filterModel;

        const data = fetchData(currentPage, sortModel, filterModel);
        data.then((res) => {
          console.log("res..");
          console.log(res);
          let totalRows = Number(res.headers["x-total-count"]);
          params.successCallback(res.data, totalRows);
        });
      }
    };

    const fetchData = async (actualPage: any, sortModel: any, filterModel: any) => {
      let sortForUrl = "";
      if (sortModel) {
        sortForUrl = `&_sort=${sortModel.colId}&_order=${sortModel.sort}`;
      }

      let filterForUrl = "";
      if (Object.keys(filterModel).length > 0) {
        // check if the filter object is not empty
        let filterName = Object.keys(filterModel)[0];
        let filterValue = filterModel[filterName].filter;
        filterForUrl = `&${filterName}_like=${filterValue}`;
      }

      let url = `https://jsonplaceholder.typicode.com/comments?_page=${actualPage}&_limit=10${sortForUrl}&${filterForUrl}`;
      const response = await axios.get(url);
      const data = response;
      return data;
    };
    console.log("dataSources..");
    console.log(dataSources);
    return  dataSources;
  };

  getRowNodeId = (row: any) => {
    return row.id.toString();
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
            {/* <AgGridReact
              onGridReady={this.onGridReady}
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              components={this.state.components}
              rowSelection={this.state.rowSelection}
              rowDeselection={true}
              rowBuffer={this.state.rowBuffer}
              rowModelType={this.state.rowModelType}
              cacheBlockSize={this.state.cacheBlockSize}
              paginationPageSize={this.state.paginationPageSize}
              cacheOverflowSize={this.state.cacheOverflowSize}
              maxConcurrentDatasourceRequests={
                this.state.maxConcurrentDatasourceRequests
              }
              infiniteInitialRowCount={this.state.infiniteInitialRowCount}
              maxBlocksInCache={this.state.maxBlocksInCache}
              getRowNodeId={this.state.getRowNodeId}
            /> */}

          <AgGridReact
            onGridReady={this.onGridReady}
            rowModelType={"infinite"}
            // datasource={this.updateDataSource}
            getRowNodeId={this.getRowNodeId}
            cacheBlockSize={10}
            rowBuffer={0}
            paginationPageSize={10}
            cacheOverflowSize={2}
            maxConcurrentDatasourceRequests={1}
            maxBlocksInCache={10}
            infiniteInitialRowCount={10}
            pagination={true}
            paginationAutoPageSize={false}
          >
            <AgGridColumn field="id" sortable={ true }></AgGridColumn>
            <AgGridColumn field="name" sortable={ true }></AgGridColumn>
            <AgGridColumn
              field="email"
              sortable={ true }
              filter="agTextColumnFilter"
            ></AgGridColumn>
          </AgGridReact>

            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
  
}


const mapStateToProps = ({ infiniteScroll }: ApplicationState) => ({
  loading: infiniteScroll.loading,
  errors: infiniteScroll.errors,
  data: infiniteScroll.data
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
    fetchInfiniteScroll: () => dispatch(fetchInfiniteScrollRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteScrollServer);