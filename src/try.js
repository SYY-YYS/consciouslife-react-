function generateHashtag (str) {
    // prevent empty string
    let strArray = str.match(/\w+/ig)
    if (strArray !== null) {
      strArray = strArray.map(str => {
      return str[0].toUpperCase() + str.slice(1, str.length)
      })
      // check if result longer than 140 chars
      let joinedArray = strArray.join('');
      if (joinedArray.length > 140-1) {
        return false
      } else {
        return '#' + joinedArray;
      }
    } else {
      return false
    }
    
  }
console.log(generateHashtag('Do We have A Hashtag'))