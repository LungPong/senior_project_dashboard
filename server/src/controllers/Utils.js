module.exports = {
  avgTemp (tempArray) {
    let sum = 0
      tempArray.forEach(element => {
        sum += element
      });
      return (sum/tempArray.length).toFixed(1)
  },
  diffDate (dateMilliArray) {
    for (var i = 0; i < (dateMilliArray.length-1); i++) {
      const date1 = new Date(dateMilliArray[i])
      const date2 = new Date(dateMilliArray[i+1])
      const diffTime = Math.abs(date2 - date1)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (diffDays >= 3) {
        return false
      }
    }
    return true
  }
}