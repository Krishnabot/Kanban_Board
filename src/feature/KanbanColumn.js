import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const KanbanColumnContainer = styled.div`
  background-color: #f2f2f2;
  padding: 1rem;
  margin-right: 1rem;
  flex: 1;
`;

const KanbanItem = styled.div`
  background-color: #ffffff;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
`;

const KanbanItemText = styled.p`
  margin: 0;
`;

const KanbanItemDeleteButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f44336;
      color: #fff;

  }
`;

const KanbanItemInput = styled.input`
  margin-top: 0.5rem;
`;

const KanbanColumn = ({ column, columnId, addItem, deleteItem }) => {
  return (
    <KanbanColumnContainer className="kanban-column">
      <h2>{column.title}</h2>
      <Droppable droppableId={column.id} key={column.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {column.items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <KanbanItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="kanban-item"
                  >
                    <KanbanItemText>{item.text}</KanbanItemText>
                    <KanbanItemDeleteButton
                      onClick={() => deleteItem(columnId, item.id)}
                    >
                      Delete
                    </KanbanItemDeleteButton>
                  </KanbanItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <KanbanItemInput
        type="text"
        placeholder="Add Task..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addItem(columnId, { id: Date.now().toString(), text: e.target.value });
            e.target.value = '';
          }
        }}
      />
    </KanbanColumnContainer>
  );
};

export default KanbanColumn;
