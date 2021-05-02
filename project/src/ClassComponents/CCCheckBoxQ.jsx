import React, { Component } from 'react';
//import Checkbox from './Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup'
const items = [
  'One',
  'Two',
  'Three',
];

class CCCheckBoxQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCheckboxes:[]
        }
        
    }
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
      console.log(this.selectedCheckboxes)
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
    console.log(this.selectedCheckboxes)
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }
  }

  createCheckbox = label => (
    // <Checkbox
    //         label={label}
    //         handleCheckboxChange={this.toggleCheckbox}
    //         key={label}
    //     />

        <FormControlLabel
       control={
        <Checkbox
        checked={this.selectedCheckboxes.has(label)} 
        onChange={this.toggleCheckbox}
          name={label}

          color="default"
        />
      }
      label={label}
    />
  )



  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">

          <FormGroup>
         {items.map(this.createCheckbox)}

             </FormGroup>

          </div>
        </div>
      </div>
    );
  }
}

export default CCCheckBoxQ;
