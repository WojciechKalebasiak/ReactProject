App = React.createClass({
    getInitialState: function() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },
    getGif: function(searchingText) {
        const GIPHY_API_KEY = 'ZR9hGrtAmWg0L6YHSjneQ3kqsnV51Dbc';
        const GIPHY_API_URL = 'http://api.giphy.com';
        const url = GIPHY_API_URL + `/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=${searchingText}`;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const data = JSON.parse(this.responseText).data;
                    const gif = {
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    }
                    resolve(gif);
                } else {
                    reject(new Error(`Error ${this.statusText}`));
                }
            }
            xhr.onerror = function() {
                reject(new Error(`Eror ${this.statusText}`));
            }
            xhr.send();
        });
    },
    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText).then(gif => {
            this.setState({
                loading: false,
                gif: gif,
                searchingText: searchingText
            });
        }).catch(err => console.log(err));
    },
render: function() {
    return (
        <div className = "app" >
            <h1>Gif Searcher </h1>
            <p>Find gif on <a href = "http://giphy.com">giphy.</a> Press enter to get more gifs!</p>
            <Search onSearch = { this.handleSearch }/>
            <Gif loading = { this.state.loading } url = { this.state.gif.url } sourceUrl = { this.state.gif.sourceUrl }/>
        </div>
    );
}
});
