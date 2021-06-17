const rapCaviar = require('./RapCavair.json');
const promoter = require('./Promoter.json');

let promoterTrackMap = {};

if (promoter.tracks && promoter.tracks.length) {
    for (let trackObj of promoter.tracks) {
        if (trackObj.track && trackObj.track.name) {
            promoterTrackMap[trackObj.track.name] = trackObj;
        }
    }
}

if (rapCaviar.tracks && rapCaviar.tracks.length) {
    for (let trackObj of rapCaviar.tracks) {
        if (trackObj.track && trackObj.track.name) {
            if (promoterTrackMap[trackObj.track.name]) {
                let promoterTrackDate = promoterTrackMap[trackObj.track.name].added_at;
                let rapCaviarTrackDate = trackObj.added_at;
                let difference = hoursBetween(promoterTrackDate, rapCaviarTrackDate);

                if (difference < 0) {
                    console.log(`Track ${trackObj.track.name} was added on Promoter ${Math.abs(difference)} hours before it was added on RapCaviar`);
                } else if (difference > 0){
                    console.log(`Track ${trackObj.track.name} was added on Promoter ${difference} hours after it was added on RapCaviar`);
                } else {
                    console.log(`Track ${trackObj.track.name} was added on Promoter and RapCaviar at the same time`);
                }
            }
        }
    }
}

function hoursBetween(date1, date2) {
    return Math.round(new Date(date1).getTime() - new Date(date2).getTime())/(60*60*1000);
};