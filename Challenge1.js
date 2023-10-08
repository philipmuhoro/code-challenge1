// function to calculateGrade
function calculateGrade(n) {

    let grade;
   
       if (n > 79) {
           grade = "A";
       } else if (n >= 60) {
           grade = "B";
       } else if (n >= 50) {
           grade = "C";
       } else if (n >= 40) {
           grade = "D";
       } else {
           grade = "E";
       }
   
       // Display the grade
       return 'You Scored ' + n + ', grade: ' + grade;
   }
   
   // Example usage
   const result = calculateGrade(11);
   console.log(result);
   
