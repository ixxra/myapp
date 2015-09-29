var React = require('react');
var $ = require('jquery');

var Track = React.createClass({
  render: function() {
    return <div>
      <div>{this.props.title}</div>
      <div>{this.props.author}</div>
      <div>{this.props.track}</div>
      <div>{this.props.album}</div>
      <div>{this.props.year}</div>
    </div>;
  }
});

var SearchForm = React.createClass({
  handleSubmit: function(elm){
    elm.preventDefault();
    var query = React.findDOMNode(this.refs.query).value.trim();
    this.props.onSubmit(query);
  },

  render: function(){
    return <form onSubmit={this.handleSubmit}>
      <input type="search" placeholder="Search" ref="query" />
    </form>;
  }
});

var SearchBox = React.createClass({
  search: function(q){
      $.ajax({
        url: '/api/metadata',
        data: {q: q},
        success: function(data){
          this.props.onSearch(data);
        }.bind(this),
        error: function(xhr, status, err){
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
  },

  render: function() {
    return <div>
    <h1>Library Search</h1>
    <SearchForm onSubmit={this.search} />
    </div>;
  }
});

var ResultsBox = React.createClass({
  render: function (){
    var results = this.props.data.map(function(result, index){
        return <Track
          title={result.title}
          artist={result.artist}
          album={result.album}
          track={result.track}
          year={result.year} />;
    });

    return <div>
      {results}
    </div>
  }
});

var Main = React.createClass({
  handleResults: function(results){
    this.setState({data: results});
  },

  getInitialState: function(){
    return {data: []};
  },

  render: function() {
    return <div>
    <SearchBox onSearch={this.handleResults} />
    <hr />
    <h1>Results ({this.state.data.length})</h1>
    <ResultsBox data={this.state.data} />
    </div>;
  }
})

React.render(
  <Main />,
  document.getElementById('container')
);
