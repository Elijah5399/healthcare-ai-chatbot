import "../../styles/Contact.css";
import FBLogo from '../../images/FB-logo.png';
import IGLogo from '../../images/IG-logo.png';
import TTLogo from '../../images/TT-logo.png';
import YTLogo from '../../images/YT-logo.png';
import SGHMap from '../../images/SGH-map.png';

export default function Contact() {
    return (
        <div className="contactpageWrapper">
            <div className="contactpageText">
                <h1>Contact Us!</h1>
            </div>


            <div className="contactpageInfo">
                <div className="address">
                    <h2 style={{borderBottom: "4px solid #16ab50", width: "1265px"}}>Address</h2>
                    <h5>Outram Road</h5>
                    <h5>Singapore 169608</h5>
                    <img className="sghMap" src={SGHMap} />
                </div>

                <div className="contacts">
                    <h2 style={{borderBottom: "4px solid #16ab50", width: "1265px"}}>Contacts</h2>
                    <h5>For General Enquiries : (+65) 6222 3322 (24h)</h5>
                    <h5>For Feedback: (+65) 6326 5350 (Mon to Fri : 9am to 5pm)</h5>
                </div>

                <div className="socials">
                    <h2 style={{borderBottom: "4px solid #16ab50", width: "1265px"}}>Social Media</h2>
                    <a href="https://www.facebook.com/SingaporeGeneralHospital/" target="_blank"><img className="fblogo" src={FBLogo} /></a>
                    <a href="https://www.instagram.com/sghseen/" target="_blank"><img className="iglogo" src={IGLogo} /></a>
                    <a href="https://www.tiktok.com/@sghseen?is_from_webapp=1&sender_device=pc" target="_blank"><img className="ttlogo" src={TTLogo} /></a>
                    <a href="https://www.youtube.com/channel/UC2VhN99r9KZm6nItLEiTrTQ" target="_blank" ><img className="ytlogo" src={YTLogo} /></a>
                </div>
            </div>
        </div>
    )
}