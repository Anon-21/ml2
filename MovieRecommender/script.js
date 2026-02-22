// This has been placed in script.js

async function handleSubmitQuiz() {
  
  // A scoreboard has been created
  let scores = {};

  // All of the user's selected answers have been collected
  let allAnswers = document.querySelectorAll('input[type="radio"]:checked');
  
  // The scores have been tallied
  allAnswers.forEach((answer) => {
    let cluster = answer.value;
    if (scores[cluster]) {
      scores[cluster] += 1;
    } else {
      scores[cluster] = 1;
    }
  });

  // The winning cluster has been determined
  let maxScore = -1;
  let winningCluster = "";

  for (let cluster in scores) {
    if (scores[cluster] > maxScore) {
      maxScore = scores[cluster];
      winningCluster = cluster;
    }
  }

  // A request has been prepared for the Flask server
  console.log(`Winning cluster has been ${winningCluster}. A request has been sent to the Python server...`);
  let resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<h2>Finding your movie...</h2>";

  try {
    const response = await fetch('http://127.0.0.1:5000/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cluster: winningCluster })
    });

    const data = await response.json();

    // The response has been checked for 'movie_title' and all details have been displayed
    if (data.movie_title) {
      // The release year has been extracted from the release_date (e.g., "2015-03-04" → "2015")
      const year = data.release_date.split('-')[0];
      
      resultDiv.innerHTML = `
        <h2>Movie Rec found!🎉:</h2><p style="font-size:12px;">keep hitting the button, till you find your desired movie 😄</p>
        <p style="font-size: 24px; margin-bottom: 5px;">
          <strong>${data.movie_title} (${year})</strong>
        </p>
        <p style="font-style: italic; margin-top: 0;">
          ${data.overview}
        </p>
      `;
    } else {
      resultDiv.innerHTML = `<p>Error has occurred: ${data.error}</p>`;
    }
    
  } catch (error) {
    console.error("An error has occurred:", error);
    resultDiv.innerHTML = "<p style='color:red;'><b>Error:</b> A connection to the server has not been established. Has your Python script been running in VSCode?</p>";
  }
}

// The button has been linked to trigger the quiz submission
document.getElementById("submitButton").addEventListener("click", handleSubmitQuiz);
