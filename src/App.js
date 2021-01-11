import React, { useReducer, useRef, useState } from 'react';
import { useFetch, useInfiniteScroll, useLazyLoading, useFetchImageDetail } from './customHooks'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { WhatsappShareButton, WhatsappIcon } from "react-share";


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

  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + 1 }
      default:
        return state;
    }
  }

  const imageDetailReducer = (state, action) => {
    switch (action.type) {
      case 'SET_IMAGE_DETAIL':
        return { ...state, imageDetail: action.imageDetail }
      case 'FETCHING_IMAGE_DETAIL':
        return { ...state, fetching: action.fetching }
      default:
        return state;
    }
  }

  const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true })
  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 })
  const [currentImage, imageDetailDispatch] = useReducer(imageDetailReducer, { imageDetail: {}, fetching: false })

  const [photoIndex, setIndex] = useState(0);
  const [isOpen, setOpened] = useState(false);


  let bottomBoundaryRef = useRef(null);
  useFetch(pager, imgDispatch);
  useLazyLoading('.card-img-top', imgData.images);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);
  useFetchImageDetail(imgData.images[photoIndex] ? imgData.images[photoIndex].id : null, imageDetailDispatch)

  return (
    <div className="">
      {isOpen && (
        <Lightbox
          imageTitle={!currentImage.fetching ? 'Autor: ' + currentImage.imageDetail.author + ', Camera Model: ' + currentImage.imageDetail.camera : ''}
          imageCaption={!currentImage.fetching ? currentImage.imageDetail.tags : ''}
          mainSrc={!currentImage.fetching ? currentImage.imageDetail.full_picture : ''}
          nextSrc={imgData.images[(photoIndex + 1) % imgData.images.length].cropped_picture}
          prevSrc={imgData.images[(photoIndex + imgData.images.length - 1) % imgData.images.length].cropped_picture}
          onCloseRequest={() => setOpened(false)}
          onMovePrevRequest={() => setIndex((photoIndex + imgData.images.length - 1) % imgData.images.length)}
          onMoveNextRequest={() => setIndex((photoIndex + 1) % imgData.images.length)}
          toolbarButtons={[
            <WhatsappShareButton url={imgData.images[photoIndex].cropped_picture} children={<WhatsappIcon size={32} round={true} />} />
          ]}
        />
      )}
      <nav className="navbar bg-light">
        <div className="container">
          <a className="navbar-brand" href="/#">
            <h2>Image Grid</h2>
          </a>
        </div>
      </nav>
      <div id='images' className="container">
        <div className="row">
          {imgData.images.map((image, index) => {
            return (
              <div key={index} className="card">
                <div className="card-body ">
                  <img
                    data-src={image.cropped_picture}
                    className="card-img-top"
                    src={'https://res.cloudinary.com/codier/image/upload/c_scale,w_235/jqxbwxmnrkjq0mxhnvjn'}
                    onClick={() => { setOpened(true); setIndex(index) }}
                  />
                </div>
              </div>
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
export default App;
