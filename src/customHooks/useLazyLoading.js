import { useEffect, useCallback, useRef } from 'react';

const useLazyLoading = (imgSelector, items) => {
    const imgObserver = useCallback(node => {
        const intObs = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.intersectionRatio > 0) {
                    const currentImg = en.target;
                    const newImgSrc = currentImg.dataset.src;
                    if (!newImgSrc) {
                        console.error('Image source is invalid');
                    } else {
                        currentImg.src = newImgSrc;
                    }
                    intObs.unobserve(node);
                }
            });
        })
        intObs.observe(node);
    }, []);
    const imagesRef = useRef(null);
    useEffect(() => {
        imagesRef.current = document.querySelectorAll(imgSelector);
        if (imagesRef.current) {
            imagesRef.current.forEach(img => imgObserver(img));
        }
    }, [imgObserver, imagesRef, imgSelector, items])
}

export default useLazyLoading;