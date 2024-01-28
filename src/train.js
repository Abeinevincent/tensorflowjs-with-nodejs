const tf = require("@tensorflow/tfjs-node");

// Generate a synthetic dataset
const generateDataset = (numSamples) => {
  const sizes = Array.from(
    { length: numSamples },
    () => Math.random() * 3000 + 500
  );
  const bedrooms = Array.from(
    { length: numSamples },
    () => Math.floor(Math.random() * 5) + 1
  );
  const distances = Array.from(
    { length: numSamples },
    () => Math.random() * 20
  );

  const prices = sizes.map(
    (size, i) =>
      1000 * size +
      20000 * bedrooms[i] -
      1000 * distances[i] +
      Math.random() * 10000
  );

  return { sizes, bedrooms, distances, prices };
};

const numSamples = 1000;
const { sizes, bedrooms, distances, prices } = generateDataset(numSamples);

// Store the generated dataset for inspection
const datasetForInspection = { sizes, bedrooms, distances, prices };

// Create tensors from the data
const xs = tf
  .tensor2d([sizes, bedrooms, distances], [3, numSamples])
  .transpose();
const ys = tf.tensor2d(prices, [numSamples, 1]);

// Model architecture
const model = tf.sequential();
model.add(tf.layers.dense({ units: 64, inputShape: [3], activation: "relu" }));
model.add(tf.layers.dense({ units: 1 }));

model.compile({ optimizer: "adam", loss: "meanSquaredError" });

// Training
model.fit(xs, ys, { epochs: 50 }).then(() => {
  // Model is trained
  // You can use the trained model to make predictions

  const newHouseFeatures = tf.tensor2d([[1500, 3, 10]]);
  const prediction = model.predict(newHouseFeatures);
  console.log("Predicted Price:", prediction.dataSync()[0]);
});
