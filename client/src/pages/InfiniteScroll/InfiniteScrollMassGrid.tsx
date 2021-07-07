import React, { Component} from 'react';
import { AgGridColumn, AgGridReact, AgGridReactProps } from "ag-grid-react";
import {CellValueChangedEvent, ColDef, GetMainMenuItemsParams, GridReadyEvent, GridApi } from 'ag-grid-community';

//redux
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ApplicationState } from "../../store";
import { ThunkDispatch } from "redux-thunk";

import { fetchInfiniteScrollMassRequest } from "../../store/infinitescrollgridmass/actionCreators";


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

// sorting

function sortAndFilter(allOfTheData: any, sortModel: any, filterModel: any) {
  return sortData(sortModel, filterData(filterModel, allOfTheData));
}
function sortData(sortModel: any, data: any) {
  let sortPresent = sortModel && sortModel.length > 0;
  if (!sortPresent) {
    return data;
  }
  let resultOfSort = data.slice();
  resultOfSort.sort(function (a: any, b: any) {
    for (let k = 0; k < sortModel.length; k++) {
      let sortColModel = sortModel[k];
      let valueA = a[sortColModel.colId];
      let valueB = b[sortColModel.colId];
      if (valueA === valueB) {
        continue;
      }
      let sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
      if (valueA > valueB) {
        return sortDirection;
      } else {
        return sortDirection * -1;
      }
    }
    return 0;
  });
  return resultOfSort;
}
function filterData(filterModel: any, data: any) {
  let filterPresent = filterModel && Object.keys(filterModel).length > 0;
  // console.log('filterPresent...');
  // console.log(filterPresent);
  if (!filterPresent) {
    return data;
  }
  let resultOfFilter = [];
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    // console.log('item...');
    // console.log(item);
    if (filterModel.BusinessUnitID) {
      let BusinessUnitID = parseInt(item.BusinessUnitID);
      let allowedBusinessUnitID = parseInt(filterModel.BusinessUnitID.filter);
      if (filterModel.BusinessUnitID.type === 'equals') {
        if (BusinessUnitID !== allowedBusinessUnitID) {
          continue;
        }
      } else if (filterModel.BusinessUnitID.type === 'lessThan') {
        if (BusinessUnitID >= allowedBusinessUnitID) {
          continue;
        }
      } else {
        if (BusinessUnitID <= allowedBusinessUnitID) {
          continue;
        }
      }
    }

    if (filterModel.AccountType) {
      let valueLowerCase = item.AccountType.toString().toLowerCase();
      let filterTextLowerCase = filterModel.AccountType.filter.toString().toLowerCase();
      if (filterModel.AccountType.type === 'contains') {
        if (valueLowerCase.indexOf(filterTextLowerCase) < 0) {
          continue;
        }
      }
      if (filterModel.AccountType.type === 'startsWith') {
        if (valueLowerCase.indexOf(filterTextLowerCase) < 0 || valueLowerCase.indexOf(filterTextLowerCase) > 0) {
          continue;
        }
      }
      if (filterModel.AccountType.type === 'endsWith') {
        let index = valueLowerCase.lastIndexOf(filterTextLowerCase);        
        if (index < 0 || index !== (valueLowerCase.length - filterTextLowerCase.length)) {
          continue;
        }
      }
    }

    if (filterModel.BusinessUnitName) {
      let valueLowerCase = item.BusinessUnitName.toString().toLowerCase();
      let filterTextLowerCase = filterModel.BusinessUnitName.filter.toString().toLowerCase();
      if (filterModel.BusinessUnitName.type === 'contains') {
        if (valueLowerCase.indexOf(filterTextLowerCase) < 0) {
          continue;
        }
      }
      if (filterModel.BusinessUnitName.type === 'startsWith') {
        if (valueLowerCase.indexOf(filterTextLowerCase) < 0 || valueLowerCase.indexOf(filterTextLowerCase) > 0) {
          continue;
        }
      }
      if (filterModel.BusinessUnitName.type === 'endsWith') {
        let index = valueLowerCase.lastIndexOf(filterTextLowerCase);        
        if (index < 0 || index !== (valueLowerCase.length - filterTextLowerCase.length)) {
          continue;
        }
      }
    }

    // if (filterModel.year) {
    //   if (filterModel.year.values.indexOf(item.year.toString()) < 0) {
    //     continue;
    //   }
    // }

    // if (filterModel.country) {
    //   if (filterModel.country.values.indexOf(item.country) < 0) {
    //     continue;
    //   }
    // }

    resultOfFilter.push(item);
  }
  return resultOfFilter;
}

class InfiniteScrollMassGrid extends Component<Props, GridState> {
  gridApi!: GridApi;
  params: any;

  constructor(props: Props){
    super(props);

    this.state = { 
      rowData: [],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        editable: true,
        //filter: true,
        sortable: true,   
        resizable: true,
        floatingFilter: true
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
          maxWidth: 100,
          valueGetter: "node.id",
          cellRenderer: "loadingRenderer",
          sortable: false,
          suppressMenu: true
        },
        {
          headerName: "Account Type IDt",
          field: "AccountTypeIDt",
          suppressMenu: true
        },
        {
          headerName: "Accrued Fee",
          field: "AccruedFee",
          suppressMenu: true
        },
        {
          headerName: "Account Type",
          field: "AccountType",
          filter: 'agTextColumnFilter',
          filterParams: {
            filterOptions: ['contains','startsWith','endsWith'],
            suppressAndOrCondition: true,
          }
        },
        {
          headerName: "Account Type ID",
          field: "AccountTypeID",
          suppressMenu: true
        },
        {
          headerName: "Accrued Interest",
          field: "AccruedInterest",
          suppressMenu: true
        },
        {
          headerName: "Amort Factor",
          field: "AmortFactor",
          suppressMenu: true
        },
        {
          headerName: "Alt Src",
          field: "AltSrc",
          suppressMenu: true
        },
        {
          headerName: "BB Yellow Key",
          field: "BBYellowKey",
          suppressMenu: true
        },
        {
          headerName: "Business Unit ID",
          field: "BusinessUnitID",
          filter: 'agNumberColumnFilter',
          filterParams: {
            filterOptions: ['equals','lessThan','greaterThan'],
            suppressAndOrCondition: true,
          }
        },
        {
          headerName: "Business Unit Name",
          field: "BusinessUnitName",
          filter: 'agTextColumnFilter',
          filterParams: {
            filterOptions: ['contains','startsWith','endsWith'],
            suppressAndOrCondition: true,
          }
        },
        {
          headerName: "Confirm Status Name",
          field: "ConfirmStatusName",
          suppressMenu: true
        },
        {
          headerName: "Clearing Account NAME",
          field: "ClearingAccountNAME",
          suppressMenu: true
        },
        {
          headerName: "Confirm Ref ID",
          field: "ConfirmRefID",
          suppressMenu: true
        },
        {
          headerName: "Current Face",
          field: "CurrentFace",
          suppressMenu: true
        },
        {
          headerName: "Cusip",
          field: "Cusip",
          suppressMenu: true
        },
        {
          headerName: "CPty Ref ID",
          field: "CPtyRefID",
          suppressMenu: true
        },
        {
          headerName: "Counter party",
          field: "Counterparty",
          suppressMenu: true
        },
        {
          headerName: "Desk",
          field: "Desk",
          suppressMenu: true
        },
        {
          headerName: "Desk ID",
          field: "DeskID",
          suppressMenu: true
        },
        {
          headerName: "Dividend Rate",
          field: "DividendRate",
          suppressMenu: true
        },
        {
          headerName: "Division",
          field: "Division",
          suppressMenu: true
        },
        {
          headerName: "Division ID",
          field: "DivisionID",
          suppressMenu: true
        },
        {
          headerName: "Executing Counterparty ID",
          field: "ExecutingCounterpartyID",
          suppressMenu: true
        },
        {
          headerName: "Executing Counterparty",
          field: "ExecutingCounterparty",
          suppressMenu: true
        },
        {
          headerName: "Firm ID",
          field: "FirmID",
          suppressMenu: true
        },
        {
          headerName: "Firm",
          field: "Firm",
          suppressMenu: true
        },
        {
          headerName: "External ID",
          field: "ExternalID",
          suppressMenu: true
        },
        {
          headerName: "Executing Method",
          field: "ExecutingMethod",
          suppressMenu: true
        },
        {
          headerName: "Execution Venue",
          field: "ExecutionVenue",
          suppressMenu: true
        },
        {
          headerName: "Executing Type",
          field: "ExecutingType",
          suppressMenu: true
        },
        {
          headerName: "Executing Account",
          field: "ExecutingAccount",
          suppressMenu: true
        },
        {
          headerName: "Financial Type",
          field: "FinancialType",
          suppressMenu: true
        },
        {
          headerName: "Fee Sum",
          field: "FeeSum",
          suppressMenu: true
        },
        {
          headerName: "Gross Amount",
          field: "GrossAmount",
          suppressMenu: true
        },
        {
          headerName: "ISIN",
          field: "ISIN",
          suppressMenu: true
        },
        {
          headerName: "Instrument Type ID",
          field: "InstrumentTypeID",
          suppressMenu: true
        },
        {
          headerName: "Investment Manager",
          field: "InvestmentManager",
          suppressMenu: true
        },
        {
          headerName: "Modified By",
          field: "ModifiedBy",
          suppressMenu: true
        },
        {
          headerName: "Net Settlement",
          field: "NetSettlement",
          suppressMenu: true
        },
        {
          headerName: "Notional",
          field: "Notional",
          suppressMenu: true
        },
        {
          headerName: "Note",
          field: "Note",
          suppressMenu: true
        },
        {
          headerName: "Order ID",
          field: "OrderID",
          suppressMenu: true
        },
        {
          headerName: "Original Face",
          field: "OriginalFace",
          suppressMenu: true
        },
        {
          headerName: "offset",
          field: "offset",
          suppressMenu: true
        },
        {
          headerName: "Price",
          field: "Price",
          suppressMenu: true
        },
        {
          headerName: "Position Queue Status",
          field: "PositionQueueStatus",
          suppressMenu: true
        },
        {
          headerName: "PSET Code",
          field: "PSETCode",
          suppressMenu: true
        },
        {
          headerName: "PB",
          field: "PB",
          suppressMenu: true
        },
        {
          headerName: "Primary Instrument ID",
          field: "PrimaryInstrumentID",
          suppressMenu: true
        },
        {
          headerName: "Quantity",
          field: "Quantity",
          suppressMenu: true
        },
        {
          headerName: "retryCount",
          field: "retryCount",
          suppressMenu: true
        },
        {
          headerName: "Ref Instrument Id",
          field: "RefInstrumentId",
          suppressMenu: true
        },
        {
          headerName: "Region",
          field: "Region",
          suppressMenu: true
        },
        {
          headerName: "Repurchase Term",
          field: "RepurchaseTerm",
          suppressMenu: true
        },
        {
          headerName: "RPCLDT",
          field: "RPCLDT",
          suppressMenu: true
        },
        {
          headerName: "Repo Financing Interest",
          field: "RepoFinancingInterest",
          suppressMenu: true
        },
        {
          headerName: "RepoInterest Rate",
          field: "RepoInterestRate",
          suppressMenu: true
        },
        {
          headerName: "Source ID",
          field: "SourceID",
          suppressMenu: true
        },
        {
          headerName: "Source",
          field: "Source",
          suppressMenu: true
        },
        {
          headerName: "Sub Account",
          field: "SubAccount",
          suppressMenu: true
        },
        {
          headerName: "Sub Account ID",
          field: "SubAccountID",
          suppressMenu: true
        },
        {
          headerName: "Settlement Status",
          field: "SettlementStatus",
          suppressMenu: true
        },
        {
          headerName: "SEDOL",
          field: "SEDOL",
          suppressMenu: true
        },
        {
          headerName: "Settlement Status ID",
          field: "SettlementStatusID",
          suppressMenu: true
        },
        {
          headerName: "Symbol",
          field: "Symbol",
          suppressMenu: true
        },
        {
          headerName: "Security Desc",
          field: "SecurityDesc",
          suppressMenu: true
        },
        {
          headerName: "External",
          field: "ExternalID",
          suppressMenu: true
        },
        {
          headerName: "Spread",
          field: "Spread",
          suppressMenu: true
        },
        {
          headerName: "Settle Date",
          field: "SettleDate",
          suppressMenu: true
        },
        {
          headerName: "Trade Currency",
          field: "TradeCurrency",
          suppressMenu: true
        },
        {
          headerName: "Transaction Type",
          field: "TransactionType",
          suppressMenu: true
        },
        {
          headerName: "Txn Sub Type",
          field: "TxnSubType",
          suppressMenu: true
        },
        {
          headerName: "Txn Sub Type ID",
          field: "TxnSubTypeID",
          suppressMenu: true
        },
        {
          headerName: "Trade Date",
          field: "TradeDate",
          suppressMenu: true
        },
        {
          headerName: "Trade ID",
          field: "TradeID",
          suppressMenu: true
        },
        {
          headerName: "Text",
          field: "Text",
          suppressMenu: true
        },
        {
          headerName: "Transaction ID",
          field: "TransactionID",
          suppressMenu: true
        },
        {
          headerName: "Tx Version",
          field: "TxVersion",
          suppressMenu: true
        },
        {
          headerName: "Trading Place",
          field: "TradingPlace",
          suppressMenu: true
        },
        {
          headerName: "TRS Effective Date",
          field: "TRSEffectiveDate",
          suppressMenu: true
        },
        {
          headerName: "TBA Settle Type",
          field: "TBASettleType",
          suppressMenu: true
        },
        {
          headerName: "Transaction Type ID",
          field: "TransactionTypeID",
          suppressMenu: true
        },
        {
          headerName: "Underlying Symbol",
          field: "UnderlyingSymbol",
          suppressMenu: true
        },
        {
          headerName: "User",
          field: "User",
          suppressMenu: true
        },
        {
          headerName: "Underlying Financing Rate",
          field: "UnderlyingFinancingRate",
          suppressMenu: true
        },
        {
          headerName: "Valuation Currency",
          field: "ValuationCurrency",
          suppressMenu: true
        }
      
      ],
      rowSelection: "multiple",
      rowModelType: "infinite",
      rowBuffer: 0,
      cacheOverflowSize: 2,
      maxConcurrentDatasourceRequests: 1,
      maxBlocksInCache: 10,
      cacheBlockSize: 100000,
      paginationPageSize: 50,
      infiniteInitialRowCount: 50,
      getRowNodeId: function (item: any): any {
        return item.id;
      }
    };
  }

  public componentDidMount(): void { 
    // console.log("componentDidMount params..");
    // console.log(this.params);
    this.setData();
  }

  setData = async() => {
    await this.props.fetchInfiniteScroll();
    this.setState({ rowData: this.props.data });
  };

  onGridReady = async(params: any): Promise<any> => {
    // console.log("params..");
    // console.log(params);
    this.params = params;
    this.gridApi = params.api;
    await this.setData();
    
    console.log("this.state.rowData..");
    console.log(this.state.rowData);
    this.updateData(this.state.rowData);

  }

  updateData = (data: any): void => {
    console.log("updateData data.length..");
    console.log(data.length);
    data.forEach(function (data: any, index: any) {
      data.id = 'R' + (index + 1);
    });
    const dataSource = {
      rowCount: null,
      getRows: function(params: any): void {
        console.log("getRows params..");
        console.log(params);
        setTimeout(function() {
          let dataAfterSortingAndFiltering = sortAndFilter(
            data,
            params.sortModel,
            params.filterModel
          );
          let rowsThisPage = dataAfterSortingAndFiltering.slice(
            params.startRow,
            params.endRow
          );
          let lastRow = -1;
          if (dataAfterSortingAndFiltering.length <= params.endRow) {
            lastRow = dataAfterSortingAndFiltering.length;
          }
          params.successCallback(rowsThisPage, lastRow);
        }, 500);
      }
    };
    this.params?.api.setDatasource(dataSource);
  };


  public componentDidUpdate = (): void => {
    // console.log("componentDidUpdate...");
    // console.log("componentDidUpdate params..");
    // console.log(this.params);
    
  }

  public render(){

    // console.log("this.props..");
    // console.log(this.props);

    // console.log("this.states..");
    // console.log(this.state);

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
              cacheBlockSize={this.state.cacheBlockSize}
              paginationPageSize={this.state.paginationPageSize}
              cacheOverflowSize={this.state.cacheOverflowSize}
              maxConcurrentDatasourceRequests={
                this.state.maxConcurrentDatasourceRequests
              }
              infiniteInitialRowCount={this.state.infiniteInitialRowCount}
              maxBlocksInCache={this.state.maxBlocksInCache}
              getRowNodeId={this.state.getRowNodeId}
            />
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
  
}


const mapStateToProps = ({ infiniteScrollMass }: ApplicationState) => ({
  loading: infiniteScrollMass.loading,
  errors: infiniteScrollMass.errors,
  data: infiniteScrollMass.data
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
    fetchInfiniteScroll: () => dispatch(fetchInfiniteScrollMassRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteScrollMassGrid);