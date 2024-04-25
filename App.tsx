import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirstScreen from './components/firstscreen/FirstScreen';
import Login from './components/loginandregistrationpage/Login';
import Registration from './components/loginandregistrationpage/Registration';
import Home from './components/home/Home';
import Dairy from './components/dairy/Dairy';
import Symptoms from './components/symptoms/Symptoms';
import Waterreminder from './components/waterreminder/Waterreminder';
import Userprofile from './components/userprofile/Userprofile';
import Food from './components/food/Food';
import SymptomTracker from './components/symptomtracker/SymptomTracker';
import Meal from './components/meal/Meal';
import Medication from './components/medication/Medication';
import About from './components/about/About';
import Search from './components/search/Search';
import Symptomdata from './components/symptomdata/Symptomdata';
import FoodItem from './components/fooditem/FoodItem';
import Waterintake from './components/waterintake/Waterintake';
import Symptomsuggestion from './components/symptomsuggestion/Symptomsuggestion';
import TriggeredItems from './components/triggereditems/TriggeredItems';
import Triggerrecommendation from './components/triggerrecommendation/Triggerrecommendation';
import Chatbot from './components/chatbot/Chatbot';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const loginStatus = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(loginStatus === 'true');
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={() => ({ headerShown: false })}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Dairy" component={Dairy} />
            <Stack.Screen name="Symptoms" component={Symptoms} />
            <Stack.Screen name="Waterreminder" component={Waterreminder} />
            <Stack.Screen name="Userprofile">
              {({ navigation }) => <Userprofile navigation={navigation} onLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="Food" component={Food} />
            <Stack.Screen name="SymptomTracker" component={SymptomTracker} />
            <Stack.Screen name="Meal" component={Meal} />
            <Stack.Screen name="Medication" component={Medication} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Symptomdata" component={Symptomdata} />
            <Stack.Screen name="FoodItem" component={FoodItem} />
            <Stack.Screen name="Waterintake" component={Waterintake} />
            <Stack.Screen name="Symptomsuggestion" component={Symptomsuggestion} />
            <Stack.Screen name="TriggeredItems" component={TriggeredItems} />
            <Stack.Screen name="Triggerrecommendation" component={Triggerrecommendation} />
            <Stack.Screen name="Chatbot" component={Chatbot} />
          </>
        ) : (
          <>
            <Stack.Screen name="FirstScreen" component={FirstScreen} />
            <Stack.Screen name="Login">
              {({ navigation }) => <Login navigation={navigation} onLogin={() => setIsLoggedIn(true)} />}
            </Stack.Screen>
            <Stack.Screen name="Registration" component={Registration} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
