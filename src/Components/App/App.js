import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchResults: [{name: 'name1', artist: 'artist1', album: 'album1', id: 1},
      {name: 'name2', artist: 'artist2', album: 'album2', id: 2},
      {name: 'name3', artist: 'artist3', album: 'album3', id: 3}], 
      playListName: {name: 'MyPlayList'},
      playListTracks: [{name: 'playlistname1', artist: 'playlistartist1', album: 'playlistalbum1', id: 11},
      {name: 'playlistname2', artist: 'playlistartist2', album: 'playlistalbum2', id: 12},
      {name: 'playlistname3', artist: 'playlistartist3', album: 'playlistalbum3', id: 13}]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playListTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playListTracks: tracks})
  }

  removeTrack(track) {
    let tracks = this.state.playListTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playListTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({playListName: name})
  }

  savePlaylist() {
    alert("This method is linked to the button correctly!");
    const trackUris = this.state.playListTracks.map(track => track.uri);
  }

  search(searchTerm) {
    this.setState( { searchResults: Spotify.search(searchTerm) } );
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist 
              playListName={this.state.playListName}
              playListTracks={this.state.playListTracks} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName} 
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
