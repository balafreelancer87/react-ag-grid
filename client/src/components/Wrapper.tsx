import React, { Component} from 'react';
import Nav from './Nav';


interface WrapperState { 

}

class Wrapper extends Component<{}, WrapperState> {

  public render(){
    return (
      <>
        <div className="container-fluid">
            <div className="row">
                <Nav/>
                <main className="col-md-10 mx-auto px-md-4" style={{ marginTop: "20px" }}>
                    {this.props.children}
                </main>
            </div>
        </div>
      </>
    );
  }
  
}

export default Wrapper;
