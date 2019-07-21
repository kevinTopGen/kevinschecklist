import React from 'react';
import './App.css';
import CategoryPane from './components/CategoryPane/CategoryPane';
import TaskView from './containers/TaskView';


function App() {
  return (
    <div className='App'>
      <CategoryPane />
      <TaskView />
    </div>
  );
}

export default App;
