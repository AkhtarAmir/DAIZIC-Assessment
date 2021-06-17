const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQDNU9WxrgL4mAduOcDTJedrMWCI7h5uT4esruuVOsupKu7GeVKwkWps9FPASA8XQfavM5PKvr1KX5WmP6WfPX5CHf13zi2hNAxqHHmFhrCQn9u8ol5FBePC_KdA96ixV5KKhqzJAdNllQRWBi618U5a4d96oyJPejFVhqFUpwsIXwZpX_jiWXivxUvZIjr2jTsRuoapsTYlTcIi6679hMdejbFgHEXRL-BaH9PumfRq67hfIvIkGZafY-uZK6Ug-QTUNF5w8FDBJXxoQ_CvppJElr0weKMwwtLHgcM_VkOo7LfhS3eq"
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

// Get All playlists
async function getUserPlaylists(userName) {
    const data = await spotifyApi.getUserPlaylists(userName)

    for (let playlist of data.body.items) {
        let tracks = await getPlaylistTracks(playlist.id, playlist.name);

        const tracksJSON = { tracks };
        let data = JSON.stringify(tracksJSON);
        fs.writeFileSync(playlist.name+'.json', data);
    }
}

//Get playlist tracks
async function getPlaylistTracks(playlistId, playlistName) {
    const data = await spotifyApi.getPlaylistTracks(playlistId, {
        offset: 1,
        limit: 100,
        fields: 'items'
    });
    let tracks = [];

    for (let trackObj of data.body.items) {
        const track = trackObj.track;
        tracks.push(trackObj);
        console.log(track.name + " : " + track.artists[0].name);
    }
  
    return tracks;
}

getUserPlaylists('tbaranowicz');