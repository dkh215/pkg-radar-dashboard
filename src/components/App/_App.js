import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme  } from 'material-ui/styles'
// import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { blueGrey } from 'material-ui/colors'
import { Route } from 'react-router-dom'
import Intercom from 'react-intercom';

import { Header } from '../Header'
import { Main } from '../Main'
import { GithubAuth } from '../Users'
// import { Footer } from '../Footer'
// import { Loader } from '../Shared'

import CURRENT_USER from '../../queries/currentUser'

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
  },
  overrides: {
    MuiAppBar: {
      colorDefault: {
        backgroundColor: 'white'
      },
      colorPrimary: {
        backgroundColor: '#1b2327'
      },
    },
    MuiButton: {
      raised: {
        backgroundColor: 'white'
      },
      raisedPrimary: {
        backgroundColor: blueGrey[900]
      }
    }
  },
});


class App extends Component {
  state = {
    isLoading: false
  };

  componentWillMount() {
   this.props.history.listen(() => {
     window.Intercom("update");
   })
  }

  githubAuth = () => {
    const clientId = '1050d5bcb642ab0beb2e'
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientId}`
  }

  render() {
    const { data, location } = this.props;
    const isUserAuthenticating = location.pathname.includes('github')
    let currentUser = '', isUserLoading = false

    if (data) {
      currentUser =  data.currentUser
      isUserLoading = data.loading
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {
            !isUserAuthenticating &&
            <div>
              <Header
                user={currentUser}
                isUserLoading={isUserLoading}
                githubAuth={this.githubAuth}
              />
              <Main
                isUserLoading={isUserLoading}
                user={currentUser}
              />
            </div>
          }
          <Route exact path="/github/auth" component={GithubAuth} />
          {
            currentUser &&
            <Intercom 
              appId='f0v81ck6'
              user_id={currentUser.id}
              email={currentUser.email}
              name={currentUser.name}
            />
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

const getCurrentUserOptions = {
  options: (props) => {
    return {
      skip: !localStorage.getItem('pkgRadarToken'),
      fetchPolicy: 'network-only',
      variables: {
        username: localStorage.getItem('pkgRadarUsername'),
        token: localStorage.getItem('pkgRadarToken')
      }
    };
  }
};

export default compose(
  graphql(CURRENT_USER, getCurrentUserOptions),
)(withRouter(App));
