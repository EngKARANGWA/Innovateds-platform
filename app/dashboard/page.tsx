"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, BookOpen, Target, TrendingUp, Sprout, Microscope, Factory } from "lucide-react"
import Link from "next/link"

interface QuizResult {
  id: string
  category: string
  score: number
  totalQuestions: number
  date: string
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const resultsData = localStorage.getItem("quizResults")

    if (userData) {
      setUser(JSON.parse(userData))
    }

    if (resultsData) {
      setQuizResults(JSON.parse(resultsData))
    }
  }, [])

  const totalQuizzes = quizResults.length
  const averageScore =
    quizResults.length > 0
      ? Math.round(
          quizResults.reduce((acc, result) => acc + (result.score / result.totalQuestions) * 100, 0) /
            quizResults.length,
        )
      : 0

  const categoryStats = [
    {
      name: "Agriculture",
      icon: Sprout,
      color: "bg-green-100 text-green-800",
      quizzes: quizResults.filter((r) => r.category === "Agriculture").length,
    },
    {
      name: "Medicine",
      icon: Microscope,
      color: "bg-red-100 text-red-800",
      quizzes: quizResults.filter((r) => r.category === "Medicine").length,
    },
    {
      name: "Industry",
      icon: Factory,
      color: "bg-blue-100 text-blue-800",
      quizzes: quizResults.filter((r) => r.category === "Industry").length,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || "Student"}!</h1>
          <p className="text-gray-600 mt-1">Continue your nuclear technology learning journey</p>
        </div>
        <Link href="/quiz">
          <Button size="lg" className="bg-blue-900 hover:bg-blue-800">
            <BookOpen className="mr-2 h-5 w-5" />
            Start Quiz
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuizzes}</div>
            <p className="text-xs text-muted-foreground">Completed assessments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quizResults.length > 0
                ? Math.max(...quizResults.map((r) => Math.round((r.score / r.totalQuestions) * 100)))
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Highest achievement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.min(Math.round((totalQuizzes / 10) * 100), 100)}%</div>
            <Progress value={Math.min((totalQuizzes / 10) * 100, 100)} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryStats.map((category) => (
          <Card key={category.name}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{category.quizzes}</div>
              <p className="text-sm text-muted-foreground mb-3">Quizzes completed</p>
              <Badge className={category.color}>{category.name} Expert</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Quiz Results */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quiz Results</CardTitle>
          <CardDescription>Your latest quiz performances</CardDescription>
        </CardHeader>
        <CardContent>
          {quizResults.length > 0 ? (
            <div className="space-y-4">
              {quizResults
                .slice(-5)
                .reverse()
                .map((result) => (
                  <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-full ${
                          result.category === "Agriculture"
                            ? "bg-green-100"
                            : result.category === "Medicine"
                              ? "bg-red-100"
                              : "bg-blue-100"
                        }`}
                      >
                        {result.category === "Agriculture" && <Sprout className="h-4 w-4" />}
                        {result.category === "Medicine" && <Microscope className="h-4 w-4" />}
                        {result.category === "Industry" && <Factory className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium">{result.category} Quiz</p>
                        <p className="text-sm text-muted-foreground">{result.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        {result.score}/{result.totalQuestions}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {Math.round((result.score / result.totalQuestions) * 100)}%
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No quiz results yet</p>
              <p className="text-sm text-muted-foreground mb-4">Take your first quiz to see your progress here</p>
              <Link href="/quiz">
                <Button>Start Your First Quiz</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
