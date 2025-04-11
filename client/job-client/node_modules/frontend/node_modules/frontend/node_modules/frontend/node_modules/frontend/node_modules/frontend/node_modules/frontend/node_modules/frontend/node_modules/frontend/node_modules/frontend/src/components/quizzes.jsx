import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "./shared/Navbar";

const quizzes = {
    Development: [
        {
            title: "JavaScript Basics",
            questions: [
                { question: "What is 'const' used for?", options: ["Define a variable", "Create a function", "Loop through an array"], answer: "Define a variable" },
                { question: "Which of these is a JavaScript framework?", options: ["React", "Laravel", "Django"], answer: "React" },
                { question: "Which keyword is used to declare a function?", options: ["def", "function", "func"], answer: "function" },
                { question: "What does '=== ' check in JavaScript?", options: ["Value", "Type", "Both Value and Type"], answer: "Both Value and Type" }
            ],
        },
        {
            title: "React Fundamentals",
            questions: [
                { question: "What hook is used for state management?", options: ["useState", "useEffect", "useReducer"], answer: "useState" },
                { question: "Which library is primarily used for routing in React?", options: ["React Router", "Vue Router", "Next.js"], answer: "React Router" },
                { question: "What is JSX?", options: ["JavaScript XML", "Java XML", "JavaScript Extension"], answer: "JavaScript XML" }
            ],
        },
    ],
    "Data Science": [
        {
            title: "Python for Data Science",
            questions: [
                { question: "Which library is used for data manipulation?", options: ["pandas", "matplotlib", "seaborn"], answer: "pandas" },
                { question: "Which library is used for numerical computing?", options: ["NumPy", "Scikit-learn", "TensorFlow"], answer: "NumPy" },
                { question: "Which visualization library provides interactive graphs?", options: ["matplotlib", "seaborn", "plotly"], answer: "plotly" }
            ],
        },
    ],
    "AI/ML": [
        {
            title: "Neural Networks",
            questions: [
                { question: "What is the activation function in neural networks?", options: ["ReLU", "Sigmoid", "Both"], answer: "Both" },
                { question: "Which type of neural network is best for image processing?", options: ["CNN", "RNN", "GAN"], answer: "CNN" },
                { question: "What is backpropagation used for?", options: ["Data preprocessing", "Weight updates", "Image recognition"], answer: "Weight updates" }
            ],
        },
    ],
    "Cloud Computing": [
        {
            title: "AWS Basics",
            questions: [
                { question: "What does EC2 stand for?", options: ["Elastic Cloud Compute", "Elastic Compute Cloud", "Elastic Container Compute"], answer: "Elastic Compute Cloud" },
                { question: "Which AWS service is used for object storage?", options: ["EC2", "S3", "Lambda"], answer: "S3" },
                { question: "What is IAM used for?", options: ["Identity and Access Management", "Infrastructure as a Management", "Instance Access Monitoring"], answer: "Identity and Access Management" }
            ],
        }
    ],
    "Cybersecurity": [
        {
            title: "Network Security",
            questions: [
                { question: "What is a firewall used for?", options: ["Monitoring", "Blocking unauthorized access", "Encrypting data"], answer: "Blocking unauthorized access" },
                { question: "What does VPN stand for?", options: ["Virtual Private Network", "Verified Protocol Network", "Virtual Protected Node"], answer: "Virtual Private Network" },
                { question: "Which encryption standard is widely used?", options: ["RSA", "AES", "SHA"], answer: "AES" }
            ],
        }
    ],
    "Blockchain": [
        {
            title: "Blockchain Basics",
            questions: [
                { question: "What is blockchain used for?", options: ["Data Storage", "Decentralized Transactions", "Cloud Computing"], answer: "Decentralized Transactions" },
                { question: "Which consensus mechanism is used in Bitcoin?", options: ["Proof of Work", "Proof of Stake", "Delegated Proof of Stake"], answer: "Proof of Work" },
                { question: "What is a smart contract?", options: ["Automated contract execution", "Legal agreement", "Digital signature"], answer: "Automated contract execution" }
            ],
        }
    ],
    "DevOps": [
        {
            title: "CI/CD Basics",
            questions: [
                { question: "What does CI/CD stand for?", options: ["Continuous Integration / Continuous Deployment", "Code Integration / Code Delivery", "Cloud Infrastructure / Cloud Development"], answer: "Continuous Integration / Continuous Deployment" },
                { question: "Which tool is commonly used for CI/CD?", options: ["Jenkins", "Docker", "Kubernetes"], answer: "Jenkins" },
                { question: "What does Docker do?", options: ["Containerization", "Monitoring", "Cloud Storage"], answer: "Containerization" }
            ],
        }
    ]
};

export default function QuizPage() {
    const [selectedCategory, setSelectedCategory] = useState("Development");
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        let timer;
        if (currentQuiz && timeLeft > 0 && !quizCompleted) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [currentQuiz, timeLeft, quizCompleted]);

    const startQuiz = (quiz) => {
        setCurrentQuiz(quiz);
        setUserAnswers({});
        setScore(null);
        setQuizCompleted(false);
        setTimeLeft(60);
    };

    const handleAnswer = (question, answer) => {
        setUserAnswers((prev) => ({ ...prev, [question]: answer }));
    };

    const evaluateQuiz = () => {
        let correctAnswers = 0;
        currentQuiz.questions.forEach((q) => {
            if (userAnswers[q.question] === q.answer) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
        setQuizCompleted(true);
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen mt-17 bg-gray-900 text-white">
                <div className="w-1/4 p-5 bg-gray-800">
                    <h2 className="text-xl mt-10 font-bold mb-4">Categories</h2>
                    <ul>
                        {Object.keys(quizzes).map((category) => (
                            <li
                                key={category}
                                className={`cursor-pointer p-2 rounded-md ${selectedCategory === category ? "bg-blue-500" : ""}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-3/4 mt-16 p-5">
                    <h2 className="text-2xl font-bold mt-15 mb-4">{selectedCategory} Quizzes</h2>
                    {currentQuiz ? (
                        <div className="p-4 bg-gray-700 mt-16 rounded-lg">
                            <h3 className="text-xl font-semibold">{currentQuiz.title}</h3>
                            <p className="text-lg font-semibold">Time Left: {timeLeft} sec</p>
                            {currentQuiz.questions.map((q, index) => (
                                <div key={index} className="mt-4">
                                    <p className="font-semibold">{q.question}</p>
                                    {q.options.map((option, i) => (
                                        <button
                                            key={i}
                                            className={`p-2 m-1 border rounded ${userAnswers[q.question] === option ? "bg-blue-500" : "bg-gray-600"}`}
                                            onClick={() => handleAnswer(q.question, option)}
                                            disabled={quizCompleted}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            ))}
                            <Button onClick={evaluateQuiz} className="mt-4 bg-green-600 hover:bg-green-700" disabled={quizCompleted}>
                                Submit
                            </Button>
                            {score !== null && <p className="mt-4">Your Score: {score}/{currentQuiz.questions.length}</p>}
                            {quizCompleted && <Button onClick={() => setCurrentQuiz(null)} className="mt-4 bg-blue-600 hover:bg-blue-700">Retry Quiz</Button>}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {quizzes[selectedCategory].map((quiz, index) => (
                                <Card key={index} className="p-4 bg-gray-700">
                                    <CardContent>
                                        <h3 className="text-lg font-semibold">{quiz.title}</h3>
                                        <p className="text-gray-300">{quiz.questions.length} Questions</p>
                                        <Button onClick={() => startQuiz(quiz)} className="mt-2 bg-blue-600 hover:bg-blue-700">Start Quiz</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
