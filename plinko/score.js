const outputs = []

// Ran every time a balls drops into a bucket
function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // We're using an AoA approach
  outputs.push([dropPosition, bounciness, size, bucketLabel])
}

function runAnalysis() {
  // Write code here to analyze stuff
  const testSetSize = 10;
  const k = 10;

  _.range(0,3).forEach(feature => {
    //feature == 0 
    //feature == 1, ==2 
    const data = _.map(outputs, row => [row[feature], _.last(row)]);
    const [testSet,trainingSet] = splitDataset(minMax(data, 1), testSetSize);

    const accuracy =  _.chain(testSet)
      .filter(testPoint =>  knn(trainingSet, _.initial(testPoint), k) === _.last(testPoint))
      .size()
      .divide(testSetSize)
      .value();

    console.log('For feature of: ', feature, 'Accuracy is : ', accuracy);
  });
}

//K-NN Implementation:

function knn(data, point, k) {
  //point has 3 values now
  return   _.chain(data)
    .map(row => {
      return [
        distance(_.initial(row), point),
         _.last(row)
      ];
    }) //sub 300 from drop point and take abs value, bucket location
    .sortBy((row) => row[0]) // sort results from least to greatest
    .slice(0, k) // Look at the top 'k' records
    .countBy((row) => row[1]) // Find most common bucket out of k buckets
    .toPairs() // turn into AoAs of key pairs
    .sortBy((row) => row[1]) // sort least to greatest
    .last() // get last element (most frequent bucket)
    .first() // get the first element from array (bucket)
    .parseInt() // turn into a string
    .value()
}

function distance(pointA, pointB) {
  return _.chain(pointA)
      .zip(pointB)
      .map(([a,b]) => (a - b) ** 2)
      .sum()
      .value() ** 0.5;
}

function splitDataset(data, testCount){
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);
  return [testSet, trainingSet];
}

function minMax(data, featureCount){
  const clonedData = _.cloneDeep(data);

  for(let i = 0; i < featureCount; i++){
    //first for loop is to iterate thru each column/ each feature we want to normalize

    const column = clonedData.map(row => row[i]);
    const min = _.min(column)
    const max =  _.max(column)

    for(let j = 0; j < clonedData.length; j++){
      clonedData[j][i] = (clonedData[j][i] - min) / (max - min)
    }
  }
  return clonedData;
}


