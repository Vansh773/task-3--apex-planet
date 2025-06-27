"use client"

import { useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Code,
  Smartphone,
  Monitor,
  Tablet,
  Star,
  GitBranch,
  Calendar,
  Trophy,
  Target,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const quizQuestions = [
  {
    question: "Which CSS property is used to create responsive layouts?",
    options: ["display: flex", "position: absolute", "float: left", "text-align: center"],
    correct: 0,
  },
  {
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Programming Integration",
      "Automated Program Interaction",
      "Application Process Integration",
    ],
    correct: 0,
  },
  {
    question: "Which JavaScript method is used to fetch data from APIs?",
    options: ["getData()", "fetch()", "request()", "load()"],
    correct: 1,
  },
  {
    question: "What is the purpose of media queries in CSS?",
    options: ["To add animations", "To create responsive designs", "To change colors", "To add fonts"],
    correct: 1,
  },
  {
    question: "Which CSS unit is best for responsive typography?",
    options: ["px", "em", "rem", "pt"],
    correct: 2,
  },
  {
    question: "What is the mobile-first approach in responsive design?",
    options: [
      "Designing for mobile only",
      "Starting with mobile styles and adding desktop styles",
      "Making mobile apps",
      "Using only mobile frameworks",
    ],
    correct: 1,
  },
]

const carouselImages = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Responsive Design",
    title: "Responsive Web Design",
    description: "Mobile-first approach with CSS Grid and Flexbox",
    tech: "CSS3, Media Queries",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "JavaScript Interactivity",
    title: "Interactive JavaScript",
    description: "Dynamic user interfaces and event handling",
    tech: "ES6+, DOM Manipulation",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "API Integration",
    title: "API Data Fetching",
    description: "Real-time data integration from external APIs",
    tech: "Fetch API, JSON, REST",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Modern Frameworks",
    title: "React & Next.js",
    description: "Component-based architecture and SSR",
    tech: "React, Next.js, JSX",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "CSS Animations",
    title: "CSS Animations",
    description: "Smooth transitions and micro-interactions",
    tech: "CSS Animations, Transforms",
  },
]

export default function WebSkillsShowcase() {
  // Quiz State
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  // Carousel State
  const [currentImage, setCurrentImage] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // API Data State
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [weatherData, setWeatherData] = useState(null)
  const [joke, setJoke] = useState("")

  // Fetch GitHub repositories data
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/vercel/repos?sort=stars&per_page=6")
        const data = await response.json()
        setRepos(data)
      } catch (error) {
        console.error("Error fetching repos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  // Fetch weather data (using a free API)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Using a free weather API (OpenWeatherMap requires API key, so using a mock for demo)
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=London&appid=demo&units=metric")
        if (!response.ok) {
          // Mock data for demo purposes
          setWeatherData({
            name: "London",
            main: { temp: 22, humidity: 65 },
            weather: [{ main: "Sunny", description: "clear sky" }],
          })
        } else {
          const data = await response.json()
          setWeatherData(data)
        }
      } catch (error) {
        // Mock data for demo
        setWeatherData({
          name: "London",
          main: { temp: 22, humidity: 65 },
          weather: [{ main: "Sunny", description: "clear sky" }],
        })
      }
    }

    fetchWeather()
  }, [])

  // Fetch programming joke
  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await fetch("https://official-joke-api.appspot.com/jokes/programming/random")
        const data = await response.json()
        if (data && data[0]) {
          setJoke(`${data[0].setup} ${data[0].punchline}`)
        }
      } catch (error) {
        setJoke("Why do programmers prefer dark mode? Because light attracts bugs!")
      }
    }

    fetchJoke()
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  // Quiz Functions
  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuiz(0)
    setScore(0)
    setQuizCompleted(false)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleQuizAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (answerIndex === quizQuestions[currentQuiz].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuiz < quizQuestions.length - 1) {
        setCurrentQuiz(currentQuiz + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setQuizCompleted(true)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setCurrentQuiz(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setQuizCompleted(false)
  }

  // Carousel Functions
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const goToSlide = (index) => {
    setCurrentImage(index)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Fully Responsive */}
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-gray-200/50" />
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="hero-title text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl">
              🚀 Master Web Development
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
                Interactive Learning Hub
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
              Experience cutting-edge web technologies through hands-on interactive demos, responsive design mastery,
              and live API integrations
            </p>

            {/* Skills Overview - Responsive Grid */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
              <div className="flex flex-col items-center p-6 bg-gray-50 border-gray-200">
                <Target className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsive Design</h3>
                <p className="text-sm text-gray-600 text-center">Media queries for mobile, tablet & desktop</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-gray-50 border-gray-200">
                <Zap className="h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive JS</h3>
                <p className="text-sm text-gray-600 text-center">Quiz system & image carousel</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-gray-50 border-gray-200">
                <Code className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">API Integration</h3>
                <p className="text-sm text-gray-600 text-center">Real-time data from external APIs</p>
              </div>
            </div>

            {/* Device Icons - Responsive */}
            <div className="mt-10 flex justify-center space-x-4 sm:space-x-8">
              <div className="flex flex-col items-center text-purple-400">
                <Smartphone className="h-8 w-8 sm:h-12 sm:w-12" />
                <span className="mt-2 text-xs sm:text-sm">Mobile</span>
              </div>
              <div className="flex flex-col items-center text-pink-400">
                <Tablet className="h-8 w-8 sm:h-12 sm:w-12" />
                <span className="mt-2 text-xs sm:text-sm">Tablet</span>
              </div>
              <div className="flex flex-col items-center text-blue-400">
                <Monitor className="h-8 w-8 sm:h-12 sm:w-12" />
                <span className="mt-2 text-xs sm:text-sm">Desktop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quiz Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="gradient-heading section-heading text-3xl font-bold sm:text-4xl">
              🎯 Challenge Your Skills - Web Dev Quiz
            </h2>
            <p className="mt-4 text-gray-600">Test your knowledge of CSS, JavaScript, and responsive design</p>
          </div>

          <Card className="bg-gray-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 text-center flex items-center justify-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-400" />
                {!quizStarted
                  ? "Ready to Test Your Skills?"
                  : quizCompleted
                    ? "Quiz Complete!"
                    : `Question ${currentQuiz + 1} of ${quizQuestions.length}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizStarted ? (
                <div className="text-center space-y-6">
                  <div className="text-gray-600">
                    <p className="mb-4">Challenge yourself with {quizQuestions.length} questions covering:</p>
                    <ul className="text-left max-w-md mx-auto space-y-2">
                      <li>• Responsive Design & Media Queries</li>
                      <li>• JavaScript & API Integration</li>
                      <li>• Modern Web Development Practices</li>
                      <li>• CSS Layout Techniques</li>
                    </ul>
                  </div>
                  <Button onClick={startQuiz} size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Start Quiz
                  </Button>
                </div>
              ) : !quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>
                      Progress: {currentQuiz + 1}/{quizQuestions.length}
                    </span>
                    <span>
                      Score: {score}/{quizQuestions.length}
                    </span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>

                  <h3 className="text-xl text-gray-900 font-medium">{quizQuestions[currentQuiz].question}</h3>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {quizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={
                          showResult
                            ? index === quizQuestions[currentQuiz].correct
                              ? "default"
                              : index === selectedAnswer
                                ? "destructive"
                                : "outline"
                            : "outline"
                        }
                        className={`p-4 h-auto text-left justify-start transition-all duration-200 ${
                          showResult ? "pointer-events-none" : "hover:bg-white/20"
                        }`}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={showResult}
                      >
                        <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="text-center p-4 rounded-lg bg-white/10">
                      <p className="text-gray-900">
                        {selectedAnswer === quizQuestions[currentQuiz].correct ? "✅ Correct!" : "❌ Incorrect"}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="text-4xl mb-4">
                    {score === quizQuestions.length ? "🎉" : score >= quizQuestions.length * 0.7 ? "🎊" : "📚"}
                  </div>
                  <div className="text-2xl text-gray-900 font-bold">
                    Final Score: {score}/{quizQuestions.length}
                  </div>
                  <div className="text-lg text-gray-600">
                    {score === quizQuestions.length
                      ? "Perfect Score! You're a web development expert! 🚀"
                      : score >= quizQuestions.length * 0.7
                        ? "Great job! You have solid web development knowledge! 👏"
                        : "Keep learning! Practice makes perfect! 💪"}
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={resetQuiz} variant="outline">
                      Take Quiz Again
                    </Button>
                    <Button onClick={() => setQuizStarted(false)}>Back to Start</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="gradient-heading section-heading text-3xl font-bold sm:text-4xl">
              🎨 Featured Technologies Gallery
            </h2>
            <p className="mt-4 text-gray-600">
              Explore modern web development tools and frameworks through our interactive showcase
            </p>
          </div>

          <div className="relative">
            <div className="carousel-container">
              <div className="carousel-image-container">
                <div className="relative h-64 sm:h-80 lg:h-96">
                  <img
                    src={carouselImages[currentImage].src || "/placeholder.svg"}
                    alt={carouselImages[currentImage].alt}
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-white/20" />

                  {/* Enhanced Content Card */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="carousel-content-card p-6">
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex-1">
                          <h3 className="carousel-title text-2xl sm:text-3xl font-bold mb-3">
                            {carouselImages[currentImage].title}
                          </h3>
                          <p className="text-gray-700 text-sm sm:text-base mb-3 leading-relaxed">
                            {carouselImages[currentImage].description}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-3 py-1"
                            >
                              {carouselImages[currentImage].tech}
                            </Badge>
                            <div className="flex items-center gap-1 text-blue-600">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="text-sm font-semibold">Featured</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Carousel Controls */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 carousel-nav-button text-gray-700 hover:text-gray-900 bg-transparent"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 carousel-nav-button text-gray-700 hover:text-gray-900 bg-transparent"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Enhanced Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${index === currentImage ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play Toggle */}
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200"
              >
                {isAutoPlay ? "Pause Auto-play" : "Resume Auto-play"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* API Data Integration Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="gradient-heading section-heading text-3xl font-bold sm:text-4xl">
              ⚡ Real-Time Data Dashboard
            </h2>
            <p className="mt-4 text-gray-600">Live data streams from GitHub, Weather, and Programming APIs</p>
          </div>

          {/* API Data Grid - Responsive */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* GitHub Repositories */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <GitBranch className="h-6 w-6" />
                GitHub Repositories
              </h3>

              {loading ? (
                <div className="text-center text-gray-900 p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                  <p>Fetching repository data...</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {repos.slice(0, 4).map((repo, index) => (
                    <Card
                      key={index}
                      className="bg-gray-50 border-gray-200 hover:bg-white/15 transition-all duration-200 hover:scale-105"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-gray-900 flex items-center gap-2 text-lg">
                          <GitBranch className="h-4 w-4" />
                          {repo.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {repo.description || "No description available"}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="h-4 w-4" />
                            <span className="text-sm">{repo.stargazers_count?.toLocaleString()}</span>
                          </div>
                          {repo.language && (
                            <Badge variant="secondary" className="text-xs">
                              {repo.language}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <Calendar className="h-3 w-3" />
                          Updated {new Date(repo.updated_at).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Additional API Data */}
            <div className="space-y-6">
              {/* Weather Widget */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <span className="text-2xl">🌤️</span>
                    Weather Data API
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {weatherData ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Location:</span>
                        <span className="text-gray-900 font-semibold">{weatherData.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Temperature:</span>
                        <span className="text-gray-900 font-semibold">{weatherData.main.temp}°C</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Condition:</span>
                        <span className="text-gray-900 font-semibold">{weatherData.weather[0].main}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Humidity:</span>
                        <span className="text-gray-900 font-semibold">{weatherData.main.humidity}%</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-600">Loading weather data...</div>
                  )}
                </CardContent>
              </Card>

              {/* Programming Joke API */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <span className="text-2xl">😄</span>
                    Programming Joke API
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{joke}"</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200"
                    onClick={() => window.location.reload()}
                  >
                    Get New Joke
                  </Button>
                </CardContent>
              </Card>

              {/* API Stats */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    API Integration Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-400">3</div>
                      <div className="text-sm text-gray-600">APIs Used</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">{repos.length}</div>
                      <div className="text-sm text-gray-600">Data Points</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 text-purple-400 mb-4">
              <Code className="h-6 w-6" />
              <span className="text-lg font-semibold">Advanced Web Development Skills</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Showcasing responsive design, interactive JavaScript, and API integration
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>✅ Responsive Design</span>
              <span>✅ Interactive Quiz</span>
              <span>✅ Image Carousel</span>
              <span>✅ API Integration</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
