import { Id, Task } from "../../types/taskTypes";

interface PropType {
  task: Task;
  handleDeleteTask: (id: Id) => void;
  handleUpdateTask: (id: Id, content: string) => void;
}

const TaskCard: React.FC<PropType> = () => {
  return <div>TaskCard</div>;
};

export default TaskCard;
