import React, {Component} from 'react';
import MuiThemeProvide from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import firebase from '../../firebase';
import './AppointmentForm.css';

class AppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      controlledDate: null,
      controlledTime: null,
      titleEmpty: false,
      dateEmpty: false,
      timeEmpty: false
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fieldEmptyValidation = this.fieldEmptyValidation.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value})
  }

  handleDateChange = (event, date) => {
    this.setState({ controlledDate: date })
  };

  handleTimeChange = (event, time) => {
    this.setState({controlledTime: time})
  };

  fieldEmptyValidation(title, date, time) {
    let valid = true;
    if (title.length === 0) {
      this.setState({titleEmpty:true});
      valid = false
    } else {
      this.setState({titleEmpty: false})
    }

    if (!date) {
      this.setState({dateEmpty:true});
      valid = false
    } else  {
      this.setState({dateEmpty: false})
    }

    if (!time) {
      this.setState({timeEmpty:true});
      valid = false
    } else  {
      this.setState({timeEmpty: false})
    }

    return valid;
  }

  handleSubmit(event) {
    event.preventDefault();
    const {title, controlledDate, controlledTime} = this.state;
    let valid = this.fieldEmptyValidation(title, controlledDate, controlledTime);
    if (valid) {
      const itemsRef = firebase.database().ref(this.props.user.uid);
      const item = {
        title: title,
        date: controlledDate.toLocaleDateString(),
        time: controlledTime.toLocaleTimeString().slice(0, 5)
      };
      itemsRef.push(item);
      this.setState({
        title: '',
        controlledDate: null,
        controlledTime: null
      })
    } else {
      console.log('Please correct errors')
    }
  }

  render() {
    let titleError, dateError, timeError = null;
    if (this.state.titleEmpty) {
      titleError = <p className="error">Title is Required.</p>
    }
    if (this.state.dateEmpty) {
      dateError = <p className="error">Date is Required.</p>
    }
    if (this.state.timeEmpty) {
      timeError = <p className="error">Time is Required.</p>
    }
    return (
      <div className="column container_column">
        <h4>Make an Appointment</h4>
        <MuiThemeProvide>
          <form>
            <fieldset>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                value={this.state.title}
                onChange={this.handleTitleChange}
                placeholder="Enter Title"
              />
              {titleError}
              <label htmlFor="date">Date</label>
              <DatePicker
                hintText="Enter Date"
                value={this.state.controlledDate}
                onChange={this.handleDateChange}
              />
              {dateError}
              <label htmlFor="time">Time</label>
              <TimePicker
                format="24hr"
                hintText="Enter Time"
                value={this.state.controlledTime}
                onChange={this.handleTimeChange}
              />
              {timeError}
              <button onClick={this.handleSubmit}>Submit</button>
            </fieldset>
          </form>
        </MuiThemeProvide>
      </div>
    )
  }
}

export default AppointmentForm;
