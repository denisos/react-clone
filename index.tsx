// our own custom react render and useState() hooks implementation
// part 1 of React is create the virtual Dom
//  the virtual Dom is an object with children i.e. a tree
// part 2 is to render that virtual dom tree i.e. add it to the dom
//

let React = {
  // babel parses the jsx and calls createElements for each, passing args: tag, props and children
  //  children could be just text or another element
  //  tag is the tag e.g. "div" OR could be function as in functional component
  // this is basically creating the virtual dom tree
  //
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      // console.log("createElement calling function")
      return tag(props)
    }

    // create an element object
    const element = { tag, props: { ...props, children }}
    console.log("createElement ", element)
    return element;
  }
}

const rerender = () => {
  calls = -1;  // reset states used by useState
  console.log("rerender states: ", states)
  
  // clear dome then rerender
  document.getElementById("app").firstChild.remove();
  render(<App />, document.getElementById("app"));
}


// Ryan Florence "build you own crappy useState hook": 
//  https://www.youtube.com/watch?v=1jWS7cCuUXw
// after first useState call, states = [ [ 5, fn] ]
// after second useState call, states = [ [ 5, fn], [null, fn] ]
// if called on rerenders then check if already exists and if so just return it
//   note: missing lots of code e.g. expiring and removing states
// hook must be called in exact same order unconditionally because react is tracking
//  useState by call count, i.e. when it was called, an index into a list. So if you 
//  don't keep same order you'll get the wrong state tuple.
//
const states = [];   // keep track of states
let calls = -1;

const useState = (defaultValue) => {
  const callId = ++calls;

  // because component is rerendered and call useState multiple times. then make 
  //  sure to only create same useState once
  if (states[callId]) {
    return states[callId];
  }

  const setValue = (newValue) => {
    // find the place for this useState tuple, set the new value
    states[callId][0] = newValue;
    
    // rerender the component to display new state
    rerender();
  }

  const tuple = [defaultValue, setValue];
  states[callId] = tuple;
  return tuple;
}


const App = () => {
  const [name, setName] = useState("person");
  const [error, setError] = useState(null);

  return (
  <div className="my-class">
    <h1>hello, {name}!</h1>

    <input type="text" placeholder="name" onchange={e=>setName(e.target.value)} />

    <p>lorum ipsum gypsum</p>
  </div>
)};

const render = (reactElementOrStringOrNumber, container) => {
  if (['string', 'number'].includes(typeof reactElementOrStringOrNumber)) {
    // console.log("render called for string or number ", reactElementOrStringOrNumber);
    container.appendChild(
      document.createTextNode(String(reactElementOrStringOrNumber))
    );
    return;
  }

  // console.log("render called for element", reactElementOrStringOrNumber);
  const actualDomElement = document.createElement(reactElementOrStringOrNumber.tag);
  if (reactElementOrStringOrNumber.props) {
    Object.keys(reactElementOrStringOrNumber.props)
      .filter(p => p !== 'children')
      .forEach(p => actualDomElement[p] = reactElementOrStringOrNumber.props[p]);
  }

  if (reactElementOrStringOrNumber.props.children) {
    reactElementOrStringOrNumber.props.children.forEach(child => render(child, actualDomElement));
  }

  container.appendChild(actualDomElement);
}


render(<App />, document.getElementById("app"));



// incomplete implementation of Tejas useState
/*
const useStateOrig = (initialState) => {
  let state = initialState;
  let setState = (newState) => {
    console.log("setState called with ", newState);
    state = newState;
    rerender();
  };

  return [state, setState];
}
*/
