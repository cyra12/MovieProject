#include <fstream>
#include <string>
#include <regex>
#include <iostream>
using std::string;
using std::fstream;

string const delimiter = ";";
//searches the Movies text file for movies with the genre specified
void FindMoviesOfGenre(string const & genre) {
    bool flag = false;
    fstream newfile;
    newfile.open("Movies.txt", std::ios::in);
    string currentMovie;
    std::regex pattern(".+?(?=" + delimiter + ".*, " + genre + ",)");
    while(getline(newfile, currentMovie)) {
        std::sregex_iterator iter(currentMovie.begin(), currentMovie.end(), pattern);
        std::sregex_iterator end;
        while (iter != end) {
            flag = true;
            std::cout << iter->str() << "," << std::endl;
            iter++;
        }
    }
    newfile.close();
    if(!flag) {
        std::cout << "No such movies found" << std::endl;
    }
}
//add movie to the text file of movies. 
void AddMovieToList (string & MovieTitle) {
    std::ofstream MovieList;
    MovieList.open("Movies.txt", std::ios_base::app);
    MovieList << MovieTitle << "\n";
    MovieList.close();
}
int main () {
    string command;
    getline(std::cin, command);
    if(command.find(";") != std::string::npos) {
        AddMovieToList(command);
    } else {
        FindMoviesOfGenre(command);
    }
    // push test!!
    return 0;
}