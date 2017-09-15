import React, {Component} from 'react';
import firebase from './firebase';
import map from 'lodash/map';
import AppointmentItem from './AppointmentItem'

class AppointmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null
    }
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref(this.props.user.uid);
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      this.setState({
        items
      });
    })
  }

  render() {
    return (
      <div>
        <h4>Appointment List</h4>
        {map(this.state.items, (item, key) => {
          return <AppointmentItem
            key={key}
            title={item.title}
            date={item.date}
            time={item.time}
          />;
        })}
      </div>

    )
  }
}

export default AppointmentList;