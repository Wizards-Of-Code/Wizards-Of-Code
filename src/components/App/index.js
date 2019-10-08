import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navigation from '../Navigation'
import GameStage from '../gamestage'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
import AccountPage from '../Account'
import AdminPage from '../Admin'
import * as ROUTES from '../../constants/routes'
import {withAuthentication} from '../Session'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: [],
      battles: [],
      problems: [],
      problem: [],
      skills: [],
      userCode: '',
      result: ''
    }
    this.login = this.login.bind(this)
    this.getProblem = this.getProblem.bind(this)
    this.updateCode = this.updateCode.bind(this)
    this.submitCode = this.submitCode.bind(this)

  }

  login(userId) {
    let userRef = this.props.firebase.user(userId)
    userRef.get().then(user => this.setState({user: user.data()}))
    userRef.onSnapshot(snapshot => {
      console.log('SNAPSHOT', snapshot)
    })
  }
  getProblem(problemId) {
    const problemRef = this.props.firebase.problem(problemId)
    problemRef.get().then(problem => this.setState({problem: problem.data()}))
  }

  updateCode = function(event) {
    this.setState({
      userCode: event
    })
  }

  submitCode = function(code, inputs) {
    const webWorker = new Worker('webWorker.js')

    webWorker.postMessage({
      inputs: inputs,
      userFunction: code
    })

    const timeoutId = setTimeout(() => {
      this.setState({result: 'Your function failed!  :('})
      webWorker.terminate()
    }, 5000)

    webWorker.onmessage = (event)=> {
      this.setState({result: event.data})
      webWorker.terminate()
      clearTimeout(timeoutId)
    }
  }

  render() {
    return (
      <Router>
        <div className='container'>
          <Navigation />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route
            path={ROUTES.SIGN_UP}
            render={props => <SignUpPage {...props} login={this.login} />}
          />
          <Route
            path={ROUTES.SIGN_IN}
            render={props => <SignInPage {...props} login={this.login} />}
          />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route
            path={ROUTES.HOME}
            render={props => <HomePage {...props} user={this.state.user} />}
          />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route
            path={ROUTES.GAMESTAGE}
            render={props => (
              <GameStage
                {...props}
                problem={this.state.problem}
                getProblem={this.getProblem}
                userCode={this.state.userCode}
                updateCode={this.updateCode}
                result={this.state.result}
                submitCode={this.submitCode}
              />
            )}
          />
        </div>
      </Router>
    )
  }
}

export default withAuthentication(App)
