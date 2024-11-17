import { useMemo, useState } from "react";
import { Column, Id, Task } from "../../types/taskTypes";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteIcon from "../../icons/DeleteIcon";
import AddIcon from "../../icons/AddIcon";
import TaskCard from "./TaskCard";

interface PropType {
  column: Column;
  tasks: Task[];
  handleDeleteColumn: (id: Id) => void;
  handleUpdateColumn: (id: Id, title: string) => void;
  handleCreateTask: (columnId: Id) => void;
  handleDeleteTask: (id: Id) => void;
  handleUpdateTask: (id: Id, content: string) => void;
}

const ColumnContainer: React.FC<PropType> = ({
  column,
  tasks,
  handleDeleteColumn,
  handleCreateTask,
  handleDeleteTask,
  handleUpdateColumn,
  handleUpdateTask,
}) => {
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column?.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-colBgColor w-[350px] opacity-40 border border-[#4B49AB] h-[500px] max-h-[500px] rounded-md flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-colBgColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-mainBgColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-colBgColor border-4 flex items-center justify-between"
      >
        <div className="flex gap-2 text-[#4B49AB]">
          <div className="flex items-center justify-center px-2 py-1 text-sm rounded-full bg-colBgColor">
            0
          </div>
          {editMode ? (
            <input
              autoFocus
              value={column.title}
              className="px-2 bg-[#98BDFF] text-[#4B49AB] border rounded-md outline-none focus:border-[#4B49AB]"
              onChange={(e) => handleUpdateColumn(column.id, e.target.value)}
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          ) : (
            column.title
          )}
        </div>
        <button
          className="px-1 py-2 rounded stroke-[#4B49AB] hover:bg-colBgColor hover:stroke-red-500"
          onClick={() => handleDeleteColumn(column.id)}
        >
          <DeleteIcon />
        </button>
      </div>
      <div className="flex flex-col flex-grow gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
            />
          ))}
        </SortableContext>
      </div>
      <button
        onClick={() => handleCreateTask(column.id)}
        className="flex text-[#4B49AB] items-center gap-2 p-4 border-2 rounded-md border-colBgColor border-x-colBgColor hover:bg-mainBgColor hover:text-[#4B49AB] active:bg-[#4B49AB] active:text-white"
      >
        <AddIcon />
        Add Task
      </button>
    </div>
  );
};

export default ColumnContainer;
