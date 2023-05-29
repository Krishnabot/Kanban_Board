// App.js

import React from 'react';
import { Provider } from 'react-redux';
import store from './Store/store';
import KanbanBoard from './feature/KanbanBoard';

const App = () => {
  return (
    <Provider store={store}>
      <KanbanBoard />
    </Provider>
  );
};

export default App;
