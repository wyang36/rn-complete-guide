import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const handleAddGoal = enteredGoal => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: enteredGoal }
    ]);
    setIsAddMode(false);
  };

  const handleRemoveGoal = goalId => {
    setCourseGoals(currentGoals =>
      currentGoals.filter(goal => goal.id !== goalId)
    );
  };

  const handleCancelGoalAddtional = () => setIsAddMode(false);

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        onAddGoal={handleAddGoal}
        visible={isAddMode}
        onCancel={handleCancelGoalAddtional}
      />
      <FlatList
        data={courseGoals}
        keyExtractor={goal => goal.id}
        renderItem={itemData => (
          <GoalItem
            title={itemData.item.value}
            onDelete={() => handleRemoveGoal(itemData.item.id)}
          />
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
