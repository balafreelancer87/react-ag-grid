import React, { Component} from 'react';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { AllModules, ColumnApi, GridReadyEvent, IServerSideGetRowsParams, ModelUpdatedEvent, GridApi, ColDef, ServerSideStoreType, GridOptions, ModuleRegistry} from '@ag-grid-enterprise/all-modules';

import axios from "axios";

//redux
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ApplicationState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { serverSideTransactionsRequest } from "../../store/serversidetransactions/actionCreators";

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
  rowGroupPanelShow?: any;
  rowSelection?: string;
  getRowNodeId?: any;
}


type PropsFromRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
interface OwnProps extends AgGridReactProps {};

export type Props = PropsFromRedux & OwnProps;



class ServerSideTransactions extends Component<Props, GridState> {
  gridApi!: GridApi;
  ColumnApi!: ColumnApi;
  params: any;

  constructor(props: Props){
    super(props);

    this.state = { 
      rowData: [],      
      columnDefs: [
        {
          headerName: "ID",
          field: "id",
          width: 100,
        },
        {
          headerName: "Account Type IDt",
          field: "AccountTypeIDt",
          valueParser: numberValueParser,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
          valueFormatter: function (params: any) {
            return formatNumber(params.value);
          },
        },
        {
          headerName: "Accrued Fee",
          field: "AccruedFee",
        },
        {
          headerName: "Account Type",
          field: "AccountType",
          rowGroup: true,
          enableRowGroup: true,
          hide: true,
          // filter: 'agTextColumnFilter',
        },
        {
          headerName: "Account Type ID",
          field: "AccountTypeID",
        },
        {
          headerName: "Accrued Interest",
          field: "AccruedInterest",
        },
        {
          headerName: "Amort Factor",
          field: "AmortFactor",
        },
        {
          headerName: "Alt Src",
          field: "AltSrc",
        },
        {
          headerName: "BB Yellow Key",
          field: "BBYellowKey",
        },
        {
          headerName: "Business Unit ID",
          field: "BusinessUnitID",
          filter: 'agNumberColumnFilter',
          filterParams: {
            buttons: ['reset'],
            debounceMs: 1000
          }
        },
        {
          headerName: "Business Unit Name",
          field: "BusinessUnitName",
          filter: 'agTextColumnFilter',
        },
        {
          headerName: "Confirm Status Name",
          field: "ConfirmStatusName",
        },
        {
          headerName: "Clearing Account NAME",
          field: "ClearingAccountNAME",
        },
        {
          headerName: "Confirm Ref ID",
          field: "ConfirmRefID",
        },
        {
          headerName: "Current Face",
          field: "CurrentFace",
        },
        {
          headerName: "Cusip",
          field: "Cusip",
        },
        {
          headerName: "CPty Ref ID",
          field: "CPtyRefID",
        },
        {
          headerName: "Counter party",
          field: "Counterparty",
        },
        {
          headerName: "Desk",
          field: "Desk",
        },
        {
          headerName: "Desk ID",
          field: "DeskID",
        },
        {
          headerName: "Dividend Rate",
          field: "DividendRate",
        },
        {
          headerName: "Division",
          field: "Division",
        },
        {
          headerName: "Division ID",
          field: "DivisionID",
        },
        {
          headerName: "Executing Counterparty ID",
          field: "ExecutingCounterpartyID",
        },
        {
          headerName: "Executing Counterparty",
          field: "ExecutingCounterparty",
        },
        {
          headerName: "Firm ID",
          field: "FirmID",
        },
        {
          headerName: "Firm",
          field: "Firm",
        },
        {
          headerName: "External ID",
          field: "ExternalID",
        },
        {
          headerName: "Executing Method",
          field: "ExecutingMethod",
        },
        {
          headerName: "Execution Venue",
          field: "ExecutionVenue",
        },
        {
          headerName: "Executing Type",
          field: "ExecutingType",
        },
        {
          headerName: "Executing Account",
          field: "ExecutingAccount",
        },
        {
          headerName: "Financial Type",
          field: "FinancialType",
        },
        {
          headerName: "Fee Sum",
          field: "FeeSum",
        },
        {
          headerName: "Gross Amount",
          field: "GrossAmount",
        },
        {
          headerName: "ISIN",
          field: "ISIN",
        },
        {
          headerName: "Instrument Type ID",
          field: "InstrumentTypeID",
        },
        {
          headerName: "Investment Manager",
          field: "InvestmentManager",
        },
        {
          headerName: "Modified By",
          field: "ModifiedBy",
        },
        {
          headerName: "Net Settlement",
          field: "NetSettlement",
        },
        {
          headerName: "Notional",
          field: "Notional",
        },
        {
          headerName: "Note",
          field: "Note",
        },
        {
          headerName: "Order ID",
          field: "OrderID",
        },
        {
          headerName: "Original Face",
          field: "OriginalFace",
        },
        {
          headerName: "offset",
          field: "offset",
        },
        {
          headerName: "Price",
          field: "Price",
        },
        {
          headerName: "Position Queue Status",
          field: "PositionQueueStatus",
        },
        {
          headerName: "PSET Code",
          field: "PSETCode",
        },
        {
          headerName: "PB",
          field: "PB",
        },
        {
          headerName: "Primary Instrument ID",
          field: "PrimaryInstrumentID",
        },
        {
          headerName: "Quantity",
          field: "Quantity",
        },
        {
          headerName: "retryCount",
          field: "retryCount",
        },
        {
          headerName: "Ref Instrument Id",
          field: "RefInstrumentId",
        },
        {
          headerName: "Region",
          field: "Region",
        },
        {
          headerName: "Repurchase Term",
          field: "RepurchaseTerm",
        },
        {
          headerName: "RPCLDT",
          field: "RPCLDT",
        },
        {
          headerName: "Repo Financing Interest",
          field: "RepoFinancingInterest",
        },
        {
          headerName: "RepoInterest Rate",
          field: "RepoInterestRate",
        },
        {
          headerName: "Source ID",
          field: "SourceID",
        },
        {
          headerName: "Source",
          field: "Source",
        },
        {
          headerName: "Sub Account",
          field: "SubAccount",
        },
        {
          headerName: "Sub Account ID",
          field: "SubAccountID",
        },
        {
          headerName: "Settlement Status",
          field: "SettlementStatus",
        },
        {
          headerName: "SEDOL",
          field: "SEDOL",
        },
        {
          headerName: "Settlement Status ID",
          field: "SettlementStatusID",
        },
        {
          headerName: "Symbol",
          field: "Symbol",
        },
        {
          headerName: "Security Desc",
          field: "SecurityDesc",
        },
        {
          headerName: "External",
          field: "ExternalID",
        },
        {
          headerName: "Spread",
          field: "Spread",
        },
        {
          headerName: "Settle Date",
          field: "SettleDate",
        },
        {
          headerName: "Trade Currency",
          field: "TradeCurrency",
        },
        {
          headerName: "Transaction Type",
          field: "TransactionType",
        },
        {
          headerName: "Txn Sub Type",
          field: "TxnSubType",
        },
        {
          headerName: "Txn Sub Type ID",
          field: "TxnSubTypeID",
        },
        {
          headerName: "Trade Date",
          field: "TradeDate",
        },
        {
          headerName: "Trade ID",
          field: "TradeID",
        },
        {
          headerName: "Text",
          field: "Text",
        },
        {
          headerName: "Transaction ID",
          field: "TransactionID",
        },
        {
          headerName: "Tx Version",
          field: "TxVersion",
        },
        {
          headerName: "Trading Place",
          field: "TradingPlace",
        },
        {
          headerName: "TRS Effective Date",
          field: "TRSEffectiveDate",
        },
        {
          headerName: "TBA Settle Type",
          field: "TBASettleType",
        },
        {
          headerName: "Transaction Type ID",
          field: "TransactionTypeID",
        },
        {
          headerName: "Underlying Symbol",
          field: "UnderlyingSymbol",
        },
        {
          headerName: "User",
          field: "User",
        },
        {
          headerName: "Underlying Financing Rate",
          field: "UnderlyingFinancingRate",
        },
        {
          headerName: "Valuation Currency",
          field: "ValuationCurrency",
        }
      
      ],
      defaultColDef: {
        sortable: true,
        resizable: true,
        //menuTabs: ['filterMenuTab'],
      },
      rowModelType: 'serverSide',
      serverSideStoreType: ServerSideStoreType.Partial,
      debug: true,
      cacheBlockSize: 10000,
      maxBlocksInCache: 3,
      purgeClosedRowNodes: true,
      maxConcurrentDatasourceRequests: 2,
      blockLoadDebounceMillis: 1000,
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
        console.log('############## NEW STORE ##############');
        return res;
      },
      rowGroupPanelShow: 'always',
      rowSelection: 'multiple'
      // getRowNodeId: function (item: any): any {
      //   return item.newid;
      // }
    };
  }

  public componentDidMount(): void { 
    console.log("componentDidMount params..");
    console.log(this.params);
    //this.props.serverSideFullStoreRequest();
    
  }

  onGridReady = (params: any) => {
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

    const dataSource = this.updateDataSource();
    params.api.setServerSideDatasource(dataSource);
  }

  setData = (data: any) => {
    this.setState({ rowData: data });
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
            await this.props.serverSideTransactionsRequest(params.request);
            await this.setData(this.props.data);
            params.successCallback(this.state.rowData.rows, this.state.rowData.lastRow);
            //params.successCallback(this.props.data.rows, this.props.data.lastRow);

          // } catch (err) {
          //   console.error(err);
          //   params.failCallback();
          // }

        }
    };

    return dataSource;
  };


  isRowSelectable = (rowNode: any) => {
    return !rowNode.group;
  };

  refreshCache = (route: any) => {
    //versionCounter++;
    //var purge = document.querySelector('#purge').checked === true;
    this.gridApi.refreshServerSideStore({
      route: route,
      purge: false,
    });
  };
  refreshStore = () => {
    this.gridApi.refreshServerSideStore({ purge: true });
  };

  onFlashOneCell = () => {
    var rowNode: any = this.gridApi.getDisplayedRowAtIndex(4);
    console.log("rowNode..");
    console.log(rowNode);
    this.gridApi.flashCells({
      rowNodes: [rowNode],
      columns: ['id'],
    });
  };

  extractLayout = () => {
    console.log("extractLayout..");
    console.log(this.ColumnApi.getColumnState());

    // JSON.stringify(this.gridApi.getFilterModel());
    // JSON.stringify(this.gridColumnApi.getColumnState());
  }
  onBtRemove = () => {
    var selectedRows = this.gridApi.getSelectedNodes();
    if (!selectedRows || selectedRows.length === 0) {
      return;
    }
    var selectedRow = selectedRows[0];
    console.log("selectedRow..");
    console.log(selectedRow);
    console.log(selectedRow.data);
    console.log("this.states before remove..");
    console.log(this.state.rowData.rows);
    var indexToRemove = this.state.rowData.rows.indexOf(selectedRow.data);
    if (indexToRemove >= 0) {
      this.state.rowData.rows.splice(indexToRemove, 1);
    }
    console.log("this.states after remove..");
    console.log(this.state.rowData.rows);
    // setTimeout(() => { this.gridApi.refreshServerSideStore(this.getCurrentRoutes()); }, 3000);
    this.gridApi.refreshServerSideStore(this.getCurrentRoutes());
    
  };

  getCurrentRoutes = () => {
    console.log('getCurrentRoutes...');
    var storeState = this.gridApi.getServerSideStoreState();
    console.log('Store States...');
    console.log(storeState);
    let currentStore = storeState[storeState.length - 1];
    let currentRoute = currentStore.route;
    let paramsValue = {};
    if(currentRoute.length){
      paramsValue = { route : currentRoute, purge: false };
    }else{
      paramsValue = { purge: true };
    }
    return paramsValue;
  };

  onBtStoreState = () => {
    var storeState = this.gridApi.getServerSideStoreState();
    console.log('Store States:');
    console.log(storeState[storeState.length - 1]);
    storeState.forEach(function (state, index) {
      console.log(
        index +
          ' - ' +
          JSON.stringify(state).replace(/"/g, '').replace(/,/g, ', ')
      );
    });
  };

  jumpTo500 = () => {
    // if (this.gridApi.getInfiniteRowCount() < 501) {
    //   this.gridApi.setRowCount(501, false);
    // }
    this.gridApi.ensureIndexVisible(500);
  };

  jumpToFirst = () => {
    // if (this.gridApi.getInfiniteRowCount() < 501) {
    //   this.gridApi.setRowCount(501, false);
    // }
    this.gridApi.ensureIndexVisible(1);
  };

  selectedRowNodesInfo = () => {
    var selectedNodes = this.gridApi.getSelectedNodes();
    if (!selectedNodes || selectedNodes.length === 0) {
      return;
    }
    console.log("selectedNodes..");
    console.log(selectedNodes);
    var selectedRows = this.gridApi.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
      return;
    }
    console.log("selectedRow..");
    console.log(selectedRows);
  };

  updateSelectedRows = () => {
    var idsToUpdate = this.gridApi.getSelectedNodes().map(function (node) {
      return node.data.id;
    });

      console.log("this.gridApi.getSelectedNodes()...");
      console.log(this.gridApi.getSelectedNodes());
      console.log("idsToUpdate...");
      console.log(idsToUpdate);

    var updatedRows = [];
    this.gridApi.forEachNode(function (rowNode) {
      // console.log("rowNode.data.id...");
      // console.log(rowNode.data.id);
      if (idsToUpdate.indexOf(rowNode.data.id) >= 0) {
        var updated = JSON.parse(JSON.stringify(rowNode.data));
        updated.AccountTypeIDt += 1;
        //rowNode.setData(updated);
        rowNode.setDataValue('AccountTypeIDt', Math.floor(Math.random() * 10000));
        updatedRows.push(updated);
      }
    });
    //updateServerRows(updatedRows);
  };

  onUpdateAccountType = () => {    
    var rowNode: any = this.gridApi.getDisplayedRowAtIndex(1);
    rowNode.setDataValue('AccountTypeIDt', Math.floor(Math.random() * 10000));
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
              <button onClick={() => this.refreshCache(null)}>
                Refresh Top Level
              </button>
              <button onClick={() => this.refreshStore()}>
                Refresh Store
              </button>
              <button
                onClick={() => this.onFlashOneCell()}
                style={{ marginLeft: '15px' }}
              >
                Flash One Cell
              </button>
              <button onClick={() => this.extractLayout()}>
                extractLayout
              </button>
              <button onClick={() => this.onBtRemove()}>
                Remove Selected Row
              </button>
              <button onClick={() => this.onBtStoreState()}>
                Store State
              </button>
              <button onClick={() => this.jumpTo500()}>
                Jump to 500
              </button>
              <button onClick={() => this.jumpToFirst()}>
              Jump to First
              </button>
              <button onClick={() => this.selectedRowNodesInfo()}>
              Selected RowNodes Info
              </button>
              <button onClick={() => this.updateSelectedRows()}>
                Update Selected Rows
              </button>
              <button onClick={() => this.onUpdateAccountType()}>
                Update Account Type Values
              </button>
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
              animateRows={true}
              //getServerSideStoreParams={this.state.getServerSideStoreParams}
              rowGroupPanelShow={this.state.rowGroupPanelShow}
              rowSelection={this.state.rowSelection}
              enableCellChangeFlash={true}
              isRowSelectable={this.isRowSelectable}
              // getRowNodeId={this.state.getRowNodeId}
              
            />

            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
  
}


const mapStateToProps = ({ serverSideTransactions }: ApplicationState) => ({
  loading: serverSideTransactions.loading,
  errors: serverSideTransactions.errors,
  data: serverSideTransactions.data
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
    serverSideTransactionsRequest: (params: any) => dispatch(serverSideTransactionsRequest(params))
  };
};

function numberValueParser(params: any) {
  return Number(params.newValue);
}
function formatNumber(number: any) {
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerSideTransactions);