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
      date: '',
      time: ''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value})
  }

  handleDateChange = (event, date) => {
    this.setState({ date })
  };

  handleTimeChange = (event, time) => {
    this.setState({time})
  };

  handleSubmit(event) {
    event.preventDefault();
    const {title, date, time} = this.state;
    const itemsRef = firebase.database().ref(this.props.user.uid);
    const item = {
      title: title,
      date: date.toString(),
      time: time.toString()
    };
    itemsRef.push(item);
    this.setState({
      title: '',
      date: '',
      time: ''
    })
  }

  render() {
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
              <label htmlFor="date">Date</label>
              <DatePicker
                hintText="Enter Date"
                value={this.state.date}
                onChange={this.handleDateChange}
              />
              <label htmlFor="time">Time</label>
              <TimePicker
                format="24hr"
                hintText="Enter Time"
                value={this.state.time}
                onChange={this.handleTimeChange}
              />
              <button onClick={this.handleSubmit}>Submit</button>
            </fieldset>
          </form>
        </MuiThemeProvide>
      </div>
    )
  }
}

export default AppointmentForm;
