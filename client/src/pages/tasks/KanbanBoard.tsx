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
import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";
import { Column, Id, Task } from "../../types/taskTypes";

const KanbanBoard = () => {
  //States
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTasks, setActiveTasks] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const columnsId = useMemo(
    () => columns.map((columns) => columns?.id),
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
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                  handleDeleteColumn={handleDeleteColumn}
                  handleUpdateColumn={handleUpdateColumn}
                  handleCreateTask={handleCreateTask}
                  handleDeleteTask={handleDeleteTask}
                  handleUpdateTask={handleUpdateTask}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => handleCreateColumn()}
            className="h-[60px] w-[350px] min-w-[350px] p-4 border-2 rounded-lg cursor-pointer bg-mainBgColor border-colBgColor ring-[#4B49AB] hover:ring-2 flex gap-2"
          >
            <AddIcon /> Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                tasks={tasks?.filter(
                  (task) => task.columnId === activeColumn?.id
                )}
                handleDeleteColumn={handleDeleteColumn}
                handleUpdateColumn={handleUpdateColumn}
                handleCreateTask={handleCreateTask}
                handleDeleteTask={handleDeleteTask}
                handleUpdateTask={handleUpdateTask}
              />
            )}
            {activeTasks && (
              <TaskCard
                task={activeTasks}
                handleDeleteTask={handleDeleteTask}
                handleUpdateTask={handleUpdateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function generateId() {
    return Math.floor(Math.random() * 100);
  }

  function handleCreateColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function handleDeleteColumn(columnId: Id) {
    const updatedColumns = columns.filter((col) => col.id !== columnId);
    setColumns(updatedColumns);

    const updatedTasks = tasks.filter((task) => task.columnId !== columnId);
    setTasks(updatedTasks);
  }

  function handleUpdateColumn(id: Id, title: string) {
    const newCol = columns.map((col) => {
      if (col.id !== id) return col;

      return { ...col, title };
    });

    setColumns(newCol);
  }

  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTasks(event.active.data.current.task);
      return;
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTasks(null);
    const { active, over } = event;

    if (!over) return;

    const activeColId = active.id;
    const overColId = over.id;

    if (activeColId === overColId) return;

    setColumns((columns) => {
      const activeColIndex = columns.findIndex((col) => col.id === activeColId);
      const overColIndex = columns.findIndex((col) => col.id === overColId);

      // swaps the data of active column with over column
      return arrayMove(columns, activeColIndex, overColIndex);
    });
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeColId = active.id;
    const overColId = over.id;

    if (activeColId === overColId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    //Dropping a task over another task
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex(
          (task) => task.id === activeColId
        );
        const overTaskIndex = tasks.findIndex((task) => task.id === overColId);

        tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId;

        return arrayMove(tasks, activeTaskIndex, overTaskIndex);
      });
    }

    const isOverColumn = over.data.current?.type === "Column";
    //Dropping a task over a column
    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex(
          (task) => task.id === activeColId
        );

        tasks[activeTaskIndex].columnId = overColId;

        return arrayMove(tasks, activeTaskIndex, activeTaskIndex);
      });
    }
  }

  function handleCreateTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
      status: "todo",
    };
    setTasks([...tasks, newTask]);
  }

  function handleDeleteTask(id: Id) {
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
  }

  function handleUpdateTask(id: Id, content: string) {
    const newTask = tasks.map((task) => {
      if (task.id !== id) return task;

      return { ...task, content };
    });
    setTasks(newTask);
  }
};

export default KanbanBoard;
