"use client"

import { useState } from "react"
import { BarChart, Calendar, ChevronDown, Filter, PieChartIcon, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BarChart as Chart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "@/components/ui/chart"

// Mock data for analytics
const tasksByStatusData = [
  { name: "To Do", value: 12, color: "#94a3b8" },
  { name: "In Progress", value: 8, color: "#3b82f6" },
  { name: "Done", value: 15, color: "#22c55e" },
]

const tasksByPriorityData = [
  { name: "High", value: 10, color: "#ef4444" },
  { name: "Medium", value: 14, color: "#f97316" },
  { name: "Low", value: 11, color: "#22c55e" },
]

const taskCompletionData = [
  { name: "John", completed: 8, assigned: 12 },
  { name: "Jane", completed: 12, assigned: 15 },
  { name: "Mike", completed: 5, assigned: 7 },
  { name: "Sarah", completed: 10, assigned: 10 },
]

const taskCreationData = [
  { name: "Mon", tasks: 3 },
  { name: "Tue", tasks: 5 },
  { name: "Wed", tasks: 2 },
  { name: "Thu", tasks: 7 },
  { name: "Fri", tasks: 4 },
  { name: "Sat", tasks: 1 },
  { name: "Sun", tasks: 0 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("This Week")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track your team's performance and task completion metrics.</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Calendar className="h-4 w-4" />
              {timeRange}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTimeRange("Today")}>Today</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange("This Week")}>This Week</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange("This Month")}>This Month</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange("This Quarter")}>This Quarter</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange("This Year")}>This Year</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Tasks</CardTitle>
            <CardDescription>All tasks in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">35</div>
            <p className="text-xs text-muted-foreground">+12% from last {timeRange.toLowerCase()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completed Tasks</CardTitle>
            <CardDescription>Tasks marked as done</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+8% from last {timeRange.toLowerCase()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Team Efficiency</CardTitle>
            <CardDescription>Task completion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">43%</div>
            <p className="text-xs text-muted-foreground">+5% from last {timeRange.toLowerCase()}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="tasks">Task Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Tasks by Status</CardTitle>
                  <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Distribution of tasks by their current status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tasksByStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {tasksByStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Tasks by Priority</CardTitle>
                  <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Distribution of tasks by priority level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tasksByPriorityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {tasksByPriorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Task Creation Trend</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Number of tasks created per day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <Chart
                      data={taskCreationData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="tasks" fill="#3b82f6" name="Tasks Created" />
                    </Chart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Team Performance</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>Task completion rate by team member</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <Chart
                    data={taskCompletionData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="assigned" fill="#94a3b8" name="Tasks Assigned" />
                    <Bar dataKey="completed" fill="#22c55e" name="Tasks Completed" />
                  </Chart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Average Completion Time</CardTitle>
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Average time to complete tasks by priority</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <Chart
                      data={[
                        { priority: "High", days: 2.3 },
                        { priority: "Medium", days: 4.1 },
                        { priority: "Low", days: 6.5 },
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="priority" />
                      <YAxis label={{ value: "Days", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="days" fill="#f97316" name="Average Days" />
                    </Chart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Overdue Tasks</CardTitle>
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Number of overdue tasks by team member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <Chart
                      data={[
                        { name: "John", overdue: 1 },
                        { name: "Jane", overdue: 0 },
                        { name: "Mike", overdue: 2 },
                        { name: "Sarah", overdue: 0 },
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="overdue" fill="#ef4444" name="Overdue Tasks" />
                    </Chart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
