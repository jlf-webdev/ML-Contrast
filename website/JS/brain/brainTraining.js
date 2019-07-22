export function trainBrain(rgbDataset) {
    const network = new brain.NeuralNetwork();
    network.train(rgbDataset);
    return network;
}