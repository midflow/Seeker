function request($imagePath) {
    return new Promise(function (resolve, reject) {
        var data = new FormData();
        var photo = {
            uri: $imagePath, // CameralRoll Url
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
        data.append("images_file", photo);
        //data.append("images_file", require('../assets/obama.jpg'));

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                //console.log(this.responseText);
                return this.responseText;
            }
        });

        xhr.open("POST", "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/detect_faces?api_key=d0bf1055f66a807f9feccb6aa57503ee1b01706f&version=2016-05-20");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("postman-token", "fe0ce642-0287-aca3-1636-9064271616c7");

        xhr.send(data);
    });
}

var api = {
    getCandidatesFromApiAsync($imagePath) {
        var url = 'https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/detect_faces?url=https%3A%2F%2Fwww.whitehouse.gov%2Fwp-content%2Fuploads%2F2017%2F12%2F44_barack_obama1.jpg&version=2016-05-20';

        return fetch(url)
            .then(res => res.json())
            .catch(error => {
                console.error(error);
            });
    },

    getCandidatesFromApiAsync_Fetch($imagePath) {
        var url = 'https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/detect_faces?api_key=40b30a01435fa6f174b4b1f7214e193ab795cb09&version=2016-05-20';

        let data = new FormData()
        var photo = {
            uri: $imagePath, // CameralRoll Url
            type: 'image/jpeg',
            name: 'photo.jpg'//$imagePath.replace(/^.*[\\\/]/, ''),
        };
        data.append("images_file", photo);

        const config = {            
            method: 'POST',
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'multipart/form-data'
            },
            body: data,
        }

        return fetch(url, config)
            .then(res => {
                if (res.ok)
                   return JSON.parse(res._bodyText)
            })
            .catch(error => {
                console.error(error);
            });
    },

    getCandidatesFromApiAsync_Xhr($imagePath) {
        //var url = 'https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/detect_faces?url=https%3A%2F%2Fwww.whitehouse.gov%2Fwp-content%2Fuploads%2F2017%2F12%2F44_barack_obama1.jpg&version=2016-05-20';        
        return request($imagePath)
            .then((e) => {
                //console.log(e.target.response);
                return e.target.response;
            }, function (e) {
                // handle errors
                //console.log(e.error);
            });


        // data.append("images_file", photo);
        // //data.append("images_file", require('../assets/obama.jpg'));

        // var xhr = new XMLHttpRequest();
        // xhr.withCredentials = true;

        // xhr.addEventListener("readystatechange", function () {
        //     if (this.readyState === 4) {
        //         //console.log(this.responseText);
        //     }
        // });

        // xhr.open("POST", "https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/detect_faces?api_key=40b30a01435fa6f174b4b1f7214e193ab795cb09&version=2016-05-20");
        // xhr.setRequestHeader("cache-control", "no-cache");
        // xhr.setRequestHeader("postman-token", "fe0ce642-0287-aca3-1636-9064271616c7");

        // xhr.send(data);
    },
    getInfoFromNameAsync($name) {
        var url= encodeURI('http://ec2-13-112-53-179.ap-northeast-1.compute.amazonaws.com/api/candidate/'+$name);

        return fetch(url)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                  } else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                  }
            })
            .then(res => res.json())
            .catch(error => {
                console.error(error);
            });
    },
}

module.exports = api;
