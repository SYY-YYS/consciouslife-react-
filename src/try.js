function queueTime(customers, n) {
  //TODO
  let till = [];
  if (n >= customers.length) {
    if (customers.length === 0) {
      return 0;
    } else {
      return Math.max(...customers);
    }
  } else {
    for (var i = 0; i < n; i++) {
      till.push(customers[i])
    }
    
    for (let j = i; j < customers.length; j++) {
      let min = Math.min(...till);
      let index = till.indexOf(min);
      till[index] += customers[j]
      console.log('after adding: ', till)
    }
    
    return Math.max(...till)
  }
}
console.log(queueTime([], 100))