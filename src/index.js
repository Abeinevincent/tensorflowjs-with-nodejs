const tf = require("@tensorflow/tfjs");

// Define your model and training logic here
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

// Example data (replace with your dataset)
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([2, 4, 6, 8], [4, 1]);

// Train the model
model.fit(xs, ys, { epochs: 100 }).then(() => {
  // Model is trained
  model.predict(tf.tensor2d([5], [1, 1])).print();
});
