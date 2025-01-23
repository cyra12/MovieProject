import requests
import ast
import subprocess
import string
from flask import Flask, request, jsonify
from flask_cors import CORS
#from restful import Api, Resource

app = Flask(__name__)
CORS(app)

# api =   Api(app)
  
# class returnjson(Resource):
#     def get(self):
#         data={
#             "Modules": 15, 
#             "Subject": "Data Structures and Algorithms"
#         }
#         return data
  
# api.add_resource(returnjson,'/returnjson')
  
@app.route("/")
def home():
    data=["dill", "doe", "penis", "breath"]

    return jsonify(data)


@app.route("/AddMovie/<movieTitle>")
def findGenres (movieTitle):
    #makes movie title url friendly
    movieTitle = movieTitle.replace(" ", "_").replace("\n","")

    # the url for any given movie (so far as I can tell, if theres an issue there I will be very put out)
    url = "https://www.rottentomatoes.com/m/" + movieTitle.lower()
    response = requests.get(url)
    from bs4 import BeautifulSoup

    soup = BeautifulSoup(response.content, 'html.parser')
    current_string1 = " ".join(map(str,soup))
    current_string1 = current_string1[current_string1.find('"genre":'):]

    #finding genres
    temp_text = current_string1[current_string1.find('"genre":')+8: current_string1.find(']')] + ']'
    current_string1 = current_string1[current_string1.find('"upright","score":'): current_string1.find('"audienceClass":"upright","score":') + 50]
    rating = current_string1[current_string1.find(':')+1:current_string1.find(':')+3]

    #If the url doesnt take you anywhere cry
    try:
        genre_list = ast.literal_eval(temp_text)
    except:
        exit()

    movieTitle = movieTitle.replace("_", " ")
    movieTitle += ";,"
    for genre in genre_list:
        movieTitle = movieTitle + " " + genre + ","

    result = subprocess.run(["g++", "parser.cpp"], capture_output=False)
    #print(result.stdout) # prints the output of the compilation
    movieTitle = movieTitle.encode()
    result = subprocess.run(["./a.out"], input = movieTitle, capture_output=True)
    return jsonify((result.stdout).decode()) # prints the output of the execution

@app.route("/ParseList/<genre>")
def GetList(genre):
    result = subprocess.run(["g++", "parser.cpp"], capture_output=True)
    #print(result.stdout) # prints the output of the compilation
    genre = genre.encode()
    result = subprocess.run("./a.out", input=genre, capture_output=True)
    #print(result.stdout) # prints the output of the execution
    return jsonify((result.stdout).decode().title().split("\n"))


if __name__ == '__main__':
    app.run(debug=True)
