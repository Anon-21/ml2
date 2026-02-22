from flask import Flask, request, jsonify
import pandas as pd
import random
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

#  movie dataset with cluster assignments loaded
try:
    df = pd.read_csv('movies_with_clusters.csv')
    print("Movie database has been loaded successfully.")
except FileNotFoundError:
    print("ERROR: 'movies_with_clusters.csv' has not been found.")
    print("Please make sure the file has been placed in the same folder as app.py")
    exit()

@app.route('/recommend', methods=['POST'])
def recommend_movie():
    """
    A random movie from the given cluster has been recommended.
    Expects JSON input: {"cluster": "clusterX"}
    Returns movie details: title, release date, and overview.
    """
    data = request.json
    cluster_id = data.get('cluster')  
    
    print(f"Request has been received for cluster: {cluster_id}")

    if cluster_id is None:
        return jsonify({'error': 'Cluster data has been missing'}), 400
    
    try:
        #  cluster string (e.g., "cluster10") has been converted to a numeric ID
        cluster_number = int(cluster_id.replace('cluster', ''))
        
        # Movies belonging to the given cluster filtered
        movies_in_cluster_df = df[df['cluster'] == cluster_number]
        
        if movies_in_cluster_df.empty:
            return jsonify({'error': f'No movies have been found for cluster {cluster_number}'}), 404
        
        #  One random movie selected from the cluster
        random_movie_row = movies_in_cluster_df.sample(n=1).iloc[0]
        
        #  movie details extracted
        movie_title = random_movie_row['title']
        release_date = random_movie_row['release_date']
        overview = random_movie_row['overview']
        
        print(f"Movie has been recommended: {movie_title}")
        
        # recommendation returned as JSON
        return jsonify({
            'movie_title': movie_title,
            'release_date': release_date,
            'overview': overview
        })

    except Exception as e:
        print(f"An error has occurred: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # The Flask server has been started (default: http://127.0.0.1:5000)
    print("Flask server has been started... The frontend can now test it.")
    app.run(debug=True, port=5000)
