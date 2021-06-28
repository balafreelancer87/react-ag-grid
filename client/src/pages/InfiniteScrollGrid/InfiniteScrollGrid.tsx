import React, { Component} from 'react';
import { AgGridColumn, AgGridReact, AgGridReactProps } from "ag-grid-react";
import {CellValueChangedEvent, ColDef, GetMainMenuItemsParams, GridReadyEvent, GridApi } from 'ag-grid-community';

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
}


type PropsFromRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
interface OwnProps extends AgGridReactProps {};

export type Props = PropsFromRedux & OwnProps;

class InfiniteScrollGrid extends Component<Props, GridState> {
  gridApi!: GridApi;
  params: any;

  constructor(props: Props){
    super(props);

    this.state = { 
      rowData: [],
      defaultColDef: {
        width: 150,
        editable: true,
        filter: true,
        sortable: true,   
        resizable: true
      },
      components: {
        loadingRenderer: function(params: any) {
          if (params.value !== undefined) {
            return params.value;
          } else {
            return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
          }
        }
      },
      columnDefs: [
        {
          headerName: "ID",
          width: 100,
          valueGetter: "node.id",
          cellRenderer: "loadingRenderer"
        },
        {
          headerName: "Athlete",
          field: "athlete",
          width: 150
        },
        {
          headerName: "Age",
          field: "age",
          width: 90
        },
        {
          headerName: "Country",
          field: "country",
          width: 120
        },
        {
          headerName: "Year",
          field: "year",
          width: 90
        },
        {
          headerName: "Date",
          field: "date",
          width: 110
        },
        {
          headerName: "Sport",
          field: "sport",
          width: 110
        },
        {
          headerName: "Gold",
          field: "gold",
          width: 100
        },
        {
          headerName: "Silver",
          field: "silver",
          width: 100
        },
        {
          headerName: "Bronze",
          field: "bronze",
          width: 100
        },
        {
          headerName: "Total",
          field: "total",
          width: 100
        }
      ],
      rowSelection: "multiple",
      rowModelType: "infinite",
      rowBuffer: 0,
      paginationPageSize: 50,
      cacheOverflowSize: 2,
      cacheBlockSize: 50,
      maxConcurrentDatasourceRequests: 1,
      maxBlocksInCache: 10,
      infiniteInitialRowCount: 50
    };
  }

  public componentDidMount(): void { 
    console.log("componentDidMount params..");
    console.log(this.params);
  }

  onGridReady = (params: any): void => {
    console.log("params..");
    console.log(params);
    this.params = params;
    this.gridApi = params.api;
    const updateData = (data: any): void => {
      // console.log("data.length..");
      // console.log(data.length);
      const dataSource = {
        rowCount: null,
        getRows: function(params: any): void {
          console.log("getRows params..");
          console.log(params);
          setTimeout(function() {
            let rowsThisPage = data.slice(params.startRow, params.endRow);
            // console.log("rowsThisPage..");
            // console.log(rowsThisPage);
            let lastRow = -1;
            if (data.length <= params.endRow) {
              lastRow = data.length;
            }
            params.successCallback(rowsThisPage, lastRow);
          }, 500);
        }
      };
      params.api.setDatasource(dataSource);
    };

    // fetch(
    //   "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json"
    // )
    //   .then(res => res.json())
    //   .then(data => {
    //     updateData(data);
    //   });
    this.props.fetchInfiniteScroll();
    updateData(this.props.data);
    this.setState({ rowData: this.props.data });
  };

  public componentDidUpdate = (): void => {
    console.log("componentDidUpdate...");
    console.log("componentDidUpdate params..");
    console.log(this.params);
    //this.onGridReady(this.params);
  }

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
              components={this.state.components}
              rowSelection={this.state.rowSelection}
              rowDeselection={true}
              rowBuffer={this.state.rowBuffer}
              rowModelType={this.state.rowModelType}
              paginationPageSize={this.state.paginationPageSize}
              cacheOverflowSize={this.state.cacheOverflowSize}
              maxConcurrentDatasourceRequests={
                this.state.maxConcurrentDatasourceRequests
              }
              infiniteInitialRowCount={this.state.infiniteInitialRowCount}
              maxBlocksInCache={this.state.maxBlocksInCache}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteScrollGrid);