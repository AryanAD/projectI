import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactApexChart from "react-apexcharts";
import {
  Users,
  Briefcase,
  FolderGit2,
  CheckSquare,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Building,
  User,
} from "lucide-react";
import { useGetAllUsers, useGetProfile } from "../../api/users/users";
import { useGetClients } from "../../api/clients/clients";
import { useGetProjects } from "../../api/projects/projects";
import { useAllTasks } from "../../api/tasks/tasks";

const Homepage = () => {
  const navigate = useNavigate();
  const { data: profile } = useGetProfile();
  const { data: users } = useGetAllUsers();
  const { data: clients } = useGetClients();
  const { data: projects } = useGetProjects();
  const { data: tasks } = useAllTasks();
  const [hovered, setHovered] = useState<string | null>(null);

  // Calculate project statistics
  const projectStats = {
    todo: projects?.filter((p) => p.status === "todo").length || 0,
    doing: projects?.filter((p) => p.status === "doing").length || 0,
    done: projects?.filter((p) => p.status === "done").length || 0,
  };

  // Project Status Chart Options
  const projectChartOptions = {
    chart: {
      type: "donut" as const,
    },
    colors: ["#FF4560", "#FEB019", "#00E396"],
    labels: ["To Do", "Doing", "Done"],
    legend: {
      position: "bottom" as const,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const projectChartSeries = [
    projectStats.todo,
    projectStats.doing,
    projectStats.done,
  ];

  // Task Completion Timeline
  const taskCompletionData = {
    options: {
      chart: {
        type: "area" as const,
        toolbar: {
          show: false,
        },
      },
      colors: ["#4B49AC"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth" as const,
        width: 2,
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      tooltip: {
        theme: "dark",
      },
    },
    series: [
      {
        name: "Tasks Completed",
        data: [30, 40, 25, 50, 49, 21, 70],
      },
    ],
  };

  // Client Priority Distribution
  const taskPriorityData = {
    options: {
      chart: {
        type: "bar" as const,
        toolbar: {
          show: false,
        },
      },
      colors: ["#4B49AC"],
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["High", "Medium", "Low"],
      },
    },
    series: [
      {
        name: "Tasks",
        data: [
          tasks?.filter((t) => t.priority === "high").length || 0,
          tasks?.filter((t) => t.priority === "medium").length || 0,
          tasks?.filter((t) => t.priority === "low").length || 0,
        ],
      },
    ],
  };

  const stats = [
    {
      id: "total-clients",
      title: "Total Clients",
      value: clients?.length || 0,
      icon: Building,
      color: "bg-blue-500",
      link: "/admin/clients",
    },
    {
      id: "active-projects",
      title: "Active Projects",
      value: projects?.filter((p) => p.status === "doing").length || 0,
      icon: FolderGit2,
      color: "bg-green-500",
      link: "/admin/projects",
    },
    {
      id: "pending-tasks",
      title: "Pending Tasks",
      value: tasks?.filter((t) => t.status !== "done").length || 0,
      icon: CheckSquare,
      color: "bg-yellow-500",
      link: "/admin/tasks",
    },
    {
      id: "team-members",
      title: "Team Members",
      value: users?.length || 0,
      icon: Users,
      color: "bg-purple-500",
      link: "/admin/users",
    },
  ];

  const quickActions = [
    {
      title: "New Project",
      icon: FolderGit2,
      description: "Create a new project and assign team members",
      link: "/admin/add-projects",
    },
    {
      title: "Add Client",
      icon: Briefcase,
      description: "Register a new client in the system",
      link: "/admin/add-clients",
    },
    {
      title: "Create Task",
      icon: CheckSquare,
      description: "Assign new tasks to team members",
      link: "/admin/add-tasks",
    },
    {
      title: "Create Users",
      icon: User,
      description: "Create a new staff User Account",
      link: "/admin/add-users",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Section - Same as before */}
      <div className="bg-[#4B49AC] text-white p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profile?.username || "User"}!
          </h1>
          <p className="text-blue-100">
            Here's what's happening with your projects today.
          </p>
        </motion.div>
      </div>

      {/* Stats Grid - Same as before */}
      <div className="max-w-7xl mx-auto -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
                onClick={() => navigate(stat.link)}
              >
                <div className="flex items-center justify-between">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <span className="text-3xl font-bold text-gray-700">
                    {stat.value}
                  </span>
                </div>
                <h3 className="mt-4 text-gray-600 font-medium">{stat.title}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Analytics Overview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Project Status Distribution
            </h3>
            <ReactApexChart
              options={projectChartOptions}
              series={projectChartSeries}
              type="donut"
              height={350}
            />
          </motion.div>

          {/* Task Completion Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Task Completion Timeline
            </h3>
            <ReactApexChart
              options={taskCompletionData.options}
              series={taskCompletionData.series}
              type="area"
              height={350}
            />
          </motion.div>

          {/* Task Priority Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 lg:col-span-2"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Task Priority Distribution
            </h3>
            <ReactApexChart
              options={taskPriorityData.options}
              series={taskPriorityData.series}
              type="bar"
              height={350}
            />
          </motion.div>
        </div>
      </div>

      {/* Quick Actions - Same as before */}
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={index}
                className="relative bg-white rounded-lg shadow-md p-6 cursor-pointer"
                onMouseEnter={() => setHovered(action.title)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(action.link)}
              >
                <div className="flex items-center mb-4">
                  <Icon className="text-[#4B49AC]" size={24} />
                  <h3 className="ml-3 font-medium text-gray-800">
                    {action.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">{action.description}</p>
                {hovered === action.title && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 right-4"
                  >
                    <ArrowUpRight className="text-[#4B49AC]" size={20} />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity - Same as before */}
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Recent Activity
        </h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          {tasks && tasks.length > 0 ? (
            <div className="space-y-4">
              {tasks.slice(0, 5).map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => navigate(`/admin/tasks/${task.id}`)}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-2 rounded-lg ${
                        task.status === "done"
                          ? "bg-green-100"
                          : "bg-yellow-100"
                      }`}
                    >
                      {task.status === "done" ? (
                        <CheckSquare className="text-green-600" size={20} />
                      ) : (
                        <Clock className="text-yellow-600" size={20} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(task.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="text-gray-400" size={20} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">No recent activity to show</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
