App = React.createClass({
    getInitialState: function() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },
    getGif: function(searchingText, callback) {
      var GIPHY_API_KEY = 'ZR9hGrtAmWg0L6YHSjneQ3kqsnV51Dbc';
      var GIPHY_API_URL = 'http://api.giphy.com';
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key='+ GIPHY_API_KEY + '&tag=' + searchingText;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText).data;
                var gif = {
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif);
            }
        };
        xhr.send();
    },
    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText, function(gif) {
            this.setState({
                loading: false,
                gif: gif,
                searchingText: searchingText
            })
        }.bind(this));
    },
    render: function() {
        return (
          <div className = "app">
            <h1> Gif Searcher</h1>
            <p> Find gif on <a href = "http://giphy.com">giphy</a>Press enter to get more gifs!</p>
            <Search onSearch = { this.handleSearch }/>
            <Gif
              loading = { this.state.loading }
              url = { this.state.gif.url }
              sourceUrl = { this.state.gif.sourceUrl }
            />
            </div>
        );
    }
});
