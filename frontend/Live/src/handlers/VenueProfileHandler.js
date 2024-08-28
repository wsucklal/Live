const webHandler =  require('./webHandler')
const APIROUTE = 'venue/';

const getVenueProfiles = async function() {
    //AsedlTwX2fdmuN0yWiM1k4BzKFb2
    try {

        const json =  await webHandler.get(`${APIROUTE}`);
        return json;
    }
    catch(err){

    }
    
}

const getVenueProfile = async (id) =>{
    //AsedlTwX2fdmuN0yWiM1k4BzKFb2
    try {
        const json =  await webHandler.get(`${APIROUTE}${id}`);
        const venueData = JSON.parse(json)
        return venueData;
    }
    catch(err){

    }
    
}

const getVenueReviews = async (id) => {
    try {
        const json =  await webHandler.get(`review/venue/${id}`);
        return json;
    }
    catch(err){

    }
}

module.exports = {
    getVenueProfile,
    getVenueProfiles,
    getVenueReviews
}

