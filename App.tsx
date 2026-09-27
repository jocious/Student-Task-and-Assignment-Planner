import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet
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
    if (!title.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return;

    setTasks([...tasks, {
      id: Date.now().toString(),
      title,
      date,
      subject,
      done: false
    }]);

    setTitle('');
    setDate('');
    setPage('Home');
  };

  // Toggle completion
  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  // Sort tasks by deadline
  const sortedTasks = [...tasks].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Planner</Text>

      {/* Basic navigation */}
      <View style={styles.nav}>
        {['Home', 'Add Task'].map(item => (
          <TouchableOpacity
            key={item}
            style={styles.button}
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
                style={styles.button}
                onPress={() => setSubject(item)}
              >
                <Text style={styles.buttonText}>
                  {subject === item ? '✓ ' : ''}{item}
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
            ListEmptyComponent={
              <Text>No tasks yet. Add a task!</Text>
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
                <Text>{item.done ? 'Completed' : 'Pending'}</Text>
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
});