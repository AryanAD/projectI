import { Task } from "../../models/tasks/task.model.js";
import User from "../../models/users/user.model.js";

export const getTasksForStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);

    const tasks = await Task.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "status",
        "dueDate",
        "priority",
      ],
      include: [
        {
          model: User,
          through: { attributes: [] },
          where: { id: userId },
        },
      ],
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks by userId:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTasksStatusForStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const taskId = id;
    const { status } = req.body;

    // Validate the status
    const allowedStatuses = ["todo", "doing", "done"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find the task by ID
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the task status
    task.status = status;
    await task.save();

    return res
      .status(200)
      .json({ message: "Task status updated successfully", task });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
