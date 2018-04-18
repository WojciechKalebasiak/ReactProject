Search = React.createClass({
    getInitialState: function() {
        return {
            searchTerm: ''
        };
    },
    handleChange: function(event) {
      var searchingText = event.target.value;
      this.setState({
        searchTerm: searchingText
      });
      if(searchingText.length > 2) {
        this.props.onSearch(searchingText);
      }
    },
    handleKeyUp: function(event) {
      if(event.keyCode === 13) {
        this.props.onSearch(this.state.searchTerm);
      }
    },
    render: function() {
        return <input type = "text"
        onChange = { this.handleChange }
        onKeyUp = {this.handleKeyUp}
        placeholder = "Type gif name"
        value = { this.state.searchTerm }
        />
    }
});
