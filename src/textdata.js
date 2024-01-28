const tf = require("@tensorflow/tfjs-node");

// Given data
const textData = ["good", "bad", "happy", "sad", "positive", "negative"];
const labels = [1, 0, 1, 0, 1, 0]; // 1: Positive, 0: Negative

// Preprocess data
const tokenize = (text) => text.toLowerCase().split(" ");

const maxSeqLength = textData.reduce(
  (max, text) => Math.max(max, tokenize(text).length),
  0
);

const padSequence = (sequence, maxLength) => {
  return Array.from({ length: maxLength - sequence.length }, () => 0).concat(
    sequence
  );
};

const xData = textData.map((text) => {
  const tokens = tokenize(text);
  const sequence = tokens.map(
    (token) => token.charCodeAt(0) - "a".charCodeAt(0) + 1
  ); // Simple character encoding
  return padSequence(sequence, maxSeqLength);
});

const yData = tf.tensor1d(labels);

// Define the model
const model = tf.sequential();
model.add(
  tf.layers.embedding({ inputDim: 27, outputDim: 8, inputLength: maxSeqLength })
);
model.add(tf.layers.flatten());
model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

model.compile({
  optimizer: tf.train.adam(),
  loss: "binaryCrossentropy",
  metrics: ["accuracy"],
});

// Convert data to tensors
const xTrain = tf.tensor2d(xData);
const yTrain = yData;

// Train the model
model.fit(xTrain, yTrain, { epochs: 100 }).then((history) => {
  console.log("Training complete.");

  // Test the model with custom data
  const customTestData = ["awesome", "terrible", "excited", "disappointed"];
  const xCustomTestData = customTestData.map((text) => {
    const tokens = tokenize(text);
    const sequence = tokens.map(
      (token) => token.charCodeAt(0) - "a".charCodeAt(0) + 1
    );
    return padSequence(sequence, maxSeqLength);
  });

  const xCustomTest = tf.tensor2d(xCustomTestData);

  // Make predictions
  const predictions = model.predict(xCustomTest);
  const results = predictions.arraySync();

  console.log("Custom Test Data Predictions:", results);
});
