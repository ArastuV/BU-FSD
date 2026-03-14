import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import TaskList from './components/TaskList';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container}>

        <TaskList />
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    // alignItems: 'center',
    padding: 10,
  },
});