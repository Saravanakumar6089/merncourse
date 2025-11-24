const seatMapData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Row 1 (A)
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Row 2 (B)
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Row 3 (C)
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Row 4 (D)
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Row 5 (E)
];

//seat avail = 0, selected = 1, booked = 2
function toggleSelection(r, c){
    var st;
    var selectcount;
    if(seatMapData[r][c]==2) alert(`Seat ${String.fromCharCode(65+r)}${c+1} is Not Available`);
    else if(seatMapData[r][c]==1) {
        alert(`Seat ${String.fromCharCode(65+r)}${c+1} dropped from selection`);
        seatMapData[r][c]=0;
        st = document.querySelector(`[data-row="${String.fromCharCode(65+r)}"][data-col="${c+1}"]`);
        st.classList.remove("seat selected");
        st.classList.add("seat available");
    }
    else{
        alert(`Seat ${String.fromCharCode(65+r)}${c+1} is selected`);
        seatMapData[r][c]=1;
        st = document.querySelector(`[data-row="${String.fromCharCode(65+r)}"][data-col="${c+1}"]`);
        st.classList.remove("seat available");
        st.classList.add("seat selected");
        selectcount = document.getElementById('selected-count');
        selectcount.innerHTML = parseInt(selectcount.textContent)+1;
    }
}

function bookSelectedSeats(){
    var st;
    for(let i=0;i<seatMapData.length;i++){
        for(let j=0;j<seatMapData[0].length;j++){
            if(seatMapData[i][j]==1){
                seatMapData[i][j]=2;
                st = document.querySelector(`[data-row="${String.fromCharCode(65+r)}"][data-col="${c+1}"]`);
                st.classList.remove("seat selected");
                st.classList.add("seat booked");
            }
        }
    }
    alert("Selected seats booked!");
}