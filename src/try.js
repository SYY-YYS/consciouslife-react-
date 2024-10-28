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
let currentD = new Date()
console.log(currentD.getDate())
let d = new Date(currentD.getFullYear(), currentD.getMonth() , currentD.getDate() - 1)
console.log(d, new Date(2024,9,25))
console.log(d < new Date(2024,9,25))