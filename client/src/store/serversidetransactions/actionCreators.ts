import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { toast } from 'react-toastify';
import faker from  "faker";

import { ServerSideTransactionsActionTypes } from "./actionTypes";
import { ServerSideTransactionsActions } from "./actions";

import { ApplicationState } from "../index";
import axios from 'axios';

export type AppThunk = ThunkAction<Promise<any>,
  ApplicationState,
  null,
  ServerSideTransactionsActions
>;

export const serverSideTransactionsRequest: ActionCreator<AppThunk> = (params) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ServerSideTransactionsActionTypes.SERVER_SIDE_TRANSACTIONS_DATA_REQUEST,
    });
    try {
      console.log("ServerSideTransactions params..");
    console.log(params);
      const response = await axios
        .post('http://localhost:8000/transactions', params)
        .then(res => res.data);
        console.log("response...");
        console.log(response);

      return dispatch({
        type: ServerSideTransactionsActionTypes.SERVER_SIDE_TRANSACTIONS_DATA_SUCCESS,
        payload: response
      });

    } catch (err) {
      return dispatch({
        type: ServerSideTransactionsActionTypes.SERVER_SIDE_TRANSACTIONS_DATA_ERROR,
        payload: "Error in Fetching data"
      });
    }
  };
};

export const serverSideUpdateRequest: ActionCreator<AppThunk> = (params) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ServerSideTransactionsActionTypes.SERVER_SIDE_TRANSACTIONS_UPDATE_REQUEST,
    });
    try {
      console.log("ServerSideTransactions params..");
    console.log(params);
      const response = await axios
        .get('http://localhost:8000/updates', params)
        .then(res => res.data);
        console.log("response...");
        console.log(response);

      return dispatch({
        type: ServerSideTransactionsActionTypes.SERVER_SIDE_TRANSACTIONS_UPDATE_SUCCESS,
        payload: response
      });

    } catch (err) {
      return dispatch({
        type: ServerSideTransactionsActionTypes.SERVER_SIDE_TRANSACTIONS_UPDATE_ERROR,
        payload: "Error in Fetching data"
      });
    }
  };
};

// export const serverSideFullStoreRequest: ActionCreator<AppThunk> = () => {
//   return async (dispatch: Dispatch) => {
//     dispatch({
//       type:ServerSideFullStoreActionTypes.SERVER_SIDE_FULLSTORE_DATA_REQUEST
//     });

//     try {
//       let response = [];
//       for (let i = 0; i < 500000; i++) {
//         response.push({
//           id: i,
//           AccountTypeIDt: 1,
//           AccruedFee: null,
//           AccountType: `${faker.name.firstName()}`,
//           AccountTypeID: 2,
//           AccruedInterest: null,
//           AmortFactor: null,
//           AltSrc: '',
//           BBYellowKey: '',
//           BusinessUnitID: parseInt(`${faker.address.zipCode()}`),
//           BusinessUnitName: `${faker.name.firstName()}`,
//           ConfirmStatusName: 'Not Sent',
//           ClearingAccountNAME: 'AA-BB-CC',
//           ConfirmRefID: '',
//           CurrentFace: 0,
//           Cusip: '',
//           CPtyRefID: null,
//           Counterparty: null,
//           Desk: 'RTYUi',
//           DeskID: 3462,
//           DividendRate: 123,
//           Division: null,
//           DivisionID: null,
//           ExecutingCounterpartyID: null,
//           ExecutingCounterparty: null,
//           FirmID: 102624,
//           Firm: 'EDED',
//           ExternalID: '46774251',
//           ExecutingMethod: '',
//           ExecutionVenue: null,
//           ExecutingType: '',
//           ExecutingAccount: null,
//           FinancialType: 'CURENCY',
//           FeeSum: 0,
//           GrossAmount: null,
//           ISIN: '',
//           InstrumentTypeID: 6,
//           InvestmentManager: null,
//           ModifiedBy: null,
//           NetSettlement: -495,
//           Notional: null,
//           Note: null,
//           NettingID: '',
//           OrderID: '',
//           OriginalFace: null,
//           offset: 0,
//           Price: null,
//           PositionQueueStatus: 'Approved',
//           PSETCode: '',
//           PB: '',
//           PrimaryInstrumentID: 4,
//           Quantity: -495,
//           retryCount: 0,
//           RefInstrumentId: '21081256',
//           Region: null,
//           RepurchaseTerm: null,
//           RPCLDT: '',
//           RepoFinancingInterest: null,
//           RepoInterestRate: 0,
//           SourceID: 2,
//           Source: null,
//           SubAccount: 'MRRGIN',
//           SubAccountID: 7389,
//           SettlementStatus: null,
//           SEDOL: '',
//           SettlementStatusID: null,
//           Symbol: 'DOLLL',
//           SecurityDesc: 'DESCRIPTION SECURITY',
//           Spread: null,
//           SettleDate: '2021-06-25',
//           TradeCurrency: 'SOLL',
//           TransactionType: 'DIV',
//           TxnSubType: '',
//           TxnSubTypeID: null,
//           TradeDate: '2021-06-10',
//           TradeID: '',
//           Text: null,
//           TransactionID: 917304177,
//           TxVersion: 1,
//           TradingPlace: null,
//           TRSEffectiveDate: '',
//           TBASettleType: '',
//           TransactionTypeID: 9,
//           UnderlyingSymbol: '',
//           User: 'sabc-cd-er',
//           UnderlyingFinancingRate: 0,
//           ValuationCurrency: 'CURR'
//         });

//       } 

//       console.log(response);
//       return dispatch({
//         type: ServerSideFullStoreActionTypes.SERVER_SIDE_FULLSTORE_DATA_SUCCESS,
//         payload: response
//       });

//     } catch (err) {
//       return dispatch({
//         type: ServerSideFullStoreActionTypes.SERVER_SIDE_FULLSTORE_DATA_ERROR,
//         payload: 'Error in Fetching data'
//       });
//     }
//   }
// }

