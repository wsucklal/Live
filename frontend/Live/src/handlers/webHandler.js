// const APIURL = 'http://192.168.0.27:3000/'

const get = async (url)=> {
    
    // return fetch('http://192.168.0.27:3000/Venue/AsedlTwX2fdmuN0yWiM1k4BzKFb2')
    // .then( res=> console.log(res.bodyBlob))
    // //.then(console.log(json))
    // .catch(err => {
    //     console.error(err);
    // });

    try {
        const res = await fetch(`${apiUrl}/${url}`)
        const json = await res.json();
        return json
    }
    catch(err){

    }
}

module.exports = {
    get
}