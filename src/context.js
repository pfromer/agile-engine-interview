import React from 'react';

const Context = React.createContext({
    index: null,
    isOpened: false,
    setIndex: null,
    setOpened: null,
    imgData: null,
    imgDispatch: null
});

export default Context;