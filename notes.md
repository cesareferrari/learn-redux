# Redux

Video: https://youtu.be/a5PYedGVDBY?t=5952




Redux is an application store.
state management library

Redux is application level state, so we can affect the state of the application
from any component anywhere and it gets replicated out wherever it needs to be
replicated out.

In our application we will be updating the title based on the application level
state, from the Redux store.

Redux and component level state can coexhist.
There are some things where component level state makes sense, if it affects
only the component.

To start with Redux we need to install the dependencies:

```
npm i react-redux redux
```

Then we import createStore in the index.js file. We use createStore to create a store. 


```
// index.js

import { createStore } from 'redux';
```

We create a store by declaring a const store and assigning it to the createStore
function and passing in a reducer.

```
// index.js

const store = createStore(reducer);
```

A reducer is just a function that returns a state tree (an object)
Note: we need to define this function before we pass it to createStore.

```
// index.js

const reducer = () => {
  return {
    title: "This is the title from redux store"
  }
}
```




Redux is not just for React, you can use Redux in any Javascript application. 
To use it with React we use the react-redux library.

We import a Provider form react-redux and we wrap the whole application with it.
We pass the store we have created to Provider as a prop.

```
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
```




>>>>>>>>> Material for articles below






Connecting to redux from a component.

If a component needs to use the state in Redux, we need to connect it to Redux
by importing the connect function from react-redux:

```
// Title.js

import { connect } from 'react-redux';
```

We then use connect to wrap the component at the bottom of the file.

connect is a function that takes a function and an object. 
connect returns another function that we call again wrapping the component that we need to connect to the store. 
Below is the basic structure:


```
// Title.js

export default connect(
  () => {},
  {}
)(Title);
```

connect is a function that returns a function that takes a component and returns
a component.
So, connect is a higher order component, takes a component and returns a
component.

The React system will pass to the first function taken by connect the
application level state.
This function returns an object that maps a property on the Title component to the state.title property in the application level state.
We have created the application level state.title in index.js, in the reducer
function that was defined there.

When we change the state.title property, the React system lets Title know that
the property has changed and titleOnProps reflects that change, because it's
mapped to it.


```
export default connect(
  (state) => {
    console.log(state)
    return {
      titleOnProps: state.title
    }
  },
  {}
)(Title);
```

We can break up the function that maps the state to the props into another
function, called mapStateToProps that takes the state and returns the mapping
object and then pass this into connect in place of the first argument.

The code below is the same as the code above, but with the function separated.

```
const mapStateToProps = state => {
  console.log(state)
  return {
    titleOnProps: state.title
  }
}

export default connect(
  mapStateToProps,
  {}
)(Title);
```

Now in the Title component we can use the titleOnProps prop that is mapped to
the application state.title


```
<h1>{this.props.titleOnProps}</h1>
```

## Actions

We update the application level state through `actions`

Inside src, create an actions directory with a file called index.js in it.

What we deal inside this file is with action creators. An action creator is a
function that creates an action for us.

We create an updateTitle action creator. This function takes an argument, title.
We need to export this function so it can be imported in the next step.

The action must return an object that has a type and a payload. Type is
mandatory. Payload is optional.
In our case the payload is the title.

Note that for the type we create a const that has as the value the string of the
type and we export this const.
Now in any place where we want to reference the UPDATE_TITLE type we can import
that from this file and this should prevent bugs.


```
// src/actions/index.js

export const UPDATE_TITLE = 'UPDATE_TITLE';

export const updateTitle = title => {
  console.log(title);

  return {
    type: UPDATE_TITLE,
    payload: title
  }
}
```


Once we have created the action creator, we import it in Title

```
// components/Title.js

import { updateTitle } from '../actions';
```

Note that since updateTitle is defined inside src/actions/index.js we can just
leave index.js out of the import statement and just list the directory and it
will look into an index.js file automatically, so we don't have to specify the
exact file because indes.js is the default

This updateTitle action is used inside the object that is the second parameter in the `connect` function, at the bottom of Title.js

It's important to note that the action creator updateTitle is not used by Title,
it's only used in the connect function.

Title (the component) can only use updateTitle from the props like in this
statement:

```
this.props.updateTitle(this.state.newTitleText)
```

We cannot use it like this:

```
// Wrong!!
this.updateTitle(this.state.newTitleText)
```


```
// Title.js

export default connect(
  mapStateToProps,
  { updateTitle }
)(Title);
```

Note the syntax inside the object: { updateTitle }, if it's a variable inside an
object it will set the variable name as the key and the variable value as the
value, so it's the same as { updateTitle: updateTitle }


To handle the update title when pressing the button we need to create a handle
function inside Title.js that calls updateTitle, the action creator we just
added, and passes in the new title text in the state.


```
// Title.js

  handleUpdateTitle = e => {
    e.preventDefault();
    this.props.updateTitle(this.state.newTitleText)
  }
```

Remember, the new title text in the state was updated by handleChange:

```
// Title.js

  state = {
    newTitleText: ''
  }

  handleChanges = e => {
    this.setState({[e.target.name]: e.target.value});
  }
```

We need to add an onClick event to the button, pointing to the handleUpdateTitle
function.

```
<button onClick={this.handleUpdateTitle}>Update title</button>
```


## Reducer

A reducer is what changes the state. In our example so far the reducer is
returning an object with a hardcoded string:

```
// index.js

const reducer = () => {
  return {
    title: "This is the title from redux store"
  }
}
```

So it's never changing the state.

To make the reducer work, we need to create a directory inside src, called
reducers and add an index.js file in it. This file will have the reducer.

Move the reducer that was in the index into the reducer file and export at the
end..

```
// src/reducers/index.js

const reducer = () => {
  return {
    title: "This is the title from redux store"
  }
}

export default reducer;
```

Since we are referencing the reducer in index.js we need to import it.

```
// index.js

import reducer from './reducers';
```

The reducer since it's going to change the state needs to know about the
existing state and about the action that we use to modify the state, so we pass state and action into it as arguments.

We also create a const for the initial application state and we set the state argument to this initial state, so if the state is not defined, it defaults to the initial state.

```
// src/reducers/index.js

const initialState = {
  title: "Title from the initial Redux store"
}

const reducer = (state = initialState, action) => {
  return {
    ...state
    title: "This is the title from redux store"
  }
}
```

Reducer will be called with actions that they don't care about, so we make
switch statement inside the reducer based on the action type that is passed in.

The default would be to return the current state, so there are no changes to the
state but the reducer needs to return state, so we set it up to return the state
that was passed in without modifications..

```
// reducers/index.js

const reducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}
```

Since we are going to use the actions we need to import the action names in our
reducer file:

```
// reducers/index.js

import { UPDATE_TITLE } from '../actions';
```

The reason whey we put UPDATE_FILE inside curly braces when we import is because
we don't have a default export in actions/index.js so we need to use curly
braces when we import. This is part of the Javascript module import/export
system.


The reducer returns an object that represent the new state, based on the action
passed in, so we switch on the action type and in case of UPDATE_TITLE action we
return an object that has the current state with a change on the title property.
The change will be in the action.payload so we assign action.payload to the
state.

```
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_TITLE: {
      return {
        ...state,
        title: action.payload
      }
    }
    default:
      return state
  }
}
```

So, the reducer returns the entire state of the application with one change to
it based on the action that is being called.
If there are no actions that have changes, then the reducer returns the whole state unchanged.



## Error
I am getting this error when I add ... to state here:

```
    case UPDATE_TITLE: {
      return {
        ...state,
        title: action.payload
      }
    }

```

The error doesn't appear if I don't add ...

This is the error:

```
Failed to compile.

./src/reducers/index.js
Module not found: Can't resolve
'/Users/estelle/code/react/learn-redux/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty'
in '/Users/estelle/code/react/learn-redux/src/reducers'
```

It appears it's something related to babel.

Found this solution: downgrade babel
https://github.com/creativetimofficial/ct-material-dashboard-pro-react/issues/62

```
npm install --save-exact @babel/runtime@7.0.0-beta.55
```

It seemed to work, but after it stopped working again for a reason I don't know.

I deleted the node_modules folder and there was a yarn.lock file that I don't
know why it was in there, since I didn't use yarn. I removed that as well.

I reinstalled the modules and now it's working fine.

Not sure what happened.
---





