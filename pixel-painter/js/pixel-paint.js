// When size is submitted by the user, call makeGrid()
const submit = document.querySelector('form');
submit.addEventListener('submit', makeGrid);

function makeGrid() { 
  
  //  Clear Grid before making new one, to allow grid refresh upon new size selection.
  const mainGrid = document.getElementById('pixelCanvas');
  mainGrid.innerHTML = '';

  const mHeight = document.querySelector('#inputHeight').value;
  const mHeightParsed = parseInt(mHeight);
  const nWidth = document.querySelector('#inputWidth').value;
  const nWidthParsed = parseInt(nWidth);
  
	for (let i = 0; i < mHeightParsed; i++) {
    const newRow = document.createElement('tr');
    const addRow = mainGrid.appendChild(newRow);
  
    for (let i = 0; i < nWidthParsed; i++) {
      const newSquare = document.createElement('td');
      const addSquare = addRow.appendChild(newSquare);
	  }
	}
  
  //Adds eventListener for user color selection to Entire Grid, instead of each individual pixel.
  mainGrid.addEventListener('mousedown', function(event) {
    const colorSelection = document.querySelector('#colorPicker').value;
    event.target.style.cssText = "background-color: "+ colorSelection;
  });

}

// Preventing entire page-refresh upon user clicking Submit button.
submit.addEventListener("submit", function(event) {
         event.preventDefault();
}, false);