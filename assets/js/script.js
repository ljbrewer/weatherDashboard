function getDogData(term = 'terrier') {
    var endPoint = "https://dog.ceo/api/breed/" + term + "/images/random/3"
    fetch(endPoint)
        .then(function (response) {
            //console.log(response);
            return response.json();
        })
        .then(function (data) {
            displayDog(data.message);
        })
}