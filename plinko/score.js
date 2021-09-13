// const outputs = []; 

// function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
//   // Ran every time a balls drops into a bucket
//   outputs.push([dropPosition, bounciness, size, bucketLabel]);
// }

// function runAnalysis() {
//   // Write code here to analyze stuff
//   // console.log('Your point will probably fall into', bucket);
//   const testSetSize = 10;
//   const [testSet, trainingSet] = splitDataset(outputs, testSetSize);

//   // let numberCorrect = 0;
//   // for (let i = 0; i < testSet.length; i++){
//   //   const bucket = knn(trainingSet, testSet[i][0]);
//   //   if(bucket == testSet[i][3]){
//   //     numberCorrect++;
//   //   }
//   // }
//   // console.log('Accuracy: ', numberCorrect / testSetSize);
// _.range(1,15).forEach(k => {
//   const accuracy = _.chain(testSet)
//     .filter(testPoint =>  knn(trainingSet, testPoint[0], k) === testPoint[3])
//     .size()
//     .divide(testSetSize)
//     .value()
//   console.log("For k of ", k," Accuracy is:" , accuracy);
// });

// }
// function knn(data, point, k) {
//   return   _.chain(data)
//     .map(row => [distance(row[0], point), row[3]])
//     .sortBy(row => row[0])
//     .slice(0, k)
//     .countBy(row => row[0])
//     .toPairs()
//     .sortBy(row => row[1])
//     .last()
//     .first()
//     .parseInt()
//     .value()
//   }

// function distance(pointA, pointB){
//   //pointA = 300 pointB = 12
//   //pointA = [300, .5, 16], pointB = [334, .55, 15]
//   // return Math.abs(pointA - pointB);
//   return _.chain(pointA)
//     .zip(pointB)
//     .map(([a,b]) => (a - b) ** 2)
//     .sum()
//     .value() ** 0.5;
// }

// function splitDataset(data, testCount){
//   const shuffled = _.shuffle(data);

//   const testSet = _.slice(shuffled, 0, testCount);
//   const trainingSet = _.slice(shuffled, testCount);
//   console.log(testSet, trainingSet);  
//   return [testSet, trainingSet];
// }

const outputs = []
const predictionPoint = 300
const k = 3

// Ran every time a balls drops into a bucket
function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // We're using an AoA approach

  outputs.push([dropPosition, bounciness, size, bucketLabel])

  console.log(outputs)
}

function runAnalysis() {
  // Write code here to analyze stuff

  //K-NN Implementation:

  const bucket = _.chain(outputs)
    .map((row) => [distance(row[0]), row[3]]) //sub 300 from drop point and take abs value, bucket location
    .sortBy((row) => row[0]) // sort results from least to greatest
    .slice(0, k) // Look at the top 'k' records
    .countBy((row) => row[1]) // Find most common bucket out of k buckets
    .toPairs() // turn into AoAs of key pairs
    .sortBy((row) => row[1]) // sort least to greatest
    .last() // get last element (most frequent bucket)
    .first() // get the first element from array (bucket)
    .parseInt() // turn into a string
    .value()

  console.log('Your point will probably fall into', bucket)
}

function distance(point) {
  return Math.abs(point - predictionPoint)
}