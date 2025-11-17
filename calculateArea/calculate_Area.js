


/*function calculateArea(){
    let length = document.getElementById("length").value;
    let width = document.getElementById("width").value;
    console.log(length*width);
    return length*width ;
}


 document.getElementById("result").innerHTML = calculateArea();
*/
let length;
let width;
 function calculateArea() {
 length = parseFloat(document.getElementById('length').value);
 width = parseFloat(document.getElementById('width').value);
let area = length * width;
 document.getElementById('result').innerHTML = `The area of the rectangle is: ${area}`;
}

