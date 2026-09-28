<<<<<<< HEAD

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
import DateTimePicker from '@react-native-community/datetimepicker';
=======
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet
} from 'react-native';
>>>>>>> eabdbb047585e28aea1a3604d0a80a77e1b13f27

// Subjects
const subjects = ['CS301', 'CS302', 'CS303', 'CSELEC1', 'GE ELEC 3CS'];

export default function App() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState('');
<<<<<<< HEAD
  const [date, setDate] = useState<Date | null>(null);
  const [subject, setSubject] = useState('CS301');
  const [page, setPage] = useState('Home');
  const [showCalendar, setShowCalendar] = useState(false);

  // Format date
  const formatDate = (value: Date) => {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Add a task
  const addTask = () => {
    if (!title.trim() || !date) {
      Alert.alert(
        'Missing Information',
        'Please enter a task and select a deadline.'
      );
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      date: formatDate(date),
      subject: subject,
      done: false,
    };

    setTasks(previousTasks => [...previousTasks, newTask]);

    setTitle('');
    setDate(null);
    setSubject('CS301');
    setPage('Home');

    Alert.alert('Success', 'Your task has been saved!');
  };

  // Select a date
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowCalendar(false);

    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
  };

  // Mark task as completed
  const toggleTask = (id: string) => {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
=======
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
>>>>>>> eabdbb047585e28aea1a3604d0a80a77e1b13f27
  };

  // Sort tasks by deadline
  const sortedTasks = [...tasks].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Planner</Text>

<<<<<<< HEAD
      {/* Navigation */}
=======
      {/* Basic navigation */}
>>>>>>> eabdbb047585e28aea1a3604d0a80a77e1b13f27
      <View style={styles.nav}>
        {['Home', 'Add Task'].map(item => (
          <TouchableOpacity
            key={item}
<<<<<<< HEAD
            style={[
              styles.button,
              page === item && styles.activeButton,
            ]}
=======
            style={styles.button}
>>>>>>> eabdbb047585e28aea1a3604d0a80a77e1b13f27
            onPress={() => setPage(item)}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {page === 'Add Task' ? (
        <View>
          <Text style={styles.heading}>New Assignment</Text>

<<<<<<< HEAD
          {/* Task name */}
=======
>>>>>>> eabdbb047585e28aea1a3604d0a80a77e1b13f27
          <TextInput
            style={styles.input}
            placeholder="Task or assignment"
            value={title}
            onChangeText={setTitle}
          />

<<<<<<< HEAD
          {/* Deadline calendar */}
          <Text style={styles.heading}>Deadline</Text>

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowCalendar(true)}
          >
            <Text style={styles.dateText}>
              {date ? formatDate(date) : '📅 Select deadline'}
            </Text>
          </TouchableOpacity>

          {showCalendar && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          {/* Subject selection */}
          <Text style={styles.heading}>Choose Subject</Text>

=======
          <TextInput
            style={styles.input}
            placeholder="Deadline (YYYY-MM-DD)"
            value={date}
            onChangeText={setDate}
          />

          <Text style={styles.heading}>Choose Subject</Text>
>>>>>>> eabdbb047585e28aea1a3604d0a80a77e1b13f27
          <View style={styles.subjects}>
            {subjects.map(item => (
              <TouchableOpacity
                key={item}
<<<<<<< HEAD
                style={[
                  styles.button,
                  subject === item && styles.selectedSubject,
                ]}
                onPress={() => setSubject(item)}
              >
                <Text style={styles.buttonText}>
                  {subject === item ? '✓ ' : ''}
                  {item}
=======
                style={styles.button}
                onPress={() => setSubject(item)}
              >
                <Text style={styles.buttonText}>
                  {subject === item ? '✓ ' : ''}{item}
>>>>>>> eabdbb047585e28aea1a3604d0a80a77e1b13f27
                </Text>
              </TouchableOpacity>
            ))}
          </View>

<<<<<<< HEAD
          {/* Save task */}
=======
>>>>>>> eabdbb047585e28aea1a3604d0a80a77e1b13f27
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
<<<<<<< HEAD
            extraData={tasks}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <Text style={styles.empty}>
                No tasks yet. Add a task!
              </Text>
=======
            ListEmptyComponent={
              <Text>No tasks yet. Add a task!</Text>
>>>>>>> eabdbb047585e28aea1a3604d0a80a77e1b13f27
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
<<<<<<< HEAD

                <Text>
                  {item.subject} • Due: {item.date}
                </Text>

                <Text
                  style={item.done ? styles.completed : styles.pending}
                >
                  {item.done ? 'Completed' : 'Pending'}
                </Text>
=======
                <Text>{item.subject} • Due: {item.date}</Text>
                <Text>{item.done ? 'Completed' : 'Pending'}</Text>
>>>>>>> eabdbb047585e28aea1a3604d0a80a77e1b13f27
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
<<<<<<< HEAD
  activeButton: {
    backgroundColor: 'midnightblue',
  },
  selectedSubject: {
    backgroundColor: 'seagreen',
  },
=======
>>>>>>> eabdbb047585e28aea1a3604d0a80a77e1b13f27
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
<<<<<<< HEAD
  dateButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightsteelblue',
  },
  dateText: {
    fontSize: 16,
    color: 'midnightblue',
  },
=======
>>>>>>> eabdbb047585e28aea1a3604d0a80a77e1b13f27
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
<<<<<<< HEAD
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
});s
=======
});
>>>>>>> eabdbb047585e28aea1a3604d0a80a77e1b13f27
