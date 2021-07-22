const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors'); 
var app = express();
var dbConn = require('./config/db.config');

import OlympicWinnersService from './olympicWinnersService';
import TransactionsService from './transactionsService';

app.use(function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");  
    next();  
}); 

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.get('/olympicWinners' , (req, res) => {
    dbConn.query('SELECT * FROM sample_data.olympic_winners', (err, rows, fields) => {
        if (!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    });
});

app.post('/olympicWinners', function (req, res) {
    OlympicWinnersService.getData(req.body, (rows, lastRow) => {
        res.json({rows: rows, lastRow: lastRow});
    });
});

app.post('/transactions', function (req, res) {
    TransactionsService.getData(req.body, (rows, lastRow) => {
        res.json({rows: rows, lastRow: lastRow});
    });
});

app.get('/updates', function (req, res) {
    let rowData = [{
        AccountType: "Abdul",
        AccountTypeID: 2,
        AccountTypeIDt: Math.floor(Math.random() * 10000),
        AccruedFee: null,
        AccruedInterest: null,
        AltSrc: "",
        AmortFactor: null,
        BBYellowKey: "",
        BusinessUnitID: 96466,
        BusinessUnitName: "Graciela",
        CPtyRefID: null,
        ClearingAccountNAME: "AA-BB-CC",
        ConfirmRefID: "",
        ConfirmStatusName: "Not Sent",
        Counterparty: null,
        CurrentFace: 0,
        Cusip: "",
        Desk: "RTYUi",
        DeskID: 3462,
        DividendRate: 123,
        Division: null,
        DivisionID: null,
        ExecutingAccount: null,
        ExecutingCounterparty: null,
        ExecutingCounterpartyID: null,
        ExecutingMethod: "",
        ExecutingType: "",
        ExecutionVenue: null,
        ExternalID: "46774251",
        FeeSum: 0,
        FinancialType: "CURENCY",
        Firm: "",
        FirmID: 102624,
        GrossAmount: null,
        ISIN: "",
        InstrumentTypeID: 6,
        InvestmentManager: null,
        ModifiedBy: null,
        NetSettlement: -495,
        NettingID: "",
        Note: null,
        Notional: null,
        OrderID: "",
        OriginalFace: null,
        PB: "",
        PSETCode: "",
        PositionQueueStatus: "Approved",
        Price: null,
        PrimaryInstrumentID: 4,
        Quantity: -495,
        RPCLDT: "",
        RefInstrumentId: "21081256",
        Region: null,
        RepoFinancingInterest: null,
        RepoInterestRate: 0,
        RepurchaseTerm: null,
        SEDOL: "",
        SecurityDesc: "DESCRIPTION SECURITY",
        SettleDate: "2021-06-25",
        SettlementStatus: null,
        SettlementStatusID: null,
        Source: null,
        SourceID: 2,
        Spread: null,
        SubAccount: "MRRGIN",
        SubAccountID: 7389,
        Symbol: "DOLLL",
        TBASettleType: "",
        TRSEffectiveDate: "",
        Text: null,
        TradeCurrency: "SOLL",
        TradeDate: "2021-06-10",
        TradeID: "",
        TradingPlace: null,
        TransactionID: 917304177,
        TransactionType: "DIV",
        TransactionTypeID: 9,
        TxVersion: 1,
        TxnSubType: "",
        TxnSubTypeID: null,
        UnderlyingFinancingRate: 0,
        UnderlyingSymbol: "",
        User: "sabc-cd-er",
        ValuationCurrency: "CURR",
        id: 8,
        offset: 0,
        retryCount: 0
    }]
    res.json({rows: rowData});
});

app.listen(8000, () => {
    console.log('Started on localhost:8000');
});