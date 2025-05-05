"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AlertCircle, CheckCircle2, Clock, Plus, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreateTaskDialog } from "@/components/create-task-dialog"
import { useToast } from "@/components/ui/use-toast"

// Initial mock data for tasks
const initialTasks = [
  {
    id: "1",
    title: "Update user dashboard",
    description: "Implement new analytics widgets on the user dashboard",
    dueDate: "2025-05-10",
    priority: "High",
    status: "In Progress",
    assignedTo: "John Doe",
  },
  {
    id: "2",
    title: "Fix login bug",
    description: "Users are experiencing issues with social login",
    dueDate: "2025-05-07",
    priority: "High",
    status: "To Do",
    assignedTo: "John Doe",
  },
  {
    id: "3",
    title: "Update documentation",
    description: "Update API documentation with new endpoints",
    dueDate: "2025-05-15",
    priority: "Medium",
    status: "To Do",
    assignedTo: "John Doe",
  },
]

const initialAssignedTasks = [
  {
    id: "4",
    title: "Design new logo",
    description: "Create a new logo for the rebrand",
    dueDate: "2025-05-12",
    priority: "Medium",
    status: "To Do",
    assignedBy: "Jane Smith",
  },
  {
    id: "5",
    title: "Implement dark mode",
    description: "Add dark mode support to the application",
    dueDate: "2025-05-20",
    priority: "Low",
    status: "To Do",
    assignedBy: "Mike Johnson",
  },
]

const initialOverdueTasks = [
  {
    id: "6",
    title: "Security audit",
    description: "Perform security audit on authentication system",
    dueDate: "2025-05-01",
    priority: "High",
    status: "To Do",
    assignedBy: "Jane Smith",
  },
]

export default function DashboardPage() {
  const { toast } = useToast()
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const [user, setUser] = useState({ name: "", email: "" })
  const [myTasks, setMyTasks] = useState(initialTasks)
  const [assignedTasks, setAssignedTasks] = useState(initialAssignedTasks)
  const [overdueTasks, setOverdueTasks] = useState(initialOverdueTasks)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Get tasks from localStorage
    const tasksData = localStorage.getItem("tasks")
    if (tasksData) {
      const allTasks = JSON.parse(tasksData)

      // Filter tasks based on the current user
      const currentUserName = JSON.parse(userData || '{"name":""}').name

      setMyTasks(
        allTasks.filter((task: any) => task.createdBy === currentUserName || task.assignedTo === currentUserName),
      )

      setAssignedTasks(
        allTasks.filter((task: any) => task.assignedTo === currentUserName && task.createdBy !== currentUserName),
      )

      // Filter overdue tasks
      const today = new Date()
      setOverdueTasks(
        allTasks.filter(
          (task: any) =>
            new Date(task.dueDate) < today &&
            task.status !== "Done" &&
            (task.assignedTo === currentUserName || task.createdBy === currentUserName),
        ),
      )
    }
  }, [])

  // Function to add a new task
  const addTask = (newTask: any) => {
    const updatedTasks = [...myTasks, newTask]
    setMyTasks(updatedTasks)

    // Update localStorage
    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    allTasks.push(newTask)
    localStorage.setItem("tasks", JSON.stringify(allTasks))

    toast({
      title: "Task created",
      description: "Your task has been created successfully.",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-500 border-red-500"
      case "Medium":
        return "text-orange-500 border-orange-500"
      case "Low":
        return "text-green-500 border-green-500"
      default:
        return "text-gray-500 border-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do":
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Done":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const TaskCard = ({ task, showAssignedBy = false, showAssignedTo = false }) => (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
        </div>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
          <div className={`flex items-center gap-1 border rounded-full px-2 py-0.5 ${getPriorityColor(task.priority)}`}>
            <span>{task.priority} Priority</span>
          </div>
          {showAssignedBy && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>From: {task.assignedBy}</span>
            </div>
          )}
          {showAssignedTo && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>To: {task.assignedTo}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/tasks/${task.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name || "User"}! Here's an overview of your tasks.
          </p>
        </div>
        <Button onClick={() => setIsCreateTaskOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">My Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{myTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {myTasks.filter((t) => t.status === "In Progress").length} in progress
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Assigned to Me</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{assignedTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {assignedTasks.filter((t) => t.status === "To Do").length} to do
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{overdueTasks.length}</div>
            <p className="text-xs text-muted-foreground">Tasks past their due date</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="my-tasks">
        <TabsList className="mb-4">
          <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>
        <TabsContent value="my-tasks">
          <div>
            {myTasks.length > 0 ? (
              myTasks.map((task) => <TaskCard key={task.id} task={task} showAssignedTo />)
            ) : (
              <div className="text-center py-10">
                <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No tasks created</h3>
                <p className="mt-1 text-muted-foreground">
                  You haven't created any tasks yet. Create your first task to get started.
                </p>
                <Button className="mt-4" onClick={() => setIsCreateTaskOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> New Task
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="assigned">
          <div>
            {assignedTasks.length > 0 ? (
              assignedTasks.map((task) => <TaskCard key={task.id} task={task} showAssignedBy />)
            ) : (
              <div className="text-center py-10">
                <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No tasks assigned</h3>
                <p className="mt-1 text-muted-foreground">You don't have any tasks assigned to you at the moment.</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="overdue">
          <div>
            {overdueTasks.length > 0 ? (
              overdueTasks.map((task) => <TaskCard key={task.id} task={task} showAssignedBy />)
            ) : (
              <div className="text-center py-10">
                <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No overdue tasks</h3>
                <p className="mt-1 text-muted-foreground">
                  You don't have any overdue tasks. Great job staying on track!
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <CreateTaskDialog
        open={isCreateTaskOpen}
        onOpenChange={setIsCreateTaskOpen}
        onTaskCreated={addTask}
        currentUser={user.name}
      />
    </div>
  )
}
