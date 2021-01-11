import { useEffect } from 'react';

import { _fetch } from '../ApiCaller'

const useFetchImageDetail = (imageId, dispatch) => {
    useEffect(() => {
        if (imageId != null) {
            dispatch({ type: 'FETCHING_IMAGE_DETAIL', fetching: true });
            _fetch('http://interview.agileengine.com/images/' + imageId)
                .then(res => {
                    var imageDetail = res.body;
                    console.log(imageDetail)
                    dispatch({ type: 'SET_IMAGE_DETAIL', imageDetail: imageDetail });
                    dispatch({ type: 'FETCHING_IMAGE_DETAIL', fetching: false });
                })
                .catch(e => {
                    dispatch({ type: 'FETCHING_IMAGE_DETAIL', fetching: false });
                    return e;
                })
        }
    }, [dispatch, imageId])
}

export default useFetchImageDetail;