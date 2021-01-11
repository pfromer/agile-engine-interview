import React, { useReducer, useRef, useContext } from 'react';
import useFetch from '../customHooks/useFetch'
import useInfiniteScroll from '../customHooks/useInfiniteScroll'
import useLazyLoading from '../customHooks/useLazyLoading'
import 'react-image-lightbox/style.css';
import Context from '../context'
import '../index.css';

function Grid() {

    const pageReducer = (state, action) => {
        switch (action.type) {
            case 'ADVANCE_PAGE':
                return { ...state, page: state.page + 1 }
            default:
                return state;
        }
    }

    const { setIndex, setOpened, imgData, imgDispatch } = useContext(
        Context
    );

    const images = imgData.images;

    const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });
    let bottomBoundaryRef = useRef(null);
    useFetch(pager, imgDispatch);
    useLazyLoading('.card-img-top', images);
    useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

    return (
        <div>
            <nav className="navbar bg-light">
                <div className="container">
                    <h2>Gallery</h2>
                </div>
            </nav>
            <div className="container">
                <div id='images' className="image-grid">
                    {images.map((image, index) => {
                        return (
                            <img
                                key={index}
                                data-src={image.cropped_picture}
                                className="card-img-top"
                                src={''}
                                onClick={() => { setIndex(index); setOpened(true); }}
                            />
                        )
                    })}
                </div>
            </div>
            {imgData.fetching && (
                <div className="text-center bg-secondary m-auto p-3">
                    <p className="m-0 text-white">Getting images</p>
                </div>
            )}
            <div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div>
        </div>
    );
}
export default Grid;
