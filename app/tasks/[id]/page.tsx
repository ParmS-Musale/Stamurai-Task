"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Edit, Trash2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [task, setTask] = useState<any>(null)

  useEffect(() => {
    // Get tasks from localStorage
    const tasksData = localStorage.getItem("tasks")
    if (tasksData) {
      const allTasks = JSON.parse(tasksData)
      const foundTask = allTasks.find((t: any) => t.id === params.id)

      if (foundTask) {
        setTask(foundTask)
      } else {
        // Task not found, redirect to tasks page
        router.push("/tasks")
      }
    }
  }, [params.id, router])

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

  const handleDelete = async () => {
    setIsLoading(true)

    try {
      // Get tasks from localStorage
      const tasksData = localStorage.getItem("tasks")
      if (tasksData) {
        const allTasks = JSON.parse(tasksData)
        const updatedTasks = allTasks.filter((t: any) => t.id !== params.id)

        // Save updated tasks to localStorage
        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
      }

      toast({
        title: "Task deleted",
        description: "The task has been deleted successfully.",
      })

      router.push("/tasks")
    } catch (error) {
      toast({
        title: "Failed to delete task",
        description: "There was an error deleting the task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
    }
  }

  if (!task) {
    return (
      <div className="container py-6 flex justify-center items-center min-h-[50vh]">
        <p>Loading task details...</p>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Tasks
      </Button>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{task.title}</h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                <span
                  className={`inline-flex items-center border rounded-full px-2 py-0.5 text-xs ${getPriorityColor(task.priority)}`}
                >
                  {task.priority} Priority
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-red-500 hover:text-red-600"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Comments</CardTitle>
              <CardDescription>Team discussion about this task</CardDescription>
            </CardHeader>
            <CardContent>
              {task.comments && task.comments.length > 0 ? (
                task.comments.map((comment: any) => (
                  <div key={comment.id} className="mb-4 last:mb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{comment.user}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                    <Separator className="mt-4" />
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add Comment</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="w-full md:w-80">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Task Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">Assigned To</div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{task.assignedTo}</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Created By</div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{task.createdBy}</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Due Date</div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Created Date</div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(task.createdDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" variant="outline">
                Mark as Complete
              </Button>
              <Button className="w-full">Reassign Task</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isLoading} className="bg-red-500 hover:bg-red-600">
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
