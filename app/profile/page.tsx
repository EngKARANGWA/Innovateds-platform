"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Calendar, Trophy, BookOpen } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [quizResults, setQuizResults] = useState<any[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const resultsData = localStorage.getItem("quizResults")

    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
      })
    }

    if (resultsData) {
      setQuizResults(JSON.parse(resultsData))
    }
  }, [])

  const handleSave = () => {
    const updatedUser = { ...user, ...formData }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    })
    setIsEditing(false)
  }

  const totalQuizzes = quizResults.length
  const averageScore =
    quizResults.length > 0
      ? Math.round(
          quizResults.reduce((acc, result) => acc + (result.score / result.totalQuestions) * 100, 0) /
            quizResults.length,
        )
      : 0
  const bestScore =
    quizResults.length > 0 ? Math.max(...quizResults.map((r) => Math.round((r.score / r.totalQuestions) * 100))) : 0

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getAchievementBadge = () => {
    if (averageScore >= 90) return { text: "Expert", color: "bg-yellow-100 text-yellow-800" }
    if (averageScore >= 80) return { text: "Advanced", color: "bg-blue-100 text-blue-800" }
    if (averageScore >= 70) return { text: "Intermediate", color: "bg-green-100 text-green-800" }
    if (averageScore >= 60) return { text: "Beginner", color: "bg-gray-100 text-gray-800" }
    return { text: "Novice", color: "bg-red-100 text-red-800" }
  }

  const achievement = getAchievementBadge()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Manage your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg bg-blue-100 text-blue-900">
                    {user ? getInitials(user.name) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{user?.name}</h3>
                  <p className="text-gray-600">{user?.email}</p>
                  <Badge className={achievement.color}>{achievement.text}</Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 border rounded-md bg-gray-50">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{user?.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 border rounded-md bg-gray-50">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{user?.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Member Since</Label>
                  <div className="flex items-center space-x-2 p-2 border rounded-md bg-gray-50">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-2">
                    <Button onClick={handleSave}>Save Changes</Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Total Quizzes</span>
                </div>
                <span className="font-semibold">{totalQuizzes}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Best Score</span>
                </div>
                <span className="font-semibold">{bestScore}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Average Score</span>
                </div>
                <span className="font-semibold">{averageScore}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {totalQuizzes >= 1 && (
                <Badge variant="outline" className="w-full justify-center py-2">
                  🎯 First Quiz Completed
                </Badge>
              )}
              {totalQuizzes >= 5 && (
                <Badge variant="outline" className="w-full justify-center py-2">
                  📚 Quiz Enthusiast
                </Badge>
              )}
              {bestScore >= 90 && (
                <Badge variant="outline" className="w-full justify-center py-2">
                  🏆 Excellence Award
                </Badge>
              )}
              {averageScore >= 80 && (
                <Badge variant="outline" className="w-full justify-center py-2">
                  ⭐ Consistent Performer
                </Badge>
              )}
              {totalQuizzes === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Complete quizzes to earn achievements!</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quiz Activity</CardTitle>
          <CardDescription>Your latest quiz performances</CardDescription>
        </CardHeader>
        <CardContent>
          {quizResults.length > 0 ? (
            <div className="space-y-3">
              {quizResults
                .slice(-5)
                .reverse()
                .map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{result.category} Quiz</p>
                      <p className="text-sm text-gray-600">{result.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {result.score}/{result.totalQuestions}
                      </p>
                      <p className="text-sm text-gray-600">
                        {Math.round((result.score / result.totalQuestions) * 100)}%
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              No quiz activity yet. Take your first quiz to see your progress here!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
