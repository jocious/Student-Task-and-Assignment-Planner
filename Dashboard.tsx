
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

// Subjects
const subjects = ['CS301', 'CS302', 'CS303', 'CSELEC1', 'GE ELEC 3CS'];

export default function App() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('CS301');
  const [page, setPage] = useState('Home');

  // Add a task
  const addTask = () => {
    if (!title.trim() || !date.trim()) {
      Alert.alert('Missing Information', 'Please enter a task and deadline.');
      return;
    }

    // Check the date format and actual date
    const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    const parsedDate = new Date(date + 'T00:00:00');

    if (
      !validDate ||
      isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== date
    ) {
      Alert.alert('Invalid Date', 'Use YYYY-MM-DD (example: 2026-10-15).');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      date: date,
      subject: subject,
      done: false,
    };

    // Add the task without losing existing tasks
    setTasks(previousTasks => [...previousTasks, newTask]);

    // Clear the form and return to Home
    setTitle('');
    setDate('');
    setSubject('CS301');
    setPage('Home');

    Alert.alert('Success', 'Your task has been saved!');
  };

  // Toggle task completion
  const toggleTask = (id: string) => {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  // Sort tasks by deadline
  const sortedTasks = [...tasks].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Planner</Text>

      {/* Navigation */}
      <View style={styles.nav}>
        {['Home', 'Add Task'].map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.button,
              page === item && styles.activeButton,
            ]}
            onPress={() => setPage(item)}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {page === 'Add Task' ? (
        <View>
          <Text style={styles.heading}>New Assignment</Text>

          <TextInput
            style={styles.input}
            placeholder="Task or assignment"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.input}
            placeholder="Deadline (YYYY-MM-DD)"
            value={date}
            onChangeText={setDate}
          />

          <Text style={styles.heading}>Choose Subject</Text>

          <View style={styles.subjects}>
            {subjects.map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.button,
                  subject === item && styles.selectedSubject,
                ]}
                onPress={() => setSubject(item)}
              >
                <Text style={styles.buttonText}>
                  {subject === item ? '✓ ' : ''}
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.add} onPress={addTask}>
            <Text style={styles.buttonText}>Save Task</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>My Assignments</Text>

          <FlatList
            data={sortedTasks}
            keyExtractor={item => item.id}
            extraData={tasks}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <Text style={styles.empty}>
                No tasks yet. Add a task!
              </Text>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.task}
                onPress={() => toggleTask(item.id)}
              >
                <Text style={styles.taskText}>
                  {item.done ? '☑ ' : '☐ '}
                  {item.title}
                </Text>

                <Text>{item.subject} • Due: {item.date}</Text>

                <Text style={item.done ? styles.completed : styles.pending}>
                  {item.done ? 'Completed' : 'Pending'}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'midnightblue',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  nav: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 20,
  },
  subjects: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    backgroundColor: 'royalblue',
    padding: 10,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: 'midnightblue',
  },
  selectedSubject: {
    backgroundColor: 'seagreen',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  add: {
    backgroundColor: 'seagreen',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  task: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    gap: 5,
  },
  taskText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  empty: {
    color: 'slategrey',
    marginTop: 10,
  },
  completed: {
    color: 'seagreen',
    fontWeight: 'bold',
  },
  pending: {
    color: 'darkorange',
    fontWeight: 'bold',
  },
});