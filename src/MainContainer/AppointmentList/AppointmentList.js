import React, {Component} from 'react';
import firebase from '../../firebase';
import map from 'lodash/map';
import './AppointmentList.css';
import AppointmentItem from './AppointmentItem/AppointmentItem'

class AppointmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref(this.props.user.uid);
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let itemsArr = [];
      map(items, (item, key) => {
        let itemObj = {
          key: key,
          title: item.title,
          date: item.date,
          time: item.time
        };
        itemsArr.push(itemObj);
      });
      itemsArr.sort((x, y) => {
        if (x.date === y.date) {
          return (x.time < y.time) ? -1 : (x.time > y.time) ? 1 : 0;
        } else {
          return (x.date < y.date) ? -1: 1
        }
      });
      this.setState({
        items: itemsArr
      });
    })
  }

  onDelete(key) {
    const itemsRef = firebase.database().ref(this.props.user.uid);
    itemsRef.child(key).remove();
  }

  render() {
    let {items} = this.state;
    return (
      <div className="appointment_list">
        <h4>Appointment List</h4>
        {
          items.map((item) => {
            return <AppointmentItem
              key={item.key}
              title={item.title}
              date={item.date}
              time={item.time}
              onDelete={() => this.onDelete(item.key)}
            />
          })
        }
      </div>

    )
  }
}

export default AppointmentList;