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
          suppressMenu: true
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
            buttons: ['reset'],
            debounceMs: 1000,
            suppressAndOrCondition: true,
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
      defaultColDef: {
        sortable: true,
        resizable: true,
        menuTabs: ['filterMenuTab'],
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
        return res;
      }
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

  setData = (reqParams: any) => {
    this.props.serverSideTransactionsRequest(reqParams);
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
            await this.props.serverSideTransactionsRequest(params.request);
            params.successCallback(this.props.data.rows, this.props.data.lastRow);

          // } catch (err) {
          //   console.error(err);
          //   params.failCallback();
          // }

          // demo sample code
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
          // });

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

export default connect(mapStateToProps, mapDispatchToProps)(ServerSideTransactions);