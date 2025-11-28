let shows = [];

  function addShow() {
            const showName = document.getElementById('showName').value;
            const actorName = document.getElementById('actorName').value;
            const showDescription = document.getElementById('showDescription').value;
            const duration = parseInt(document.getElementById('duration').value);
            if (showName && actorName && showDescription && !isNaN(duration)) {
                const show = {
                    name: showName,
                    actorName: actorName,
                    duration: duration,
                    showDescription: showDescription
                };
                shows.push(show);
                showShows();
                clearInputs();
            } else {
                alert('Please fill in all fields correctly.');
            }
        }

    function showShows() {
        const showsDiv = shows.map((show, index) => `<h1>Show Number: ${index + 1}</h1>
            <p><strong>Show Name: </strong>${show.name}</p>
            <p><strong>Actor Name:</strong> ${show.actorName}</p>
            <p><strong>Show Description:</strong> ${show.showDescription}</p>
            <p><strong>Duration:</strong> ${show.duration} page(s)</p>
            <button onclick="editShow(${index})">Edit</button>`
        );
        document.getElementById('shows').innerHTML = showsDiv.join('');
    }

    function editShow(index) {
        const show = shows[index];
        document.getElementById('showName').value = show.name;
        document.getElementById('actorName').value = show.actorName;
        document.getElementById('showDescription').value = show.showDescription;
        document.getElementById('duration').value = show.duration;
        shows.splice(index, 1); // Remove old entry
        showShows(); // Refresh list
      }

      function clearInputs() {
        document.getElementById('showName').value = '';
        document.getElementById('actorName').value = '';
        document.getElementById('showDescription').value = '';
        document.getElementById('duration').value = '';
}