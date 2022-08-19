import { Container,Form } from 'react-bootstrap';
import React from 'react';
import '../App.css';

class FormField extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      value: props.value
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    if(this.props.handleOnChange){

      this.props.handleOnChange(e);
      this.setState({
        value: e.target.value
      })
    }
  };

  render(){

  
    if(this.props.disabled){
        return (
            <>
            
            <div className='mt-3'>
            <p><b>{this.props.label}:</b></p>
            <Form.Control
            type="text"
            placeholder={this.props.value}
            aria-label="Disabled input example"
            disabled
            readOnly
          />
        
        
            </div>
            </>
        );
    }

    

  return (
    <>
    <div className='mt-3'>
    <p><b>{this.props.label}:</b></p>
    <Form.Control
    onChange={this.onChange}
    type="text"
    placeholder={this.props.value}
    aria-label="Disabled input example"

  />


    </div>
    </>
  );
  }
}
export default FormField;
