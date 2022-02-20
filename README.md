# react-clone
Build our own react render code and our own custom useState hook

Build following a mix of talks by 
- Tejas Kumar build own React: https://www.youtube.com/watch?v=f2mMOiCSj5c where he demos how to create virtual dom tree and then render it
- and Ryan Florence: https://www.youtube.com/watch?v=1jWS7cCuUXw who creates his own crappy useState hook to manage state

Tejas also creates a useState hook but I wanted to explor Ryans and put both together

## run
`yarn start`

## parcel
Uses [parcel](https://parceljs.org/) "the zero configuration build tool" to bundle and run the code. Pretty interesting, supports many languages and types out of the box and includes own dev server and hot reload. It's pretty cool and used by some big companies.

## babel-plugin-transform-react-jsx
The (babel-plugin-transform-react-jsx)[https://github.com/babel/babel/blob/main/packages/babel-plugin-transform-react-jsx/src/create-plugin.ts] code basically converts JSX Fragments <></> into React.createElement(React.Fragment, null, ...children) calls (see around L603 buildCreateElementFragmentCall())

## other refs
This is also an interesting presentation: https://www.youtube.com/watch?v=8Kc2REHdwnQ
