import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { startDay, endDay } from "../../store/calendar";
import { Modal, Text, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import CalendarHeader from "react-native-calendars/src/calendar/header";

export default function Calendario(props) {

  const {text} = props
console.log("esto es text", text)
  const dispatch = useDispatch();

  const handleSelect = (day) => {
    dispatch(
      text === "start" ?  startDay(day.dateString) : endDay(day.dateString))
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