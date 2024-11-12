import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useMemo, useState } from "react";
import AddIcon from "../../icons/AddIcon";

const KanbanBoard = () => {
  //States
  const [columns, setColumns] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [activeTasks, setActiveTasks] = useState([]);

  const columnsId = useMemo(
    () => columns.map((columns) => columns.id),
    [columns]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // px
      },
    })
  );

  return (
    <div className="bg-gradient-to-b from-[#4B49AB20] to-[#4B49AB40] w-full h-screen flex items-center justify-center overflow-x-auto overflow-y-hidden">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="flex gap-4 mx-auto">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {/* {columns.map((column)=>{
              <ColumnContainer
               key={column.id} column = {column} tasks = {tasks.filter((task)=>task.columnId === column.id)} handleDeleteColumn = {handleDeleteColumn} handleUpdateColumn={handleUpdateColumn} handleCreateTask={handleCreateTask} handleDeleteTask={handleDeleteTask} handleUpdateTask={handleUpdateTask}
              />
            ))} */}
            </SortableContext>
          </div>
          <button
          // onClick={()=>handleCreateColumn()}
          >
            <AddIcon /> Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              // <ColumnContainer
              // column={activeColumn}
              // tasks={tasks.filter((task)=>task.columnId === activeColumn.id )}
              // {handleDeleteColumn} handleUpdateColumn={handleUpdateColumn} handleCreateTask={handleCreateTask} handleDeleteTask={handleDeleteTask} handleUpdateTask={handleUpdateTask}
              // />
            )}
            {activeTask && (
              // <TaskCard
              //   task={activeTask}
              //   handleDeleteTask={handleDeleteTask}
              //   handleUpdateTask={handleUpdateTask}
              // />
            )}
            
          </DragOverlay>
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
