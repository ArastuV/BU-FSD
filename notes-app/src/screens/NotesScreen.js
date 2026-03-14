import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNote, deleteNote, getNotes } from '../services/api';

export default function NotesScreen({ token }) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadNotes = useCallback(async () => {
    try {
      const res = await getNotes(token);
      setNotes(res.notes);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }, [token]);

  React.useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  async function handleCreateNote() {
    if (!title.trim()) {
      Alert.alert('Empty note', 'Please enter a note title.');
      return;
    }

    try {
      setLoading(true);
      await createNote(token, { title: title.trim() });
      setTitle('');
      await loadNotes();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(noteId) {
    try {
      await deleteNote(token, noteId);
      await loadNotes();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    await loadNotes();
    setRefreshing(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Your Notes</Text>

        <View style={styles.formRow}>
          <TextInput
            style={styles.input}
            placeholder="Write a note..."
            value={title}
            onChangeText={setTitle}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleCreateNote} disabled={loading}>
            <Text style={styles.addButtonText}>{loading ? '...' : 'Add'}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={<Text style={styles.emptyText}>No notes yet.</Text>}
          renderItem={({ item }) => (
            <View style={styles.noteCard}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 14,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 14,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: '#0d6efd',
    borderRadius: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  noteCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteTitle: {
    color: '#111827',
    fontSize: 15,
    flex: 1,
    marginRight: 12,
  },
  deleteText: {
    color: '#dc2626',
    fontWeight: '600',
  },
  emptyText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#6b7280',
  },
});
