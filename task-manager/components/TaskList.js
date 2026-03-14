import { useMemo, useState } from 'react';
import {
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function TaskList() {
  const [enteredText, setEnteredText] = useState('');
  const [tasks, setTasks] = useState([]);

  const todoList = useMemo(() => tasks.filter((task) => !task.completed), [tasks]);
  const completedList = useMemo(
    () => tasks.filter((task) => task.completed),
    [tasks]
  );

  const addTask = () => {
    const text = enteredText.trim();
    if (!text) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        completed: false,
        completedAt: null,
      },
    ]);

    setEnteredText('');
  };

  const markDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: true, completedAt: new Date() }
          : task
      )
    );
  };

  const undoDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: false, completedAt: null }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const renderTodo = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.taskText}>{item.text}</Text>

      <View style={styles.actions}>
        <Pressable style={styles.doneBtn} onPress={() => markDone(item.id)}>
          <Text style={styles.actionText}>Done</Text>
        </Pressable>

        <Pressable style={styles.deleteBtn} onPress={() => deleteTask(item.id)}>
          <Text style={styles.actionText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderCompleted = ({ item }) => (
    <View style={[styles.card, styles.completedCard]}>
      <Text style={[styles.taskText, styles.completedText]}>{item.text}</Text>
      <Text style={styles.timestamp}>
        Completed: {item.completedAt ? item.completedAt.toLocaleString() : '-'}
      </Text>

      <View style={styles.actions}>
        <Pressable style={styles.undoBtn} onPress={() => undoDone(item.id)}>
          <Text style={styles.actionText}>Undo</Text>
        </Pressable>

        <Pressable style={styles.deleteBtn} onPress={() => deleteTask(item.id)}>
          <Text style={styles.actionText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Write a task..."
          value={enteredText}
          onChangeText={setEnteredText}
        />

        <View style={styles.addBtnWrap}>
          <Button title="Add" onPress={addTask} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>To-Do</Text>
      <FlatList
        data={todoList}
        keyExtractor={(item) => item.id}
        renderItem={renderTodo}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No pending tasks.</Text>}
      />

      <Text style={styles.sectionTitle}>Completed</Text>
      <FlatList
        data={completedList}
        keyExtractor={(item) => item.id}
        renderItem={renderCompleted}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No completed tasks.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  addBtnWrap: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    marginTop: 6,
  },
  list: {
    gap: 10,
    paddingBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  completedCard: {
    backgroundColor: '#ecfdf5',
  },
  taskText: {
    fontSize: 16,
    color: '#111827',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#4b5563',
  },
  timestamp: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  doneBtn: {
    backgroundColor: '#16a34a',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  undoBtn: {
    backgroundColor: '#6b7280',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  deleteBtn: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    paddingVertical: 6,
  },
});
