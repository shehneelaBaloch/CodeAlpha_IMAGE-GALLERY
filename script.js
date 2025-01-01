document.addEventListener('DOMContentLoaded', () => {
    const images = [
        { src: 'images/image1.jpg', category: 'flowers' },
        { src: 'images/image2.jpg', category: 'flowers' },
        { src: 'images/image3.jpg', category: 'girls' },
        { src: 'images/image4.jpg', category: 'nature' },
        { src: 'images/image5.jpg', category: 'nature' },
        { src: 'images/image6.jpg', category: 'nature' },
        { src: 'images/image7.jpg', category: 'girls' },
        { src: 'images/image9.jpg', category: 'girls' },
        { src: 'images/image19.jpg', category: 'girls' },
        { src: 'images/image18.jpg', category: 'girls' },
        { src: 'images/image10.jpg', category: 'flowers' },
        { src: 'images/image12.jpg', category: 'flowers' },
        { src: 'images/image8.jpg', category: 'nature' },
        { src: 'images/image11.jpg', category: 'nature' },
        { src: 'images/image13.jpg', category: 'nature' },
        { src: 'images/image14.jpg', category: 'nature' },
        { src: 'images/image15.jpg', category: 'nature' },
        { src: 'images/image16.jpg', category: 'nature' },
        { src: 'images/image17.jpg', category: 'nature' },
        { src: 'images/image20.jpg', category: 'nature' }
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-gallery-image');
    const closeModal = document.getElementById('close-modal');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let currentIndex = 0;

    const renderImages = (category) => {
        galleryGrid.innerHTML = '';
        const filteredImages = category === 'all' ? images : images.filter(img => img.category === category);
        filteredImages.forEach((img, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            imgElement.dataset.index = images.indexOf(img);
            imgElement.dataset.category = img.category;
            galleryGrid.appendChild(imgElement);
        });
    };

    const openModal = (index) => {
        currentIndex = index;
        modalImage.src = images[currentIndex].src;
        modal.style.display = 'flex';
    };

    const closeModalFn = () => {
        modal.style.display = 'none';
    };

    const updateModalImage = (index) => {
        modalImage.style.opacity = 0;
        setTimeout(() => {
            modalImage.src = images[index].src;
            modalImage.style.opacity = 1;
        }, 300);
    };

    const showPrevImage = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateModalImage(currentIndex);
    };

    const showNextImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateModalImage(currentIndex);
    };

    galleryGrid.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            openModal(parseInt(e.target.dataset.index, 10));
        }
    });

    closeModal.addEventListener('click', closeModalFn);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFn();
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderImages(button.dataset.category);
        });
    });

    renderImages('all');
});
