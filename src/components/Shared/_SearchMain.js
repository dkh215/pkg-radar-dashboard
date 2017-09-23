import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import elasticsearch from 'elasticsearch'
import Humanize from "humanize-plus";

const client = new elasticsearch.Client({
  host: process.env.ELASTIC_SEARCH_ENDPOINT
});

function renderInput(inputProps) {
  const { classes, home, value, ref, ...other } = inputProps;

  return (
    <input
      autoFocus={true}
      className={classes.textField}
      value={value}
      { ...other }
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  if (suggestion.inputValue) {
    return (
      <MenuItem
        selected={isHighlighted}
        style={{ height: 'auto' }}
        component="div"
      >
        <div>
          <span style={{ fontSize: '20px', color: '#2196F3' }}>
            {suggestion.inputValue}
          </span>
        </div>
      </MenuItem>
    )
  }

  if (suggestion._type === 'packages') {
    const matches = match(suggestion._source.package_name, query);
    const parts = parse(suggestion._source.package_name, matches);

    return (
      <MenuItem
        selected={isHighlighted}
        style={{ height: 'auto' }}
        component="div"
      >
        <div>
          <img
            src={suggestion._source.owner_avatar}
            style={{
              height: '40px',
              marginRight: '10px',
              width: '40px',
              verticalAlign: 'text-bottom'
            }}
            alt="search-result"
          />
          <div className='dib'>
            {parts.map((part, index) => {
              return part.highlight
                ? <span key={index} style={{ fontSize: '20px', color: '#2196F3' }}>
                    {part.text}
                  </span>
                : <strong key={index} style={{ fontSize: '20px' }}>
                    {part.text}
                  </strong>;
            })}
            <i className="fa fa-star ml3 mr1" aria-hidden="true" />
            <span className='mr2'>{Humanize.formatNumber(suggestion._source.stars)}</span>

            {/* <i className="fa fa-exclamation-circle fa-fw mr1" aria-hidden="true" />
            <span>{Humanize.formatNumber(suggestion._source.issues)}</span> */}

            <div style={{ lineHeight: '16px' }}>
              <span>tags: </span>
              <ul className='list dib pa0'>
                {
                  suggestion._source.tags &&
                  suggestion._source.tags.map((tag, i) => {
                    if (i < 4) {
                      const matches = match(tag, query);
                      const parts = parse(tag, matches);

                      return (
                        <li key={tag} className='dib mr2'>
                          {parts.map((part, index) => {
                            return part.highlight
                              ? <span key={index} style={{ color: '#2196F3' }}>
                                  {part.text}
                                </span>
                              : <span key={index}>
                                  {part.text}
                                </span>;
                          })}
                        </li>
                      )
                    }
                    return <span key={i} style={{ display: 'none' }}></span>
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </MenuItem>
    );
  } else if (suggestion._type === 'users') {
    const matchesUsername = match(suggestion._source.username, query);
    const partsUsername = parse(suggestion._source.username, matchesUsername);

    const matchesName = match(suggestion._source.name, query);
    const partsName = parse(suggestion._source.name, matchesName);

    return (
      <MenuItem
        selected={isHighlighted}
        style={{ height: 'auto' }}
        component="div"
      >
        <div>
          <img
            src={suggestion._source.avatar}
            style={{
              height: '40px',
              marginRight: '10px',
              width: '40px',
              verticalAlign: 'text-bottom'
            }}
            alt="search-result"
          />
          <div className='dib'>
            <strong style={{ fontSize: '20px' }}>@</strong>
            {partsUsername.map((part, index) => {
              return part.highlight
                ? <span key={index} style={{ fontSize: '20px', color: '#2196F3' }}>
                    {part.text}
                  </span>
                : <strong key={index} style={{ fontSize: '20px' }}>
                    {part.text}
                  </strong>;
            })}
            <div style={{ lineHeight: '16px' }}>
              <span>name: </span>
              <ul className='list dib pa0'>
                <li>
                  {partsName.map((part, index) => {
                    return part.highlight
                      ? <span key={index} style={{ color: '#2196F3' }}>
                          {part.text}
                        </span>
                      : <span key={index}>
                          {part.text}
                        </span>;
                  })}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </MenuItem>
    );
  }
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

const getSuggestionValue = suggestion => {
  if (suggestion._type === 'packages') {
    return suggestion._source.package_name
  } else if (suggestion._type === 'users') {
    return suggestion._source.username
  }
  return suggestion.inputValue
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: '100%'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 5,
    marginTop: '11px',
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
    height: '100%',
    outline: 'none',
    border: 'none',
    background: 'none',
    paddingLeft: '16px'
  },
});

class SearchMain extends Component {
  state = {
    value: '',
    suggestions: [],
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    // if (!value || value.length <= 2) return

    const inputValue = value.trim().toLowerCase();
    client.search({
      index: process.env.ELASTIC_SEARCH_INDEX,
      body: {
        query: {
          query_string: {
            fields : ["package_name^2", "owner_name", "tags.keyword", "username", "name"],
            default_operator: 'AND',
            query: `${inputValue}*`
          },
        },
        sort: [
          {"stars" : {"order" : "desc", "unmapped_type" : "long"}}
       ]
      }
    }).then(body => {
      const hits = body.hits.hits
      // console.log('hits', hits)
      if (hits.length) {
        this.setState({ suggestions: [{ inputValue }, ...hits] })
      } else {
        this.setState({ suggestions: [{ inputValue }] })
      }
    }, error => {
      console.trace(error.message);
    })
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleSuggestionSelected = (event, response) => {
    if (response.suggestion._type === 'packages') {
      const { package_name, owner_name } = response.suggestion._source
      this.props.history.push(`/${owner_name}/${package_name}`)
    } else if (response.suggestion._type === 'users') {
      const { username } = response.suggestion._source
      this.props.history.push(`/@${username}`)
    } else {
      const query = response.suggestion.inputValue.replace(/\s/g, '+')
      this.props.history.push(`/search?q=${query}`)
    }
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  render() {
    const { classes, id, placeholder } = this.props;

    return (
      <div
        id={id}
        style={{ height: '100%' }}
      >
        <Autosuggest
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderInputComponent={renderInput}
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          onSuggestionSelected={this.handleSuggestionSelected}
          renderSuggestionsContainer={renderSuggestionsContainer}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          focusInputOnSuggestionClick={false}
          highlightFirstSuggestion
          inputProps={{
            autoFocus: true,
            placeholder: placeholder ? placeholder : '',
            classes,
            value: this.state.value,
            onChange: this.handleChange
          }}
        />
      </div>
    );
  }
}

SearchMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

SearchMain.defaultProps = {
  id: 'SearchMain'
}

export default withRouter(withStyles(styles)(SearchMain));
