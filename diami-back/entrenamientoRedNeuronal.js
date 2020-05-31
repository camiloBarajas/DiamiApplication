var synaptic = require('synaptic'),
  fs = require('fs'),
  Neuron = synaptic.Neuron,
  Layer = synaptic.Layer,
  Network = synaptic.Network,
  Trainer = synaptic.Trainer,
  Architect = synaptic.Architect;

var trainingSet = [];

fs.readFile('./policeData.txt', 'utf8', function (err, data) {
  if (err) throw err;

  var lines = data.split('\n');

  for (let i = 1; i < lines.length - 1; i++) {
    var line = lines[i];

    var numbers = line.split(' ');

    var input = [];
    for (let j = 0; j < numbers.length - 1; j++) {
      var number = parseFloat(numbers[j]);

      if (j == 0 || j == 1 || j == 4 || j == 5 || j == 6) input.push(number);
    }

    var output = parseFloat(numbers[numbers.length - 1].replace('\n', ''));

    trainingSet.push({ input: input, output: [output] });
  }

  var myNetwork = new Architect.Perceptron(5, 4, 1);

  var trainer = new Trainer(myNetwork);
  console.log('entrenando');
  console.log(
    trainer.train(trainingSet.slice(0, 4050), {
      rate: 0.001,
      iterations: 25000,
      error: 0.008,
      log: 1000
    })
  );

  console.log('entrenando2');

  console.log(
    trainer.test(trainingSet.slice(4050, 5787), {
      rate: 0.001,
      iterations: 25000,
      error: 0.008,
      log: 1000
    })
  );

  var exported = myNetwork.toJSON();
  var json = JSON.stringify(exported);
  fs.writeFile('modelNeuralNetwork.json', json, 'utf8', function (err) {
    if (err) throw err;
    console.log('complete');
  });
});
