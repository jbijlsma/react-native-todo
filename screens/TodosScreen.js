import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";

function TodosScreen({ headerHeight }) {
  const [newTaskText, setNewTaskText] = useState();
  const [tasks, setTasks] = useState([]);

  const insets = useSafeAreaInsets();

  const newTaskTextRef = useRef();

  function toggleTaskDone(taskId) {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) return { ...task, done: !task.done };
        else return task;
      })
    );
  }

  function deleteTask(taskId) {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  function newTaskTextChangeHandler(newText) {
    setNewTaskText(newText);
  }

  function addTask() {
    if (newTaskText) {
      setTasks((tasks) => [
        ...tasks,
        { id: Math.random() * 10000, title: newTaskText, done: false },
      ]);

      // https://github.com/facebook/react-native/issues/29073
      // Setting autoCorrect to false did NOT solve the issue that newTaskText was not cleared
      setTimeout(() => {
        setNewTaskText(null);
        newTaskTextRef.current.focus();
      }, 5);
    }
  }

  let tasksContent = (
    <View style={styles.noTasksContainer}>
      <Ionicons
        style={styles.noTasksIcon}
        name="ios-checkmark"
        color="rgb(0, 33, 66)"
        size={64}
      />
      <Text style={styles.noTasksText}>No Tasks</Text>
    </View>
  );

  if (tasks && tasks.length > 0) {
    tasksContent = (
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={(itemData) => {
          const task = itemData.item;

          return (
            <Pressable
              onPress={toggleTaskDone.bind(this, task.id)}
              style={({ pressed }) => [
                styles.itemContainer,
                pressed && { backgroundColor: "#e8e6e6" },
                task.done && { backgroundColor: "rgb(218, 231, 255)" },
              ]}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Checkbox
                  value={task.done}
                  onValueChange={toggleTaskDone.bind(this, task.id)}
                  style={styles.checkbox}
                />
                <Text style={[styles.label, task.done && styles.done]}>
                  {task.title}
                </Text>
              </View>
              {task.done && (
                <Pressable
                  onPress={deleteTask.bind(this, task.id)}
                  style={({ pressed }) => [
                    styles.deleteBtnContainer,
                    pressed && styles.pressed,
                  ]}
                >
                  <Ionicons
                    name="trash"
                    color="#686868"
                    size={22}
                  />
                </Pressable>
              )}
            </Pressable>
          );
        }}
      />
    );
  }

  return (
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={newTaskTextRef}
          onChangeText={newTaskTextChangeHandler}
          onSubmitEditing={addTask}
          value={newTaskText}
          style={styles.input}
          placeholder="Add a task"
        />
        <Pressable
          onPress={addTask}
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          <Ionicons
            style={styles.iconBtn}
            name="ios-add"
            color="black"
            size={24}
          />
        </Pressable>
      </View>
      <View style={[styles.taskContainer, { marginBottom: insets.bottom }]}>
        {tasksContent}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(0,33,66)",
    padding: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskContainer: {
    flex: 1,
    backgroundColor: "#bbbbbb",
    marginTop: 8,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    width: "100%",
  },
  iconBtn: {
    marginLeft: -30,
  },
  pressed: {
    opacity: 0.5,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 1,
    paddingLeft: 8,
    paddingVertical: 6,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  deleteBtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  pressed: {
    opacity: 0.5,
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTasksText: {
    color: "rgb(0, 33, 66)",
    opacity: 0.6,
    fontSize: 24,
  },
  noTasksIcon: {
    opacity: 0.6,
  },
  done: {
    textDecorationLine: "line-through",
    color: "#b9b7b7",
  },
});

export default TodosScreen;
