const initialState = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      items: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      items: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      items: [],
    },
  },
};

const kanbanReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVE_ITEM': {
      const { source, destination } = action.payload;
      const sourceColumn = { ...state.columns[source.droppableId] };
      const destinationColumn = { ...state.columns[destination.droppableId] };
      const removed = sourceColumn.items[source.index];

      const updatedSourceItems = [...sourceColumn.items];
      updatedSourceItems.splice(source.index, 1);

      const updatedDestinationItems = [...destinationColumn.items];
      updatedDestinationItems.splice(destination.index, 0, removed);

      const updatedColumns = {
        ...state.columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          items: updatedSourceItems,
        },
        [destinationColumn.id]: {
          ...destinationColumn,
          items: updatedDestinationItems,
        },
      };

      return {
        ...state,
        columns: updatedColumns,
      };
    }
    case 'ADD_ITEM': {
      const { columnId, item } = action.payload;
      const column = { ...state.columns[columnId] };
      const updatedItems = [...column.items, item];
      const updatedColumn = {
        ...column,
        items: updatedItems,
      };
      const updatedColumns = {
        ...state.columns,
        [columnId]: updatedColumn,
      };
      return {
        ...state,
        columns: updatedColumns,
      };
    }
    case 'DELETE_ITEM': {
      const { columnId, itemId } = action.payload;
      const column = { ...state.columns[columnId] };
      const updatedItems = column.items.filter((item) => item.id !== itemId);
      const updatedColumn = {
        ...column,
        items: updatedItems,
      };
      const updatedColumns = {
        ...state.columns,
        [columnId]: updatedColumn,
      };
      return {
        ...state,
        columns: updatedColumns,
      };
    }
    default:
      return state;
  }
};


export default kanbanReducer;