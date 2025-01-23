async function enterMovie(title) {
    const url = "http://127.0.0.1:5000/AddMovie/" + title;
    console.log("balls");
    // fetch results
    var result = await fetch(url, {mode : 'no-cors'});
    console.log(result);

    if(result === "No such movies found") {
        return "Whoopsies" + result;
    } else {
        return "Movie Added";
    }
}

async function tester() {
    const url = "http://127.0.0.1:5000/";
    var result = await fetch(url)
    .then((response) => response.json())
    //.then((responseObject) => responseObject.result)
    .then((r) => {
      return r;
    })
    .catch((e) => console.log(e));
    console.log(result);
}

async function enterGenre(genre) {
    const url = "http://127.0.0.1:5000/ParseList/" + genre;
    
    var result = await fetch(url)
    .then((response) => response.json())
    //.then((responseObject) => responseObject.result)
    .then((r) => {
      return r;
    })
    .catch((e) => console.log(e));
    console.log(result);
    return result;
}

export {enterGenre, enterMovie, tester}