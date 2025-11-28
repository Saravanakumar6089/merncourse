


/*function calculateArea(){
    let length = document.getElementById("length").value;
    let width = document.getElementById("width").value;
    console.log(length*width);
    return length*width ;
}


 document.getElementById("result").innerHTML = calculateArea();
*/

function calculateArea() {
 
let length =document.getElementById('length').value;
let width = document.getElementById('width').value;
 
let area = length * width;
 document.getElementById('result').innerHTML = `The area of the rectangle is: ${area}`;
}

function increaseCount(){
    let count = parseInt(document.getElementById('countDisplay').textContent);
    count++;
    document.getElementById('countDisplay').innerHTML = count;
}
