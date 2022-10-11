//Program that gets data from Gitlabs and Github apis and displays to the user the result from the users search input

import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { loaded: false, hubloaded: false, labloaded: false, github: [], gitlab: [], labrepo: [], hubrepo: [], labrepobtn: false, hubrepobtn: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getHubRepo = this.getHubRepo.bind(this);
    this.getLabRepo = this.getLabRepo.bind(this);
    this.labVisibility = this.labVisibility.bind(this);
    this.hubVisibility = this.hubVisibility.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset () {
    this.setState({ loaded: false, hubloaded: false, labloaded: false, github: [], gitlab: [], labrepo: [], hubrepo: [], labrepobtn: false, hubrepobtn: false });
  }

  labVisibility (){
    this.setState(prevState => ({ labrepobtn: !prevState.labrepobtn, labloaded: false }));
  }

  hubVisibility (){
    this.setState(prevState => ({ hubrepobtn: !prevState.hubrepobtn, hubloaded: false }));
  }

  getLabRepo (e)
  //function gets the repos from a gitlab user onclick of a button from a submit form
  {
    e.preventDefault();
    const userid = e.target.repokey.value;
    //gets the value from the form and passes it in the fetch method as an url query
    fetch(`/labrepos?login=${userid}`).then(res => res.json()).then(data => { 
      this.setState({ labrepo: data });
      console.log(data);

      if (this.state.labrepo)
        this.setState({ labloaded: true });
    });
  }

  getHubRepo (e)
  //function gets the repos from a github user onclick of a button from a submit form
  {
    e.preventDefault();
    const username = e.target.repo.value;
    //gets the value from the form and passes it in the fetch method as an url query
    fetch(`/hubrepos?login=${username}`).then(res => res.json()).then(data => {
      this.setState({ hubrepo: data });
      console.log(data);

      if (this.state.hubrepo)
        this.setState({ hubloaded: true });
    });
  }

  handleSubmit (e)
  //handles submit for form that takes user search input to retrieve data from the api
  {
    e.preventDefault();
    const alias = e.target.username.value;
    fetch(`/user?username=${alias}`).then(res => res.json()).then(data => {
      this.setState({ loaded: true, gitlab: data[1], github: data[0] });
      //after the fetch api is executed, the data from the fetch method is split in 2 for data from the 2 VCS used in this program: Github, Gitlab
    });
  }
  
  render ()
  {
    if (!this.state.loaded)
    {
      return (
        <div className='App'>
          <form action='' method='GET' onSubmit={ this.handleSubmit }>
            <label>Enter username: </label>
            <input type='text' name='username'></input>
            <input type='submit'></input>
          </form>

          <img src={logo}  className="App-logo" alt="" />
        </div>
      )
    }
    else
    {
      return (
        <div>

          <div className='row'>

            <div className='column'>
              {this.state.gitlab.map((user, index) => 
                  <pre key={index}>
                    <p>{ user.name }</p>
                    <img src={ user.avatar_url } alt='' />
                    <br />
                    <a href={ user.web_url }>Gitlab profile</a>

                    <form onSubmit={ this.getLabRepo }>
                      <button name='repokey' value={ user.id } onClick={ this.labVisibility }>Get Repos</button>
                    </form>
                  </pre>
                )
              }

              { this.state.labloaded ? 
                <div>
                  {this.state.labrepobtn &&
                    <div>
                      {this.state.labrepo.map((repo, index) =>
                          <div key={index}>
                            <h3>Description: { repo.description }</h3>
                            <p>Creation date: { repo.created_at }</p>
                            <p>Last commit date: { repo.last_activity_at }</p>
                          </div>
                        )
                      }
                    </div>
                  }
                </div>
                 : <img src={logo}  className="App-logo" alt="" /> }
            </div>

            <div className='column'>
              <form action='' method='GET' onSubmit={ this.handleSubmit }>
                <label>Enter username: </label>
                <input type='text' name='username'></input>
                <input type='submit'></input>
              </form>
              <button onClick={ this.reset }>Reset</button>
            </div>

            <div className='column'>
              {this.state.github &&
                <pre>
                  <p>{ this.state.github.name }</p>
                  <img src={ this.state.github.avatar_url } alt='' />
                  <br />
                  <a href={ this.state.github.html_url }>Github profile</a>

                  <form onSubmit={ this.getHubRepo }>
                    <button name='repo' value={ this.state.github.login } onClick={ this.hubVisibility }>Get Repos</button>
                  </form>
                </pre>
              }

              {this.state.hubloaded ?
                <div>
                  {this.state.hubrepobtn &&
                    <div>
                      {this.state.hubrepo.map((hub, index) =>
                          <div key={index}>
                            <h3>Description: { hub.description }</h3>
                            <p>Creation date: { hub.created_at }</p>
                            <p>Language: { hub.language }</p>
                            <p>Commit date: { hub.pushed_at }</p>
                            <p>Last commit: { hub.updated_at }</p>
                          </div>
                        )
                      }
                    </div>
                  }
                </div>
                 : <img src={logo}  className="App-logo" alt="" /> }
            </div>

          </div>

        </div>
      );
    }
  }
}

export default App;
