import React, { useReducer, useState } from 'react';
import Grid from './components/grid'
import PhotoViewer from './components/photoViewer'
import Context from './context'

import './index.css';

function App() {
  const imgReducer = (state, action) => {
    switch (action.type) {
      case 'STACK_IMAGES':
        return { ...state, images: state.images.concat(action.images) }
      case 'FETCHING_IMAGES':
        return { ...state, fetching: action.fetching }
      default:
        return state;
    }
  }

  const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true })
  const [index, setIndex] = useState(0);
  const [isOpened, setOpened] = useState(false);

  return (
    <Context.Provider
      value={{ index, isOpened, setIndex, setOpened }}
    >
      <Grid
        imgData={imgData}
        imgDispatch={imgDispatch}
      />
      <PhotoViewer
        imgData={imgData}
      />
    </Context.Provider>
  );
}
export default App;
