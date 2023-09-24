import { View, Text } from 'react-native'
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native';


const TreatmentUpdate = ({ navigation }) => {
  const [dateTime, setDateTime] = useState(new Date());
  const [dateVisible, setDateVisible] = useState(false);

  useEffect(() => {
    // retrieveDateTime();
  }, []);

  const retrieveDateTime = async () => {
    try {
      const storedDateTime = await AsyncStorage.getItem('dateTime');
      if (storedDateTime !== null) {
        setDateTime(new Date(storedDateTime));
        console.log('Date and time retrieved successfully!');
        console.log(dateTime)
      }
    } catch (error) {
      console.log('Error retrieving date and time:', error);
    }
  };

  const storeDateTime = async (dateTime) => {
    try {
      await AsyncStorage.setItem('dateTime', dateTime.toISOString());
      console.log('Date and time stored successfully!');
      console.log(dateTime)
    } catch (error) {
      console.log('Error storing date and time:', error);
    }
  };

  const handleDateTimeChange = (event, updatedDateTime) => {
    dateTime = updatedDateTime;
  };


  return (
    <View>
      <Text>Update Treatment</Text>
      <Text>Starting Date: {dateTime.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}</Text>
      <Text>Starting Time: {dateTime.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      })}</Text>
      <Button title='Cancel' onPress={() => navigation.goBack()} />
      <Button title='Update' onPress={handleDateTimeChange} />
      <RNDateTimePicker mode='date' value={dateTime} onChange={handleDateTimeChange} />
      <RNDateTimePicker mode='time' value={dateTime} onChange={handleDateTimeChange} />
    </View>

  )
}

export default TreatmentUpdate