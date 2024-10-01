const apiDetails = {
    key: "d12447f70e875413282a48b9cbe48257",
    secret: "74f692977dd47736",
    link: "https://api.flickr.com/services/rest?",
};

const mainEl = document.getElementById("main");
const inputEl = document.getElementById('inpt');
const btnEl = document.getElementById('btn');

const createPhotoElement = (photo) => {
    const containerEl = document.createElement('div');
    containerEl.classList.add('photo-container');

    const imgEl = document.createElement('img');
    imgEl.src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
    imgEl.alt = photo.title || 'Flickr Photo';
    containerEl.appendChild(imgEl);

    const downloadBtnEl = document.createElement('button');
    downloadBtnEl.classList.add('download');
    downloadBtnEl.textContent = 'Download';
    downloadBtnEl.onclick = () => {
        window.open(imgEl.src, '_blank');
    };

    containerEl.appendChild(downloadBtnEl);
    return containerEl;
};

const displayPhotos = (data) => {
    mainEl.innerHTML = ''; // Clear previous results
    data.photos.photo.forEach(photo => {
        const photoEl = createPhotoElement(photo);
        mainEl.appendChild(photoEl);
    });
};

const getFetchedData = async (searchInput) => {
    const url = `${apiDetails.link}api_key=${apiDetails.key}&extras=url_h&format=json&method=flickr.photos.search&nojsoncallback=1&page=1&tags=${searchInput}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            console.log(response.status);
            return;
        }

        const data = await response.json();
        
        if (data.photos && data.photos.photo.length > 0) {
            displayPhotos(data);
        } else {
            alert('No photos found for the given search term.');
        }

    } catch (e) {
        console.error('Error:', e);
        alert('An error occurred while fetching the data. Please try again.');
    }
};

btnEl.addEventListener('click', () => {
    const searchContent = inputEl.value.trim();
    if (searchContent) {
        getFetchedData(searchContent);
    } else {
        alert('Please enter a search term.');
    }
});
