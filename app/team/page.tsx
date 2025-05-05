"use client"

import { useState, useEffect } from "react"
import { Mail, MoreHorizontal, Plus, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AddTeamMemberDialog } from "@/components/add-team-member-dialog"

// Mock team members data
const initialTeamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    avatar: "",
    tasksAssigned: 3,
    tasksCompleted: 2,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
    avatar: "",
    tasksAssigned: 5,
    tasksCompleted: 3,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "User",
    avatar: "",
    tasksAssigned: 2,
    tasksCompleted: 1,
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "User",
    avatar: "",
    tasksAssigned: 4,
    tasksCompleted: 4,
  },
]

export default function TeamPage() {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" })

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }

    // Get team members from localStorage
    const membersData = localStorage.getItem("teamMembers")
    if (membersData) {
      setTeamMembers(JSON.parse(membersData))
    } else {
      // Initialize team members in localStorage
      localStorage.setItem("teamMembers", JSON.stringify(initialTeamMembers))
    }
  }, [])

  // Function to add a new team member
  const addTeamMember = (newMember: any) => {
    const updatedMembers = [...teamMembers, newMember]
    setTeamMembers(updatedMembers)

    // Update localStorage
    localStorage.setItem("teamMembers", JSON.stringify(updatedMembers))
  }

  // Filter team members based on search query
  const filteredMembers = teamMembers.filter((member) => {
    return (
      searchQuery === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Manager":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "User":
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      default:
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground">Manage your team and their permissions.</p>
        </div>
        <Button onClick={() => setIsAddMemberOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search team members..."
          className="pl-8 max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        member.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name) || "/placeholder.svg"}&background=random`
                      }
                      alt={member.name}
                    />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {member.email}
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Member</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Remove Member</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge className={getRoleBadgeColor(member.role)}>{member.role}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-muted-foreground">Tasks Assigned</div>
                  <div className="font-medium">{member.tasksAssigned}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Tasks Completed</div>
                  <div className="font-medium">{member.tasksCompleted}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <User className="mr-2 h-4 w-4" />
                View Tasks
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AddTeamMemberDialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen} onMemberAdded={addTeamMember} />
    </div>
  )
}
