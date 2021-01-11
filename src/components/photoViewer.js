import React, { useReducer, useContext } from 'react';
import { useFetchImageDetail } from '../customHooks'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import Context from '../context'

function PhotoViewer(props) {

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

    const { index, isOpened, setIndex, setOpened } = useContext(
        Context
    );

    const [currentImage, imageDetailDispatch] = useReducer(imageDetailReducer, { imageDetail: {}, fetching: false })
    useFetchImageDetail(props.imgData.images[index] ? props.imgData.images[index].id : null, imageDetailDispatch);


    return (
        <div>
            {isOpened && (
                <Lightbox
                    imageTitle={!currentImage.fetching ? 'Autor: ' + currentImage.imageDetail.author + ', Camera Model: ' + currentImage.imageDetail.camera : ''}
                    imageCaption={!currentImage.fetching ? currentImage.imageDetail.tags : ''}
                    mainSrc={!currentImage.fetching ? currentImage.imageDetail.full_picture : ''}
                    nextSrc={props.imgData.images[(index + 1) % props.imgData.images.length].cropped_picture}
                    prevSrc={props.imgData.images[(index + props.imgData.images.length - 1) % props.imgData.images.length].cropped_picture}
                    onCloseRequest={() => setOpened(false)}
                    onMovePrevRequest={() => setIndex((index + props.imgData.images.length - 1) % props.imgData.images.length)}
                    onMoveNextRequest={() => setIndex((index + 1) % props.imgData.images.length)}
                    toolbarButtons={[
                        <WhatsappShareButton url={props.imgData.images[index].full_picture} children={<WhatsappIcon size={32} round={true} />} />
                    ]}
                />
            )}
        </div>
    );
}
export default PhotoViewer;
