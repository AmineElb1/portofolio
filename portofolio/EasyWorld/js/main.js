document.addEventListener("DOMContentLoaded", () => {
    const map = L.map('map').setView([51.505, -0.09], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    async function onMapClick(e) {
        try {
            const countryInfo = await getCountryInfo(e.latlng.lat, e.latlng.lng);
                if (countryInfo) {
                    let applyForVisaText = '';
                    if (countryInfo.visaRequired) {
                        applyForVisaText = `<p><strong><a href="visa.html?name=${encodeURIComponent(countryInfo.name)}&photo=${encodeURIComponent(countryInfo.photo)}">Apply for visa</a></strong></p>`;
                    }
                    
                const popupContent = `
                    <div>
                        <h3>${countryInfo.name}</h3>
                        <img class="popup-img" src="${countryInfo.photo}" alt="${countryInfo.name}">
                        <p><strong>Visa Requirement for Belgian Citizens:</strong> ${countryInfo.visaRequired ? 'Yes' : 'No, <br> Youre good to go!'}</p>
                        <p><strong> Passport validity: 90 Days </strong> </p>
                        <p><strong>Safety: </strong> <div style=" width: 30px;
                        height: 30px;
                        background-color: green;
                        border-radius: 50%;"  class="green-circle"></div> </p>
                        
                    </div>
                    ${applyForVisaText}
                `;
                L.popup()
                    .setLatLng(e.latlng)
                    .setContent(popupContent)
                    .openOn(map);
            }
        } catch (error) {
            console.error('Error handling map click:', error);
        }
    }

    map.on('click', onMapClick);

    async function getCountryInfo(lat, lng) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&accept-language=en`);
            const data = await response.json();
            const countryName = data.address.country;
            const additionalInfo = await getCountryInfoFromAPI(countryName);
            return {
                name: countryName,
                photo: additionalInfo.photo,
                visaRequired: getRandomVisaRequirement(countryName) // Gebruik willekeurige waarde voor visum
            };
        } catch (error) {
            console.error('Error fetching country information:', error);
            return null;
        }
    }

    async function getCountryInfoFromAPI(countryName) {
        try {
            const pixabayResponse = await fetch(`https://pixabay.com/api/?key=43979855-fca0b941e2c63b9427ccdb884&q=${encodeURIComponent(countryName)}&image_type=photo`);
            const pixabayData = await pixabayResponse.json();
            const photo = pixabayData.hits.length > 0 ? pixabayData.hits[0].webformatURL : 'https://via.placeholder.com/150';

            return {
                photo: photo,
            };
        } catch (error) {
            console.error('Error fetching additional country information:', error);
            return {
                photo: 'https://via.placeholder.com/150',
            };
        }
    }

    // Functie om willekeurig te bepalen of een visum nodig is
    function getRandomVisaRequirement(countryName) {
        if(countryName === 'Algeria' || countryName === 'Brazil' || countryName === 'China' || countryName === 'India' || countryName === 'Russia' || countryName === 'United States' 
        || countryName === 'Vietnam' || countryName === 'Afghanistan' || countryName === 'Iraq' || countryName === 'Iran' || countryName === 'Syria' || countryName === 'Yemen' || countryName === 'Benin'
        || countryName === 'Burundi' || countryName === 'Cameroon' || countryName === 'Congo' || countryName === 'Djibouti' || countryName === 'Eritrea' || countryName === 'Ethiopia' || countryName === 'Gambia'
        || countryName === 'Ghana' || countryName === 'Guinea' || countryName === 'Guinea-Bissau' || countryName === 'Kenya' || countryName === 'Lesotho' || countryName === 'Liberia' || countryName === 'Libya'
            || countryName === 'Madagascar'|| countryName === 'Mali' || countryName === 'Mauritania' || countryName === 'Mauritius' || countryName === 'Mozambique'
            || countryName === 'New Zealand' || countryName === 'Niger' || countryName === 'Nigeria' || countryName === 'Rwanda' || countryName === 'Senegal' || countryName === 'Sierra Leone' || countryName === 'Somalia') {
            return true;
        } else {
            return false;
      }
    }
});
