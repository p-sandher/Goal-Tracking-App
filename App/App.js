import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';
import {useState} from 'react'

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput'
// React Functional Component

export default function App() {
  
  const[modalIsVisible, setModalIsVisible] = useState(false);
  // A list of the course goals
  const [courseGoals, setCourseGoals] = useState([]);
  // Fetch user input

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function addGoalHandler({title}){
  }
  
  function endAddGoalHandler() {
    setModalIsVisible(false);
  }
  
  // Fired when button is pressed
  function addGoalHandler(enteredGoalText) {
    // Automatically provided by react
    // spread existing goals into the array with the new one. new state depends on previous state so a function should be passed
    // automatically by react 
    setCourseGoals( (currentCourseGoals) => [
      ...currentCourseGoals,
      enteredGoalText, //a list of data with keys
    ]);
    endAddGoalHandler();
  };

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
    console.log('delete');
  }

  return (
    // view is a component to hold other components, have multipel child componenets
    // similar to div, but for react native 

    <View style={styles.appContainer}>  
      <Button 
        title='Add New Goal' 
        color='#5e0acc'
        onPress={startAddGoalHandler}
      />
      <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler}/>
      
      {/* outerview controlls how much scrollview space there is  */}
      
      <View style={styles.goalsContainer}>
        {/* FlatList renders as you go, uses less power */}
        <FlatList 
          data={courseGoals} 
          // render, functio prop. receive individual item as a parameter. calls whenever a new item needs to be
          // rendered. 
          renderItem={(itemData) => {
            return <GoalItem 
                text={itemData.item} 
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />;
          }} 
          alwaysBounceVertical={false}
        />
        {/* get goal from array and return it, key to make it unique */}
        {/* wrapped in another view to get rounded corners */}
          
      </View>

    </View>
    
  );
}

// Stylesheet component
// No css. Either inline styles or stylesheet object 
// CSS styling doesnt cascade
const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#CBC3E3'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dummyText: {
    margin: 16,
    borderWidth: 2,
    borderColor: 'red',
    padding: 16
  },
  // 1 forth
  
  goalsContainer: {
    // in child components, flex is the summation
    flex: 5 
  },
  
});


