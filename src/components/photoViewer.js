import React, { useReducer, useContext } from 'react';
import useFetchImageDetail from '../customHooks/useFetchImageDetail'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import Context from '../context'

function PhotoViewer() {

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

    const { index, isOpened, setIndex, setOpened, imgData } = useContext(
        Context
    );

    const images = imgData.images;

    const [currentImage, imageDetailDispatch] = useReducer(imageDetailReducer, { imageDetail: {}, fetching: false })
    useFetchImageDetail(images[index] ? images[index].id : null, imageDetailDispatch);

    return (
        <div>
            {isOpened && (
                <Lightbox
                    imageTitle={!currentImage.fetching ? 'Autor: ' + currentImage.imageDetail.author + ', Camera Model: ' + currentImage.imageDetail.camera : ''}
                    imageCaption={!currentImage.fetching ? currentImage.imageDetail.tags : ''}
                    mainSrc={!currentImage.fetching ? currentImage.imageDetail.full_picture : ''}
                    nextSrc={images[(index + 1) % images.length].cropped_picture}
                    prevSrc={images[(index + images.length - 1) % images.length].cropped_picture}
                    onCloseRequest={() => setOpened(false)}
                    onMovePrevRequest={() => setIndex((index + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setIndex((index + 1) % images.length)}
                    toolbarButtons={[
                        <WhatsappShareButton url={images[index].full_picture} children={<WhatsappIcon size={32} round={true} />} />
                    ]}
                />
            )}
        </div>
    );
}
export default PhotoViewer;