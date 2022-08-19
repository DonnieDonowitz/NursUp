import React from 'react';
import {Table} from 'react-bootstrap';

class CustomTable extends React.Component{

    constructor(props){
        super(props);
        let headers = props.headers;
        let records = props.records;
        let actions = props.actions;

        
        this.state = {
            headers: headers,
            records: records,
            actions: actions
        }
    }

    render(){
        return (
            <>
                  <Table responsive="sm">
    <thead>
      <tr>
          
          {
          this.state.headers.map((header,idx) => 
          <th>{header}</th>
          )
          }
        
      </tr>
    </thead>
    <tbody>
        {this.state.records.map((record,idx) => 
        { 
            const keys = Object.keys(record);
            let row = keys.map(key => <td>{record[key]}</td>);

            return <tr>{row}</tr>;

        
        }
        
        )}
    </tbody>
    </Table>
            </> 
        )
    }
}

export default CustomTable;