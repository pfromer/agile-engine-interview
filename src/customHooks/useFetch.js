import { useEffect } from 'react';

import { _fetch } from '../ApiCaller'

const useFetch = (data, dispatch) => {
    useEffect(() => {
        dispatch({ type: 'FETCHING_IMAGES', fetching: true });
        _fetch('http://interview.agileengine.com/images?page=' + data.page)
            .then(res => {
                var pictures = res.body.pictures;
                dispatch({ type: 'STACK_IMAGES', images: pictures });
                dispatch({ type: 'FETCHING_IMAGES', fetching: false });
            })
            .catch(e => {
                dispatch({ type: 'FETCHING_IMAGES', fetching: false });
                return e;
            })
    }, [dispatch, data.page])
}

export default useFetch;