var api = {
    getMoviesFromApiAsync() {
        var url = 'https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/detect_faces?url=https%3A%2F%2Fwww.whitehouse.gov%2Fwp-content%2Fuploads%2F2017%2F12%2F44_barack_obama1.jpg&version=2016-05-20';

        return fetch(url)
            .then(res => res.json())           
            .catch(error => {
                console.error(error);
            });
    }
}

module.exports = api;
