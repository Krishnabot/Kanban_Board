import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';
import styled from 'styled-components';

const KanbanBoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const KanbanBoard = () => {
  const columns = useSelector((state) => state.columns);
  const dispatch = useDispatch();

  const saveStateToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('kanbanState', serializedState);
    } catch (err) {
      // Handle localStorage error
    }
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    dispatch({
      type: 'MOVE_ITEM',
      payload: { source, destination },
    });
  };

  const addItem = (columnId, item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { columnId, item },
    });
  };

  const deleteItem = (columnId, itemId) => {
    dispatch({
      type: 'DELETE_ITEM',
      payload: { columnId, itemId },
    });
  };

  return (
    <>
      <h1>My KanBan Board </h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <KanbanBoardContainer className="kanban-board">
          {Object.keys(columns).map((columnId) => {
            const column = columns[columnId];
            return (
              <KanbanColumn
                key={column.id}
                column={column}
                columnId={columnId}
                addItem={addItem}
                deleteItem={deleteItem}
              />
            );
          })}
        </KanbanBoardContainer>
      </DragDropContext>
    </>
  );
};

export default KanbanBoard;
