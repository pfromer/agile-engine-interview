import React, { useReducer, useRef, useContext } from 'react';
import { useFetch, useInfiniteScroll, useLazyLoading, useFetchImageDetail } from '../customHooks'
import 'react-image-lightbox/style.css';
import Context from '../context'


import '../index.css';

function Grid(props) {//imgData, imgDispatch

    const pageReducer = (state, action) => {
        switch (action.type) {
            case 'ADVANCE_PAGE':
                return { ...state, page: state.page + 1 }
            default:
                return state;
        }
    }

    const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 })

    let bottomBoundaryRef = useRef(null);
    useFetch(pager, props.imgDispatch);
    useLazyLoading('.card-img-top', props.imgData.images);
    useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

    const { setIndex, setOpened } = useContext(
        Context
    );

    return (
        <div className="">
            <nav className="navbar bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/#">
                        <h2>Image Grid</h2>
                    </a>
                </div>
            </nav>
            <div id='images' className="container">
                <div className="row">
                    {props.imgData.images.map((image, index) => {
                        return (
                            <div key={index} className="card">
                                <div className="card-body ">
                                    <img
                                        data-src={image.cropped_picture}
                                        className="card-img-top"
                                        src={'https://res.cloudinary.com/codier/image/upload/c_scale,w_235/jqxbwxmnrkjq0mxhnvjn'}
                                        onClick={() => { setIndex(index); setOpened(true); }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {props.imgData.fetching && (
                <div className="text-center bg-secondary m-auto p-3">
                    <p className="m-0 text-white">Getting images</p>
                </div>
            )}
            <div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div>
        </div>
    );


}
export default Grid;
