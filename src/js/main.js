var React = require('react');
var $ = require('jquery');

var Track = React.createClass({
  render: function() {
    return <div className="track">
      <div className="row">
        <div className="title">{this.props.title}</div>
        <div className="artist">{this.props.artist}</div>
      </div>
      <div className="row">
        <div className="tracknr">{this.props.track}</div>
        <div className="album">{this.props.album}</div>
        <div className="year">{this.props.year}</div>
      </div>
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
      <div className="form-group">
        <input type="search" className="form-control" placeholder="Search" ref="query" />
      </div>
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
