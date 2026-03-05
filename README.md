# Movie Personality Recommender

A content-based movie recommendation system that groups movies using K-Means clustering and suggests films based on a short personality quiz. The system combines NLP preprocessing, unsupervised machine learning, and a simple web interface to generate movie recommendations.

---

## Objective

To build a lightweight movie recommendation system that demonstrates the integration of machine learning clustering, NLP preprocessing, and a web-based user interface.

---

## Features

- Content-based movie clustering using K-Means
- NLP preprocessing of movie descriptions
- Personality quiz interface for users
- Flask backend API for recommendations
- Random movie suggestion from the predicted cluster

---

## Dataset

The project uses the **TMDB 5000 Movies dataset**, which contains metadata such as:

- Movie title
- Genres
- Overview / description
- Release date
- Additional metadata fields

After preprocessing and clustering, the dataset is saved as:

```
movies_with_clusters.csv
```

This file includes cluster labels used by the recommendation system.

---

## Machine Learning Pipeline

1. Data preprocessing  
   - Cleaning movie overview text  
   - Lowercasing and removing stopwords  

2. Feature extraction  
   - Converting movie text and genre information into numerical vectors  

3. Clustering  
   - Applying K-Means clustering to group movies with similar themes  

4. Dataset export  
   - Saving cluster assignments for use in the web application  

---

## Model Details

Algorithm: K-Means Clustering

Number of clusters: 20

Input features:
- Movie overview text
- Genre metadata

Processing steps:
- Text normalization
- Feature vector creation
- Clustering based on feature similarity

Output:
Each movie is assigned a cluster ID representing a group of movies with similar content.

---

## System Architecture

```
User
 ↓
Personality Quiz (HTML + JavaScript)
 ↓
Flask Backend API
 ↓
Clustered Movie Dataset
 ↓
Movie Recommendation
```

---

## Project Structure

```
movie-personality-recommender
│
├── Movies.ipynb              # Data preprocessing and clustering
├── tmdb_5000_movies.csv     # Original dataset
├── movies_with_clusters.csv # Dataset with cluster labels
│
├── app.py                   # Flask recommendation API
│
├── index.html               # Personality quiz interface
├── script.js                # Quiz logic and API calls
│
├── requirements.txt         # Python dependencies
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/movie-personality-recommender.git
cd movie-personality-recommender
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Example `requirements.txt`:

```
flask
pandas
flask-cors
numpy
scikit-learn
```

---

## Running the Project

Start the backend server:

```bash
python app.py
```

The Flask server runs at:

```
http://127.0.0.1:5000
```

Open `index.html` in your browser and complete the quiz to receive a movie recommendation.

---

## Example API Request

Endpoint:

```
POST /recommend
```

Request body:

```json
{
  "cluster": "cluster10"
}
```

Example response:

```json
{
  "movie_title": "Movie Name",
  "release_date": "YYYY-MM-DD",
  "overview": "Movie description..."
}
```

---

## Results

The clustering process groups movies with similar narrative themes and genre characteristics.

Observed patterns include:

- Action and adventure movies frequently appear in the same clusters
- Comedy and family films share descriptive vocabulary
- Drama and psychological movies often cluster based on narrative-focused descriptions

These clusters are used as recommendation groups for the personality-based quiz.

---

## Reproducibility

To reproduce the clustering pipeline:

1. Open and run the notebook:

```
Movies.ipynb
```

2. The notebook performs:
   - Data preprocessing
   - Feature extraction
   - K-Means clustering

3. The output dataset will be generated:

```
movies_with_clusters.csv
```

This dataset is then used by the Flask backend to generate movie recommendations.

---

## Limitations

- K-Means requires a predefined number of clusters
- Personality-to-cluster mapping is heuristic
- Recommendations are randomly selected within clusters

---

## Future Improvements

- Use DBSCAN or hierarchical clustering
- Improve feature extraction with TF-IDF or embeddings
- Implement collaborative filtering
- Deploy the application as a web service
