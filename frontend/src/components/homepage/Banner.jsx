import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default function Banner() {
  const slideImages = [
    {
      url: "https://www.mangalahospital.in/wp-content/uploads/2017/11/banner.jpg",
      caption: "First Slide",
    },
    {
      url: "https://www.conceptlab.com.sg/wp-content/uploads/subbanner-singhealth.jpg",
      caption: "Second Slide",
    },
    {
      url: "https://blogs.microsoft.com/wp-content/uploads/prod/2020/03/HIMSS-OMB-Blog_Updated.png",
      caption: "Third Slide",
    },
  ];

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "450px",
  };
  const buttonStyle = {
    background: "none",
    border: "none",
    padding: 0,
    position: "absolute",
    top: "200px",
  };
  const properties = {
    prevArrow: (
      <button style={{ ...buttonStyle, left: "40px" }}>
        <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
      </button>
    ),
    nextArrow: (
      <button style={{ ...buttonStyle, right: "40px" }}>
        <FontAwesomeIcon icon={faArrowRight} size="2xl" />
      </button>
    ),
    duration: 5000,
    transitionDuration: 1000,
    infinite: true,
    easing: "ease",
  };
  return (
    <div className="bannerContainer">
      <Slide {...properties}>
        {slideImages.map((slideImage, index) => (
          <div key={index} className="each-slide">
            <div
              style={{
                ...divStyle,
                backgroundImage: `url(${slideImage.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
