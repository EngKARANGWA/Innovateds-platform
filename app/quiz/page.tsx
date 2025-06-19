"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sprout, Microscope, Factory, ArrowRight } from "lucide-react"
import Link from "next/link"

const quizCategories = [
  {
    id: "agriculture",
    name: "Agriculture",
    icon: Sprout,
    description:
      "Test your knowledge of nuclear applications in agriculture, including crop improvement, pest control, and food preservation.",
    color: "bg-green-100 text-green-800 border-green-200",
    questions: 10,
    difficulty: "Intermediate",
  },
  {
    id: "medicine",
    name: "Medicine",
    icon: Microscope,
    description: "Explore nuclear medicine, radiotherapy, diagnostic imaging, and medical isotope applications.",
    color: "bg-red-100 text-red-800 border-red-200",
    questions: 10,
    difficulty: "Advanced",
  },
  {
    id: "industry",
    name: "Industry",
    icon: Factory,
    description:
      "Learn about industrial applications including material testing, quality control, and manufacturing processes.",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    questions: 10,
    difficulty: "Intermediate",
  },
]

export default function QuizPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Quiz Category</h1>
        <p className="text-gray-600">Select a category to test your knowledge of nuclear technology applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {quizCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-full ${category.color.split(" ")[0]} ${category.color.split(" ")[0]}/10`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <Badge variant="outline" className={category.color}>
                  {category.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-xl">{category.name}</CardTitle>
              <CardDescription className="text-sm">{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Questions: {category.questions}</span>
                  <span>Time: ~15 min</span>
                </div>

                <Link href={`/quiz/${category.id}`}>
                  <Button className="w-full bg-blue-900 hover:bg-blue-800">
                    Start Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Quiz Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-900 mt-0.5">
                1
              </div>
              <p className="text-sm">Each quiz contains 10 multiple-choice questions</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-900 mt-0.5">
                2
              </div>
              <p className="text-sm">Select the best answer for each question</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-900 mt-0.5">
                3
              </div>
              <p className="text-sm">Review your answers before submitting</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-900 mt-0.5">
                4
              </div>
              <p className="text-sm">Get instant feedback and see correct answers</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
