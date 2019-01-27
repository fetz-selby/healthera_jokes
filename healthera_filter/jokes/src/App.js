import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import LeftSideBar from './components/sidebars/left';
// import RightSideBar from './components/sidebar/right';
import LocationContainer from './containers/location/LocationContainer';
import Overlay from './components/overlay';
import Login from './components/login';
import LocationInfo from './components/location-info';
import * as appAction from './store/actions/app/appActionCreators';
import * as tagAction from './store/actions/tags/tagActionCreators';
import * as jokeAction from './store/actions/jokes/jokeActionCreators';

import './assets/styles/layout.css';
import './assets/styles/reset.css';
import Dialog from './components/dialog';
import ErrorInfo from './components/error';

class App extends Component {

  showLoginOverlay=(users=[])=>
    <Overlay showHeader={false}>
      <Login onLoginClicked={this.onLoginClickedHandler} users={users}/>
    </Overlay>

  showConfirmOverlay=(message, id)=>
    <Overlay showHeader={true} onHide={this.hideDeleteDialogHandler}>
       <Dialog id={id} 
               message={message}
               onContinue={this.onDeleteContinueClickedHandler}
               onCancel={this.onDeleteCancelClickHandler}/>
    </Overlay>

  showNetworkErrorOverlay = (message) =>
    <Overlay>
      <ErrorInfo message={message}
                 onCancel={this.onErrorCancel}></ErrorInfo>
    </Overlay>

  tagWidgetClickHandler=(id)=>{
    //Fetch all joke with tagId
    console.log('tagId => '+id);
    this.props.loadJokes(id);
  }

  render() {
    const {tags, token, username} = this.props;

    return  <div>
              {token.length ? '' : this.showLoginOverlay()}
              {/* {networkError ? this.showNetworkErrorOverlay(networkErrorMessage) : ''} */}
              {/* {this.showLoginOverlay()} */}

              <LeftSideBar tags={tags} 
                       showSideBar={true} 
                       onSearchChange={this.onSearchChangeHandler}
                       tagWidgetClick={this.tagWidgetClickHandler}
                       onAddClicked={this.onAddClickedHandler}
                       username={username} 
                       onLogout={this.onLogoutHandler}/>
              <div className='content'>
                <Router>
                  <div>   
                    <Route path='/' exact component={LocationContainer}/> 
                  </div>
                </Router>
              </div>
              {/* <RightSideBar 
                      showSideBar={rightSideBarToggle} 
                      fetchAddressSuggestion={this.fetchAddressSuggestion}
                      clearAddressSuggestion={this.clearAddressSuggestion}
                      addressSuggestions={addressSuggestions}
                      isUpdate={locationUpdate}
                      location={location}
                      currentLocationState={this.currentLocationState}
                      onClose={this.onCloseRightSideBar}
                      isNewDetail={isNewDetail}
                      onUpdate={this.onUpdateClickedHandler}
                      onDelete={this.onDeleteClickedHandler}
              /> */}
          </div>
  }
}

const mapStateToProps = state =>{
  return {
     token : state.app.token,
     tags: state.tags.tags,
     username: state.app.name
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    loadTags: ()=> dispatch(tagAction.fetchAllTags()),
    loadJokes: (tagId)=>dispatch(jokeAction.fetchJokesWithTag(tagId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);