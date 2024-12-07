import React, { useState } from 'react';
import './Uttarakhand.css';
import UK1 from "../../components/images/uk1.jpg"
import UK2 from '../../components/images/uk2.jpeg';
import UK3 from '../../components/images/uk3.jpeg';
import UK4 from '../../components/images/uk4.jpeg';

const space = { height: '10px' };

const Uttarakhand = () => {
    const [showMap, setShowMap] = useState(false);
    const [showFullImage, setShowFullImage] = useState(false);
    const [fullImageUrl, setFullImageUrl] = useState('');

    const handleViewMap = () => {
        setShowMap(true);
        loadMapScript();
    };

    const handleImageClick = (imageSrc) => {
        setShowFullImage(true);
        setFullImageUrl(imageSrc);
    };

    const handleCloseImage = () => {
        setShowFullImage(false);
        setFullImageUrl('');
    };

    const loadMapScript = () => {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBA2jxZtJo79PHM87dPShu-ZX2BE6RaWzM&callback=initMap`; // Replace YOUR_API_KEY with your actual Google Maps API key
        googleMapScript.async = true;
        googleMapScript.defer = true;
        window.initMap = initMap;
        document.head.appendChild(googleMapScript);
    };

    const initMap = () => {
        const dehradunLocation = { lat: 30.3165, lng: 78.0322 }; // Coordinates for Dehradun
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: dehradunLocation,
            zoom: 15
        });
        new window.google.maps.Marker({
            position: dehradunLocation,
            map: map,
            title: 'Dehradun'
        });
    };

    return (
        <div className="UK-container">
            <h1>Uttarakhand</h1>
            <div className="UK-info">
                <h3>
                    Uttarakhand, nestled in the Himalayas, is known for its scenic beauty, spiritual significance, and adventure sports. Here's a glimpse into the enchanting land of Uttarakhand:
                </h3>
                <h2>Capital City: Dehradun</h2>
                <img src={UK1} alt="Uttarakhand" onClick={() => handleImageClick(UK1)} />
                <div style={space}></div>
                {!showMap && <button onClick={handleViewMap}>View Map</button>}
                {showMap && <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>}
                <h2>Natural Beauty:</h2>
                <p>
                    Uttarakhand is blessed with breathtaking landscapes, including the majestic Himalayan peaks, lush valleys, and sparkling rivers. The hill stations of Nainital, Mussoorie, and Ranikhet attract tourists with their scenic beauty and pleasant climate, offering a perfect retreat from the hustle and bustle of city life.
                </p>
                <h2>Spiritual Retreats:</h2>
                <p>
                    Uttarakhand is renowned for its spiritual significance, with several sacred sites and pilgrimage centers nestled amidst the mountains. The holy town of Rishikesh, known as the 'Yoga Capital of the World,' attracts spiritual seekers and adventure enthusiasts alike with its serene ambiance and plethora of ashrams and yoga retreats.
                </p>
                <img src={UK2} alt="Rishikesh, Uttarakhand" onClick={() => handleImageClick(UK2)} />
                <h2>Adventure Sports:</h2>
                <p>
                    Uttarakhand offers thrilling adventure sports opportunities, including trekking, river rafting, paragliding, and skiing. The pristine rivers like the Ganges and Yamuna provide excellent rafting experiences, while the snow-clad peaks offer ideal conditions for skiing and trekking expeditions.
                </p>
                <div className="UK-images">
                    <img src={UK3} alt="Uttarakhand" onClick={() => handleImageClick(UK3)} />
                    <img src={UK4} alt="Uttarakhand" onClick={() => handleImageClick(UK4)} />
                </div>
            </div>
            {showFullImage && (
                <div className="full-image-overlay">
                    <div className="full-image-content">
                        <span className="close-button" onClick={handleCloseImage}>&times;</span>
                        <img src={fullImageUrl} alt="Full Uttarakhand" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Uttarakhand;
