import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { db } from "./firebaseConfig"; 
import { collection, addDoc } from "firebase/firestore";

const QuizScreen = ({ navigation }) => {
  const [score, setScore] = useState({
    ScoobyDoo: 0,
    SpongeBob: 0,
    Batman: 0,
    Dora: 0,
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [resultImage, setResultImage] = useState(null);

  const questions = [
    {
      question: "What is your favorite color?",
      options: [
        { answer: "Red", character: "ScoobyDoo" },
        { answer: "Yellow", character: "SpongeBob" },
        { answer: "Blue", character: "Batman" },
        { answer: "Pink", character: "Dora" },
      ],
    },
    {
      question: "How would you describe your personality?",
      options: [
        { answer: "Fun and adventurous", character: "SpongeBob" },
        { answer: "Brave and strong", character: "Batman" },
        { answer: "Curious and kind", character: "Dora" },
        { answer: "Loyal and playful", character: "ScoobyDoo" },
      ],
    },
    {
      question: "What type of pet do you prefer?",
      options: [
        { answer: "A dog", character: "ScoobyDoo" },
        { answer: "A fish", character: "SpongeBob" },
        { answer: "A bat", character: "Batman" },
        { answer: "A monkey", character: "Dora" },
      ],
    },
    {
      question: "What’s your favorite food?",
      options: [
        { answer: "Pizza", character: "SpongeBob" },
        { answer: "Sandwiches", character: "Dora" },
        { answer: "Berries", character: "Batman" },
        { answer: "Scooby Snacks", character: "ScoobyDoo" },
      ],
    },
  ];

  const images = {
    ScoobyDoo: require('./assets/scoobydoo.png'),
    SpongeBob: require('./assets/spongebob.png'),
    Batman: require('./assets/batman.png'),
    Dora: require('./assets/dora.png'),
  };

  const handleAnswer = async (character) => {
    setScore((prevScore) => ({
      ...prevScore,
      [character]: prevScore[character] + 1,
    }));

    const nextIndex = questionIndex + 1;
    if (nextIndex < questions.length) {
      setQuestionIndex(nextIndex);
    } else {
      const highestScore = Math.max(...Object.values(score));
      const resultCharacter = Object.keys(score).find(
        (key) => score[key] === highestScore
      );
      setResult(resultCharacter);
      setResultImage(images[resultCharacter]);

      // Save the result to Firestore without error handling
      await addDoc(collection(db, "quizResults"), {
        character: resultCharacter,
        timestamp: new Date(),
      });
    }
  };

  const resetQuiz = () => {
    setScore({
      ScoobyDoo: 0,
      SpongeBob: 0,
      Batman: 0,
      Dora: 0,
    });
    setQuestionIndex(0);
    setResult(null);
    setResultImage(null);
  };

  if (result) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You resemble {result}!</Text>
        {resultImage && <Image source={resultImage} style={styles.image} />}
        <Button title="Restart Quiz" onPress={resetQuiz} />
        <Button title="Go Back to Home" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{questions[questionIndex].question}</Text>
      {questions[questionIndex].options.map((option, index) => (
        <Button
          key={index}
          title={option.answer}
          onPress={() => handleAnswer(option.character)}
        />
      ))}
      <Button title="Go Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  image: { width: 200, height: 200, margin: 20 },
});

export default QuizScreen;
