import "./home.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  return (
    <div className="navBar">
      <div className="navLeft">
        <h1 style={{ fontSize: "48px", color: "white", marginTop: "32px" }}>
          Building48
        </h1>
      </div>
      <div className="navRight">
        <div
          className="inputShort"
          style={{ marginTop: "50px", marginRight: "20px" }}
        >
          <input
            type="text"
            className="inputShortBody"
            name="plantName"
            placeholder="Start typing here..."
            style={{
              backgroundColor: "#161616",
              marginTop: "-30px",
              marginLeft: "-220px",
            }}
          />
          <button
            className="searchButton"
            style={{
              marginLeft: "-130px",
              marginTop: "-18px",
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

const PropertyShowCard = ({
  houseName,
  rooms,
  location,
  price,
  image,
  rating,
}) => {
  return (
    <div className="PropertyShowCardBody">
      <div className="PSC-Left">
        <div
          className="propertyShowImg"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="PSC-MId">
          <h1 style={{ fontSize: "36px", fontWeight: "800" }}>{houseName}</h1>
          <h1 style={{ fontSize: "32px", fontWeight: "400" }}>{rooms}</h1>
          <h1 style={{ fontSize: "32px", fontWeight: "600" }}>{location}</h1>
        </div>
      </div>

      <div className="PSC-Right">
        <div className="rating-panel">
          <div className="rating-left">
            <h2 style={{ marginTop: "2px" }}>{rating[0]}</h2>
            <h2 style={{ marginTop: "-12px" }}>{rating[2]} reviews</h2>
          </div>
          <div className="rating-right">
            <h1 style={{ marginTop: "15px" }}>{rating[1]}</h1>
          </div>
        </div>

        <div className="price-panel">
          <h1>{price}</h1>
          <button className="bigContactButton">Contact agent</button>
        </div>
      </div>
    </div>
  );
};

const PropertyCard = ({ id, houseName, rooms, image, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/Properties/delete/${id}`
      );
      if (response.status === 200) {
        console.log("Property deleted successfully");
        onDelete(id);
      } else {
        console.log("Error deleting property");
      }
    } catch (error) {
      console.error("There was an error deleting the property!", error);
    }
  };

  return (
    <div className="propertyCardBody">
      <div
        className="propertyCardImg"
        style={{ backgroundImage: `url(${image})` }}
      >
        <button className="deleteButton" onClick={handleDelete}>
          X
        </button>
      </div>
      <div className="propertyCardBodyText">
        <h1 style={{ color: "white" }}>{houseName}</h1>
        <h1
          style={{
            color: "white",
            fontWeight: "400",
            marginTop: "-5px",
            marginBottom: "30px",
            fontSize: "24px",
          }}
        >
          {rooms}
        </h1>

        <button className="PropertyCardButton" style={{ marginRight: "10px" }}>
          Contact
        </button>

        <button
          type="button"
          className="PropertyCardButtonUpdate"
          data-toggle="modal"
          data-target="#updatePropertyModal"
        >
          Update info
        </button>

        <div
          className="modal fade"
          id="updatePropertyModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Home() {
  const [currentProperties, setCurrentProperties] = useState([]);
  const [houseName, setHouseName] = useState("");
  const [houseDescription, setHouseDescription] = useState("");
  const [rooms, setRooms] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState([]);
  const [onShow, setOnShow] = useState(false);
  const imageArray = [
    "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg",
    "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
    "https://www.wilsonhomes.com.au/sites/default/files/styles/blog_hero_banner/public/My%20project%20-%202023-06-20T095818.329%20%281%29_0.jpg",
    "https://img.onmanorama.com/content/dam/mm/en/lifestyle/decor/images/2023/6/1/house-middleclass.jpg",
    "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg",
    "https://i.ytimg.com/vi/_L6jEtMK8No/maxresdefault.jpg",
    "https://foyr.com/learn/wp-content/uploads/2022/06/types-of-house-styles-and-homes.jpg",
  ];
  const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];
  const randomRating = [
    Math.random() < 0.5 ? "good" : "bad",
    Math.floor(Math.random() * 11),
    Math.floor(Math.random() * 100),
  ];
  const macPort = 3001;

  const fetchProperties = () => {
    axios
      .get(`http://localhost:${macPort}/api/Properties`)
      .then((response) => {
        setCurrentProperties(response.data);
        console.log("Connected to properties field");
      })
      .catch((error) => {
        console.error("There was an error fetching the properties!", error);
      });
  };

  useEffect(() => {
    fetchProperties();
    setImage(randomImage);
    setRating(randomRating);
  }, [macPort]);

  useEffect(() => {
    console.log("Current properties: ", currentProperties);
  }, [currentProperties]);

  const handlePropertySubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/Properties/add",
        {
          houseName,
          houseDescription,
          rooms,
          location,
          price,
          image,
          rating,
          onShow,
        }
      );

      if (response.status === 201) {
        console.log("Property added");
        window.location.reload();
      } else {
        console.log("Error creating property");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Error creating property";
      console.log(errorMsg);
    }
  };

  const handleDeleteProperty = (id) => {
    fetchProperties();
  };

  return (
    <div className="website">
      <Navbar />
      <div className="main">
        <div className="heroSection">
          <div className="heroImgOverlay"></div>
          <div className="heroTextGroup">
            <h1
              style={{ fontSize: "96px", textAlign: "center", color: "white" }}
            >
              Find your dream home <strong>with Buildings48</strong>
              <div className="inputLong">
                <input
                  type="text"
                  className="inputLongBody"
                  name="plantName"
                  placeholder="Start typing here..."
                />
                <button
                  className="searchButton"
                  style={{ marginLeft: "-130px", marginTop: "11px" }}
                >
                  Search
                </button>
              </div>
            </h1>
          </div>
        </div>

        <div className="onShowSection">
          <div className="onShowLeft">
            <h1 style={{ fontSize: "64px", color: "white" }}>
              Local properties on show
            </h1>
          </div>
          <div className="onShowRight">
            {currentProperties
              .filter((propObj) => propObj.onShow) // Filter the properties by onShow
              .map((propObj) => (
                <PropertyShowCard
                  key={propObj.id} // Add a unique key if available
                  houseName={propObj.houseName}
                  rooms={propObj.rooms}
                  location={propObj.location}
                  price={propObj.price}
                  image={propObj.image}
                  rating={propObj.rating}
                />
              ))}
          </div>
        </div>

        <div className="allPropertiesSection">
          <div className="allPropertiesTop">
            <div>
              <h1 style={{ fontSize: "64px", color: "white" }}>
                All properties
              </h1>
            </div>
            <div>
              <div
                className="inputShort"
                style={{ marginTop: "50px", marginRight: "20px" }}
              >
                <input
                  type="text"
                  className="inputShortBody"
                  name="plantName"
                  placeholder="Start typing here..."
                  style={{ backgroundColor: "#282828" }}
                />
                <button
                  className="searchButton"
                  style={{
                    marginLeft: "-130px",
                    marginTop: "10px",
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="allPropertiesCategories">
            <div>
              <h1
                style={{
                  fontSize: "36px",
                  color: "white",
                  marginRight: "20px",
                  fontWeight: "200",
                }}
              >
                All
              </h1>
            </div>
            <div>
              <h1
                style={{
                  fontSize: "36px",
                  color: "white",
                  marginRight: "20px",
                  fontWeight: "600",
                }}
              >
                Local
              </h1>
            </div>
            <div>
              <h1
                style={{
                  fontSize: "36px",
                  color: "white",
                  marginRight: "20px",
                  fontWeight: "200",
                }}
              >
                Flats
              </h1>
            </div>
            <div>
              <h1
                style={{
                  fontSize: "36px",
                  color: "white",
                  marginRight: "20px",
                  fontWeight: "200",
                }}
              >
                Apartments
              </h1>
            </div>
            <div>
              <h1
                style={{
                  fontSize: "36px",
                  color: "white",
                  marginRight: "20px",
                  fontWeight: "200",
                }}
              >
                Townhouse
              </h1>
            </div>
          </div>

          <div className="allPropertiesContainer">
            {currentProperties.map((propObj) => (
              <PropertyCard
                key={propObj._id}
                id={propObj._id}
                houseName={propObj.houseName}
                rooms={propObj.rooms}
                image={propObj.image}
                onDelete={handleDeleteProperty}
              />
            ))}
          </div>
        </div>

        <div className="listYourPropertySection">
          <div className="listYourPropertySectionImg"></div>
          <div className="listYourPropertySectionImgOverlay"></div>
          <div className="listYourPropertySectionImgForm">
            <h1 style={{ fontSize: "64px" }}>List your property</h1>
            <form className="listHouseForm" onSubmit={handlePropertySubmit}>
              <div className="form-group">
                <label htmlFor="inputHouseName" className="listHouseLabel">
                  House name
                </label>
                <input
                  type="text"
                  className="listHouseInput"
                  id="inputHouseName"
                  placeholder="Enter house name..."
                  value={houseName}
                  onChange={(e) => setHouseName(e.target.value)}
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="inputHouseDesc" className="listHouseLabel">
                  House description
                </label>
                <input
                  type="text"
                  className="listHouseInput"
                  id="inputHouseDesc"
                  placeholder="Enter house description..."
                  value={houseDescription}
                  onChange={(e) => setHouseDescription(e.target.value)}
                ></input>
              </div>

              <div className="form-split">
                <div
                  className="form-group"
                  style={{ width: "48%", marginRight: "4%" }}
                >
                  <label htmlFor="inputHouseRooms" className="listHouseLabel">
                    Rooms
                  </label>
                  <input
                    type="text"
                    className="listHouseInput"
                    id="inputHouseRooms"
                    placeholder="Enter rooms..."
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                  ></input>
                </div>
                <div className="form-group" style={{ width: "48%" }}>
                  <label htmlFor="inputHousePrice" className="listHouseLabel">
                    Price
                  </label>
                  <input
                    type="text"
                    className="listHouseInput"
                    id="inputHousePrice"
                    placeholder="Enter house price..."
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputHouseAdress" className="listHouseLabel">
                  House address
                </label>
                <input
                  type="text"
                  className="listHouseInput"
                  id="inputHouseAdress"
                  placeholder="Enter house address..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                ></input>
              </div>

              <div className="form-check" style={{ marginBottom: "50px" }}>
                <input
                  type="checkbox"
                  className="form-check-input listHouseCbx"
                  id="inputHouseOnShow"
                  style={{ marginRight: "30px" }}
                  onChange={(e) => setOnShow(e.target.checked)}
                />
                <label
                  className="listHouseLabelCbx"
                  htmlFor="inputHouseOnShow"
                  style={{ fontSize: "24px", marginTop: "-500px" }}
                >
                  Is the house on show?
                </label>
              </div>

              <button type="submit" className="listHouseSubmitBtn">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="footer"></div>
        <div></div>
      </div>
    </div>
  );
}

export default Home;
