"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const quizData: Record<string, Question[]> = {
  agriculture: [
    {
      id: 1,
      question: "What is the primary use of gamma radiation in food preservation?",
      options: [
        "To add nutrients to food",
        "To kill harmful bacteria and extend shelf life",
        "To change the color of food",
        "To increase food weight",
      ],
      correctAnswer: 1,
      explanation:
        "Gamma radiation is used to sterilize food by killing harmful bacteria, parasites, and other pathogens, thereby extending shelf life without significantly affecting nutritional value.",
    },
    {
      id: 2,
      question: "Which nuclear technique is used to create new plant varieties?",
      options: ["Nuclear fusion", "Mutation breeding using radiation", "Nuclear fission", "Radioactive decay"],
      correctAnswer: 1,
      explanation:
        "Mutation breeding uses controlled radiation exposure to induce genetic mutations in plants, creating new varieties with improved traits like disease resistance or higher yield.",
    },
    {
      id: 3,
      question: "What is the Sterile Insect Technique (SIT)?",
      options: [
        "Using pesticides to kill insects",
        "Releasing sterile male insects to control pest populations",
        "Genetic modification of crops",
        "Using pheromone traps",
      ],
      correctAnswer: 1,
      explanation:
        "SIT involves sterilizing male insects with radiation and releasing them to mate with wild females, producing no offspring and reducing pest populations.",
    },
    {
      id: 4,
      question: "How does nuclear technology help in soil and water management?",
      options: [
        "By creating artificial soil",
        "Through isotopic tracers to study nutrient movement",
        "By generating electricity for irrigation",
        "By producing synthetic fertilizers",
      ],
      correctAnswer: 1,
      explanation:
        "Isotopic tracers help scientists track the movement of nutrients and water in soil, optimizing fertilizer use and irrigation practices.",
    },
    {
      id: 5,
      question: "What is the main advantage of irradiated seeds?",
      options: [
        "They grow faster",
        "They are more nutritious",
        "They have improved genetic traits",
        "They are cheaper to produce",
      ],
      correctAnswer: 2,
      explanation:
        "Irradiated seeds often develop improved traits such as higher yield, disease resistance, or better adaptation to environmental stress.",
    },
    {
      id: 6,
      question: "Which isotope is commonly used in agricultural research?",
      options: ["Carbon-14", "Uranium-235", "Plutonium-239", "Radium-226"],
      correctAnswer: 0,
      explanation:
        "Carbon-14 is widely used as a tracer in agricultural research to study plant metabolism, nutrient uptake, and carbon cycling.",
    },
    {
      id: 7,
      question: "What is the economic benefit of nuclear techniques in agriculture?",
      options: [
        "Reduced crop yields",
        "Increased production costs",
        "Reduced post-harvest losses and increased yields",
        "Higher labor requirements",
      ],
      correctAnswer: 2,
      explanation:
        "Nuclear techniques reduce post-harvest losses through better preservation methods and increase yields through improved crop varieties.",
    },
    {
      id: 8,
      question: "How does radiation help in plant breeding?",
      options: [
        "By killing all plants",
        "By inducing beneficial mutations",
        "By preventing plant growth",
        "By changing soil composition",
      ],
      correctAnswer: 1,
      explanation:
        "Controlled radiation exposure induces random mutations in plant DNA, some of which may result in beneficial traits that can be selected and bred.",
    },
    {
      id: 9,
      question: "What is the role of nuclear techniques in organic farming?",
      options: [
        "They are not used in organic farming",
        "Pest control through SIT",
        "Soil contamination",
        "Artificial fertilizer production",
      ],
      correctAnswer: 1,
      explanation:
        "The Sterile Insect Technique is accepted in organic farming as it provides pest control without chemical pesticides.",
    },
    {
      id: 10,
      question: "Which nuclear application helps reduce food waste?",
      options: [
        "Nuclear power generation",
        "Food irradiation for preservation",
        "Radioactive labeling",
        "Nuclear waste disposal",
      ],
      correctAnswer: 1,
      explanation:
        "Food irradiation significantly extends shelf life by eliminating spoilage organisms, thereby reducing food waste throughout the supply chain.",
    },
  ],
  medicine: [
    {
      id: 1,
      question: "What is the most common medical use of radioactive isotopes?",
      options: ["Surgery", "Diagnostic imaging", "Blood transfusion", "Vaccination"],
      correctAnswer: 1,
      explanation:
        "Radioactive isotopes are most commonly used in diagnostic imaging procedures like PET scans, SPECT, and nuclear medicine imaging.",
    },
    {
      id: 2,
      question: "Which isotope is widely used in cancer treatment?",
      options: ["Carbon-12", "Cobalt-60", "Oxygen-16", "Nitrogen-14"],
      correctAnswer: 1,
      explanation:
        "Cobalt-60 is widely used in external beam radiotherapy for cancer treatment due to its high-energy gamma rays.",
    },
    {
      id: 3,
      question: "What is PET scan used for?",
      options: [
        "Bone density measurement",
        "Metabolic activity imaging",
        "Blood pressure monitoring",
        "Heart rate measurement",
      ],
      correctAnswer: 1,
      explanation:
        "PET (Positron Emission Tomography) scans use radioactive tracers to image metabolic activity, particularly useful in cancer detection and brain studies.",
    },
    {
      id: 4,
      question: "What is the economic advantage of nuclear medicine?",
      options: [
        "Higher treatment costs",
        "Early disease detection reducing treatment costs",
        "Longer hospital stays",
        "More invasive procedures",
      ],
      correctAnswer: 1,
      explanation:
        "Nuclear medicine enables early disease detection, which typically results in more effective treatment and lower overall healthcare costs.",
    },
    {
      id: 5,
      question: "Which nuclear technique is used for sterilizing medical equipment?",
      options: ["Alpha radiation", "Gamma radiation", "Beta radiation", "Neutron radiation"],
      correctAnswer: 1,
      explanation:
        "Gamma radiation is used to sterilize medical equipment because it can penetrate packaging and effectively kill all microorganisms.",
    },
    {
      id: 6,
      question: "What is targeted radiotherapy?",
      options: [
        "Random radiation exposure",
        "Radiation delivered specifically to cancer cells",
        "Full-body radiation",
        "Radiation for diagnostic purposes only",
      ],
      correctAnswer: 1,
      explanation:
        "Targeted radiotherapy delivers radiation specifically to cancer cells while minimizing damage to healthy tissue.",
    },
    {
      id: 7,
      question: "Which isotope is used in thyroid treatment?",
      options: ["Iodine-131", "Carbon-14", "Uranium-235", "Plutonium-239"],
      correctAnswer: 0,
      explanation:
        "Iodine-131 is specifically used to treat thyroid conditions because the thyroid gland naturally concentrates iodine.",
    },
    {
      id: 8,
      question: "What is the main benefit of nuclear medicine imaging?",
      options: [
        "It's cheaper than other methods",
        "It provides functional information about organs",
        "It requires no preparation",
        "It has no side effects",
      ],
      correctAnswer: 1,
      explanation:
        "Nuclear medicine imaging provides functional information about how organs work, not just their structure, which is valuable for diagnosis.",
    },
    {
      id: 9,
      question: "How do radiopharmaceuticals work?",
      options: [
        "They cure diseases directly",
        "They target specific organs or tissues",
        "They replace damaged organs",
        "They prevent all diseases",
      ],
      correctAnswer: 1,
      explanation:
        "Radiopharmaceuticals are designed to target specific organs, tissues, or cellular processes for either imaging or treatment.",
    },
    {
      id: 10,
      question: "What is the role of nuclear medicine in cardiology?",
      options: [
        "Heart transplantation",
        "Cardiac imaging and blood flow assessment",
        "Pacemaker installation",
        "Blood pressure medication",
      ],
      correctAnswer: 1,
      explanation:
        "Nuclear medicine is used in cardiology for imaging heart function, assessing blood flow, and detecting heart disease.",
    },
  ],
  industry: [
    {
      id: 1,
      question: "What is the primary use of nuclear gauges in industry?",
      options: [
        "Power generation",
        "Material thickness and density measurement",
        "Chemical synthesis",
        "Temperature control",
      ],
      correctAnswer: 1,
      explanation:
        "Nuclear gauges use radioactive sources to measure material thickness, density, and composition in various industrial processes.",
    },
    {
      id: 2,
      question: "How is radiography used in industry?",
      options: [
        "For employee health checks",
        "For non-destructive testing of materials",
        "For waste disposal",
        "For energy production",
      ],
      correctAnswer: 1,
      explanation:
        "Industrial radiography uses radiation to inspect the internal structure of materials and welds without destroying them.",
    },
    {
      id: 3,
      question: "What is the economic benefit of nuclear techniques in quality control?",
      options: [
        "Increased production time",
        "Higher material costs",
        "Reduced defects and improved product quality",
        "More manual labor required",
      ],
      correctAnswer: 2,
      explanation:
        "Nuclear techniques in quality control help detect defects early, reducing waste and improving overall product quality.",
    },
    {
      id: 4,
      question: "Which industry commonly uses neutron activation analysis?",
      options: ["Food service", "Mining and metallurgy", "Textile manufacturing", "Agriculture only"],
      correctAnswer: 1,
      explanation:
        "Neutron activation analysis is commonly used in mining and metallurgy to determine the composition of ores and metals.",
    },
    {
      id: 5,
      question: "What is the purpose of radiation processing in industry?",
      options: ["To generate electricity", "To modify material properties", "To dispose of waste", "To cool materials"],
      correctAnswer: 1,
      explanation:
        "Radiation processing is used to modify material properties, such as creating stronger plastics or sterilizing products.",
    },
    {
      id: 6,
      question: "How do nuclear techniques help in oil and gas exploration?",
      options: [
        "By creating oil deposits",
        "Through well logging and reservoir analysis",
        "By refining crude oil",
        "By transporting oil",
      ],
      correctAnswer: 1,
      explanation:
        "Nuclear techniques are used in well logging to analyze rock formations and determine the presence of oil and gas.",
    },
    {
      id: 7,
      question: "What is the advantage of nuclear-based level measurement?",
      options: [
        "It's the cheapest method",
        "It works without contact with the material",
        "It only works with liquids",
        "It requires frequent calibration",
      ],
      correctAnswer: 1,
      explanation:
        "Nuclear level measurement systems can measure material levels without physical contact, making them suitable for harsh environments.",
    },
    {
      id: 8,
      question: "Which nuclear technique is used for polymer modification?",
      options: ["Nuclear fission", "Electron beam irradiation", "Nuclear fusion", "Radioactive decay"],
      correctAnswer: 1,
      explanation:
        "Electron beam irradiation is used to cross-link polymers, improving their strength, heat resistance, and other properties.",
    },
    {
      id: 9,
      question: "What is the role of tracers in industrial processes?",
      options: [
        "To add color to products",
        "To track flow patterns and detect leaks",
        "To increase production speed",
        "To reduce energy consumption",
      ],
      correctAnswer: 1,
      explanation:
        "Radioactive tracers help track flow patterns in pipes and systems, detect leaks, and optimize industrial processes.",
    },
    {
      id: 10,
      question: "How does nuclear technology contribute to environmental monitoring?",
      options: [
        "By creating pollution",
        "Through isotopic analysis of pollutants",
        "By consuming natural resources",
        "By generating waste only",
      ],
      correctAnswer: 1,
      explanation:
        "Nuclear techniques help monitor environmental pollution by analyzing isotopic signatures of pollutants and tracking their sources.",
    },
  ],
}

export default function QuizCategoryPage({ params }: { params: { category: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const router = useRouter()

  const questions = quizData[params.category] || []
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1)

  useEffect(() => {
    if (questions.length === 0) {
      router.push("/quiz")
    }
  }, [questions.length, router])

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setShowResults(true)
    setQuizCompleted(true)

    // Calculate score
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0)
    }, 0)

    // Save result to localStorage
    const result = {
      id: Date.now().toString(),
      category: categoryName,
      score,
      totalQuestions: questions.length,
      date: new Date().toLocaleDateString(),
    }

    const existingResults = JSON.parse(localStorage.getItem("quizResults") || "[]")
    existingResults.push(result)
    localStorage.setItem("quizResults", JSON.stringify(existingResults))
  }

  const calculateScore = () => {
    return selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0)
    }, 0)
  }

  if (questions.length === 0) {
    return <div>Loading...</div>
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <div className="p-6 space-y-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Quiz Results</CardTitle>
            <div className="text-4xl font-bold text-blue-900 mt-4">
              {score}/{questions.length}
            </div>
            <div className="text-xl text-gray-600">{percentage}% Score</div>
            <Progress value={percentage} className="mt-4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Badge variant={percentage >= 70 ? "default" : "destructive"} className="text-lg px-4 py-2">
                {percentage >= 90
                  ? "Excellent!"
                  : percentage >= 70
                    ? "Good Job!"
                    : percentage >= 50
                      ? "Keep Learning!"
                      : "Need More Practice"}
              </Badge>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review Answers:</h3>
              {questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start space-x-2 mb-2">
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{question.question}</p>
                      <p className="text-sm text-green-600 mt-1">
                        <strong>Correct:</strong> {question.options[question.correctAnswer]}
                      </p>
                      {selectedAnswers[index] !== question.correctAnswer && (
                        <p className="text-sm text-red-600">
                          <strong>Your answer:</strong> {question.options[selectedAnswers[index]]}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mt-2">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4 pt-4">
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full">Back to Dashboard</Button>
              </Link>
              <Link href="/quiz" className="flex-1">
                <Button variant="outline" className="w-full">
                  Take Another Quiz
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/quiz">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Quiz Selection
            </Button>
          </Link>
          <Badge variant="outline">{categoryName} Quiz</Badge>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="bg-blue-900 hover:bg-blue-800"
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={selectedAnswers[currentQuestion] === undefined}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
