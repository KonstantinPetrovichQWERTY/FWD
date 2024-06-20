document.addEventListener("DOMContentLoaded", function() {
    // Add any JavaScript you need here
    console.log("Portfolio page loaded");
});

// Define the email address to be sent as a query parameter
const email = 's.katkov@innopolis.university'; 

// Construct the URL with the query parameter
const params = new URLSearchParams({ email: email });
const url = `https://fwd.innopolis.university/api/hw2?${params.toString()}`;

// Use the Fetch API to send the request
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(id => {
        const comicParams = new URLSearchParams({ id: id });

        // Construct the URL to fetch the comic details
        const comicUrl = `https://fwd.innopolis.university/api/comic?${comicParams.toString()}`;

        return fetch(comicUrl);
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(comicData => {
        // Display the comic image, title, date, and text
        const comicContainer = document.createElement('section');

        const comicHeader = document.createElement('h2');
        comicHeader.className = 'comic-header';
        comicHeader.textContent = 'XKCD';
        comicContainer.appendChild(comicHeader);
        
        const comicImage = document.createElement('img');
        comicImage.className = 'comic-image';
        comicImage.src = comicData.img;
        comicImage.alt = comicData.alt;
        comicContainer.appendChild(comicImage);

        const comicTitle = document.createElement('p');
        comicTitle.className = 'comic-title';
        comicTitle.textContent = comicData.safe_title;
        comicContainer.appendChild(comicTitle);

        const comicDate = document.createElement('p');
        comicDate.className = 'comic-date';
        const date = new Date(comicData.year, comicData.month - 1, comicData.day);
        comicDate.textContent = `Published on: ${date.toLocaleDateString()}`;
        comicContainer.appendChild(comicDate);

        const comicAlt = document.createElement('p');
        comicAlt.className = 'comic-alt';
        comicAlt.textContent = `Alt text: ${comicData.alt}`;
        comicContainer.appendChild(comicAlt);

        
        const contact = document.getElementById('contact');
        document.body.insertBefore(comicContainer, contact);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch operations
        console.error('There was a problem with the fetch operation:', error);
    });
