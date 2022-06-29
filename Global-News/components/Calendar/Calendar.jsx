import React from "react";
import { Modal, Text, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import CalendarHeader from "react-native-calendars/src/calendar/header";

export default function Calendario() {
  return (
    // <Modal visible={true} transparent= {true}>
    <View style={{ flex: 1, borderRadius: 10, paddingTop: 50 }}>
      <View style={{ flex: 1, margin: 10, padding: 60 }}>
        <Calendar
          markingType={"period"}
          // Initially visible month. Default = now
          //   initialDate={"2022-06-29"}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          //   minDate={"2019-01-01"}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          //   maxDate={"2025-05-30"}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            console.log("dia elegido", day);
          }}
          // Handler which gets executed on day long press. Default = undefined
          //   onDayLongPress={(day) => {
          //     console.log("Dia Seleccionado", day);
          //   }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={"MM yyyy"}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log("Cambio de mes", month);
          }}
          // Hide month navigation arrows. Default = false
          //   hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          //   renderArrow={(direction) => <Arrow />}
          // Do not show days of other months in month page. Default = false
          // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={false}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
          firstDay={1}
          // Hide day names. Default = false
          //   hideDayNames={false}
          // Show week numbers to the left. Default = false
          //   showWeekNumbers={false}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={false}
          // Disable right arrow. Default = false
          disableArrowRight={false}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          // Replace default month and year title with custom one. the function receive a date as parameter
          renderHeader={(date) => {
            /*Return JSX*/
          }}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
        />
      </View>
    </View>
    // </Modal>
  );
}
