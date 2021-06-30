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
  getRowNodeId?: any
}


type PropsFromRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
interface OwnProps extends AgGridReactProps {};

export type Props = PropsFromRedux & OwnProps;

// sorting

const countries = [
  'United States',
  'Russia',
  'Australia',
  'Canada',
  'Norway',
  'China',
  'Zimbabwe',
  'Netherlands',
  'South Korea',
  'Croatia',
  'France',
  'Japan',
  'Hungary',
  'Germany',
  'Poland',
  'South Africa',
  'Sweden',
  'Ukraine',
  'Italy',
  'Czech Republic',
  'Austria',
  'Finland',
  'Romania',
  'Great Britain',
  'Jamaica',
  'Singapore',
  'Belarus',
  'Chile',
  'Spain',
  'Tunisia',
  'Brazil',
  'Slovakia',
  'Costa Rica',
  'Bulgaria',
  'Switzerland',
  'New Zealand',
  'Estonia',
  'Kenya',
  'Ethiopia',
  'Trinidad and Tobago',
  'Turkey',
  'Morocco',
  'Bahamas',
  'Slovenia',
  'Armenia',
  'Azerbaijan',
  'India',
  'Puerto Rico',
  'Egypt',
  'Kazakhstan',
  'Iran',
  'Georgia',
  'Lithuania',
  'Cuba',
  'Colombia',
  'Mongolia',
  'Uzbekistan',
  'North Korea',
  'Tajikistan',
  'Kyrgyzstan',
  'Greece',
  'Macedonia',
  'Moldova',
  'Chinese Taipei',
  'Indonesia',
  'Thailand',
  'Vietnam',
  'Latvia',
  'Venezuela',
  'Mexico',
  'Nigeria',
  'Qatar',
  'Serbia',
  'Serbia and Montenegro',
  'Hong Kong',
  'Denmark',
  'Portugal',
  'Argentina',
  'Afghanistan',
  'Gabon',
  'Dominican Republic',
  'Belgium',
  'Kuwait',
  'United Arab Emirates',
  'Cyprus',
  'Israel',
  'Algeria',
  'Montenegro',
  'Iceland',
  'Paraguay',
  'Cameroon',
  'Saudi Arabia',
  'Ireland',
  'Malaysia',
  'Uruguay',
  'Togo',
  'Mauritius',
  'Syria',
  'Botswana',
  'Guatemala',
  'Bahrain',
  'Grenada',
  'Uganda',
  'Sudan',
  'Ecuador',
  'Panama',
  'Eritrea',
  'Sri Lanka',
  'Mozambique',
  'Barbados',
];


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
    if (filterModel.age) {
      let age = item.age;
      let allowedAge = parseInt(filterModel.age.filter);
      if (filterModel.age.type === 'equals') {
        if (age !== allowedAge) {
          continue;
        }
      } else if (filterModel.age.type === 'lessThan') {
        if (age >= allowedAge) {
          continue;
        }
      } else {
        if (age <= allowedAge) {
          continue;
        }
      }
    }
    if (filterModel.athlete) {
      let valueLowerCase = item.athlete.toString().toLowerCase();
      let filterTextLowerCase = filterModel.athlete.filter.toString().toLowerCase();
      // console.log('valueLowerCase...');
      // console.log(valueLowerCase);
      // console.log('filterTextLowerCase...');
      // console.log(filterTextLowerCase);
      if (filterModel.athlete.type === 'contains') {
        if (valueLowerCase.indexOf(filterTextLowerCase) < 0) {
          continue;
        }
      }
      if (filterModel.athlete.type === 'startsWith') {
        if (valueLowerCase.indexOf(filterTextLowerCase) < 0 || valueLowerCase.indexOf(filterTextLowerCase) > 0) {
          continue;
        }
      }
      if (filterModel.athlete.type === 'endsWith') {
        let index = valueLowerCase.lastIndexOf(filterTextLowerCase);        
        if (index < 0 || index !== (valueLowerCase.length - filterTextLowerCase.length)) {
          continue;
        }
      }
    }
    if (filterModel.year) {
      if (filterModel.year.values.indexOf(item.year.toString()) < 0) {
        continue;
      }
    }
    if (filterModel.country) {
      if (filterModel.country.values.indexOf(item.country) < 0) {
        continue;
      }
    }
    resultOfFilter.push(item);
  }
  return resultOfFilter;
}

class InfiniteScrollGrid extends Component<Props, GridState> {
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
        // filter: true,
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
          headerName: "Athlete",
          field: "athlete",
          filter: 'agTextColumnFilter',
          filterParams: {
            filterOptions: ['contains','startsWith','endsWith'],
            suppressAndOrCondition: true,
          },
          suppressMenu: true
        },
        {
          headerName: "Age",
          field: "age",
          filter: 'agNumberColumnFilter',
          filterParams: {
            filterOptions: ['equals','lessThan','greaterThan'],
            suppressAndOrCondition: true,
          }
        },
        {
          headerName: "Country",
          field: "country",
          filter: 'agSetColumnFilter', 
          filterParams: {
            values: countries
          }
        },
        {
          headerName: "Year",
          field: "year",
          filter: 'agSetColumnFilter', 
          filterParams: {
            values: ['2000','2004','2008','2012'], 
          }
        },
        {
          headerName: "Date",
          field: "date",
          suppressMenu: true
        },
        {
          headerName: "Sport",
          field: "sport",
          suppressMenu: true
        },
        {
          headerName: "Gold",
          field: "gold",
          suppressMenu: true
        },
        {
          headerName: "Silver",
          field: "silver",
          suppressMenu: true
        },
        {
          headerName: "Bronze",
          field: "bronze",
          suppressMenu: true
        },
        {
          headerName: "Total",
          field: "total",
          suppressMenu: true
        }
      ],
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
    this.setData();
  }

  setData = async() => {
    await this.props.fetchInfiniteScroll();
    this.setState({ rowData: this.props.data });
  };

  onGridReady = async(params: any): Promise<any> => {
    console.log("params..");
    console.log(params);
    this.params = params;
    this.gridApi = params.api;
    await this.setData();
    this.updateData(this.state.rowData);

  }

  updateData = (data: any): void => {
    // console.log("data.length..");
    // console.log(data.length);
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