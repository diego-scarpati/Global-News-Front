import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectDay } from "../../store/calendar";
import { Modal, Text, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import CalendarHeader from "react-native-calendars/src/calendar/header";

export default function Calendario() {

  const dispatch = useDispatch();

  const handleSelect = (day) => {
    dispatch(selectDay(day.dateString))
    console.log('Dia: ',day.dateString)
  }

  return (
    // <Modal visible={true} transparent= {true}>
    <View style={{ flex: 1, borderRadius: 10, paddingTop: 50 }}>
      <View style={{ flex: 1, margin: 10, padding: 60 }}>
        <Calendar
          onChange={(range) => console.log(range)}
          minDate={new Date().toString()}
          startDate={new Date().toString()}
          endDate={new Date().toString()}
        
          theme={{
            activeDayColor: {},
            monthTitleTextStyle: {
              color: "#6d95da",
              fontWeight: "300",
              fontSize: 16,
            },
            emptyMonthContainerStyle: {},
            emptyMonthTextStyle: {
              fontWeight: "200",
            },
            weekColumnsContainerStyle: {},
            weekColumnStyle: {
              paddingVertical: 10,
            },
            weekColumnTextStyle: {
              color: "#b6c1cd",
              fontSize: 13,
            },
            nonTouchableDayContainerStyle: {},
            nonTouchableDayTextStyle: {},
            startDateContainerStyle: {},
            endDateContainerStyle: {},
            dayContainerStyle: {},
            dayTextStyle: {
              color: "#2d4150",
              fontWeight: "200",
              fontSize: 15,
            },
            dayOutOfRangeContainerStyle: {},
            dayOutOfRangeTextStyle: {},
            todayContainerStyle: {},
            todayTextStyle: {
              color: "#6d95da",
            },
            activeDayContainerStyle: {
              backgroundColor: "#6d95da",
            },
            activeDayTextStyle: {
              color: "white",
            },
            nonTouchableLastMonthDayTextStyle: {},
          }}
          disableArrowLeft={false}
          disableArrowRight={false}
          onDayPress = {(day)=> handleSelect(day)}
        />
      
      </View>
    </View>

  );
}

// import { connect } from 'react-redux';
// import React, { Component } from 'react';
// import {StyleSheet,Text,View,} from 'react-native';
// import CalendarPicker from 'react-native-calendar-picker';
// import { setStart, setEnd } from '../../store/calendar';



// class Calendar extends Component {
 
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedStartDate: null,
//     };
//     this.onDateChange = this.onDateChange.bind(this);
//   }

//   onDateChange(date) {
//     this.setState({selectedStartDate: date,});
//     this.props.setDate(date._i,this.props.text)
//   }

//   render() {
//     const { selectedStartDate } = this.state;
//     const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    
//     return (
//       <View style={styles.container}>
//         <CalendarPicker

//           onDateChange={this.onDateChange}
//         />
//          <Text>{startDate}</Text>
//       </View>
//     );
//   }
  
// }

// const mapDispatchToProps=(dispatch)=>{ 
// return{
//   setDate:(date,text)=>{
//   console.log(text)
  
// const action = text === "start" ? setStart : setEnd
//       dispatch(action(date))}} 
// }

// export default connect(null, mapDispatchToProps)(Calendar)


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     marginTop: 100,
//   },
// });

