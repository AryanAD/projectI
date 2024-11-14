import { useMemo, useState } from "react";
import { Column, Id, Task } from "../../types/taskTypes";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface PropType {
  column: Column;
  tasks: Task[];
  handleDeleteColumn: (id: Id) => void;
  handleUpdateColumn: (id: Id, title: string) => void;
  handleCreateTask: (columnId: Id) => void;
  handleDeleteTask: (id: Id) => void;
  handleUpdateTask: (id: Id, content: string) => void;
}

const ColumnContainer: React.FC<PropType> = () => {
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
  return <div>ColumnContainer</div>;
};

export default ColumnContainer;
