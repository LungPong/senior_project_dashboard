module.exports = {
  avgTemp (tempArray) {
    let sum = 0
      tempArray.forEach(element => {
        sum += element
      });
      return (sum/tempArray.length).toFixed(1)
  }
}