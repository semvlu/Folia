import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Instruction from '../components/Instruction';
import SubmitBtn_OtpModal from '../components/SubmitBtn_OtpModal';
import linkedinLogo from '../assets/linkedin.svg';
import githubLogo from '../assets/github.svg';
import xLogo from '../assets/twitter-x.svg';
import './Home.css';

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    socialMedia: {linkedin: '', github: '', x: ''},

    address: '',
    city: '',
    country: 'United States',
    
    // photo: null as File | null
  });

  
  // navigate to the namecard page
  const nav = useNavigate();

  // handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name.includes('socialMedia') ? 'socialMedia' : name]: name.includes('socialMedia')
        ?{...formData.socialMedia, [name.split('.')[1]]: value}
        : value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        // photo: e.target.files[0]
      });
    }
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    // console.log(formData);
    nav('/namecard', { state: formData });
  };

  // Setup body style
  useEffect(() => {
    document.body.style.backgroundColor = '#199191';
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    // Cleanup styles when the component unmounts
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.fontFamily = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

  const style: string ="mt-2 rounded-md bg-white px-3 py-1.5 text-base outline-1 outline-gray-300  ";
  const tmp: string = "focus:outline-2"  
  // Page layout
  return (
    <>
      <h1><b>Folia</b></h1>
      <h2>Create your name card for free!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" 
            className={style}
            value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Title:</label>
          <input type="text" name="title" 
            className={style}
            value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" 
            className={style}
            value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" name="phone" 
            className={style}
            value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Social Media:</label>

          <div className="mb-2 flex items-center justify-center">
            <img src={linkedinLogo} className='mt-2 social-logo'
              data-tooltip-id="linkedin-tt"
              data-tooltip-place="left"
              data-tooltip-content="LinkedIn"
            />
            <Tooltip id="linkedin-tt"/>
            <div className="mt-2 px-2 py-2 inline-flex items-center min-w-fit rounded-s-md bg-gray-50">
                  <span className="text-sm text-gray-500">@</span>
            </div>
            <input type="text" name="socialMedia.linkedin"
              className={style}
              value={formData.socialMedia.linkedin} onChange={handleChange} />
          </div>

          <div className="mb-2 flex items-center justify-center">
            <img src={githubLogo} className='mt-2 social-logo'
              data-tooltip-id="github-tt"
              data-tooltip-place="left"
              data-tooltip-content="GitHub"
            />
            <Tooltip id="github-tt"/>
            <div className="mt-2 px-2 py-2 inline-flex items-center min-w-fit rounded-s-md bg-gray-50">
                  <span className="text-sm text-gray-500">@</span>
            </div>
            <input type="text" name="socialMedia.github"
              className={style}
              value={formData.socialMedia.github} onChange={handleChange} />
          </div>

          <div className="mb-2 flex items-center justify-center">
            <img src={xLogo} className='mt-2 social-logo' 
              data-tooltip-id="x-tt"
              data-tooltip-place="left"
              data-tooltip-content="X (Twitter)"
            />
            <Tooltip id="x-tt"/>
            <div className="mt-2 px-2 py-2 inline-flex items-center min-w-fit rounded-s-md bg-gray-50">
                  <span className="text-sm text-gray-500">@</span>
            </div>
            <input type="text" name="socialMedia.x" 
              className={style}
              value={formData.socialMedia.x} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label>Address:</label>
          <input type="text" name="address" 
            className={style}
            value={formData.address} onChange={handleChange} />
        </div>
        <div>
          <label>City:</label>
          <input type="text" name="city" 
            className={style}
            value={formData.city} onChange={handleChange} />
        </div>
        <div>
          <label>Country:</label>
          <select name="country" className={style} value={formData.country} onChange={handleChange}>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Belgium">Belgium</option>
            <option value="Italy">Italy</option>
            <option value="Spain">Spain</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antartica">Antarctica</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
            <option value="Botswana">Botswana</option>
            <option value="Bouvet Island">Bouvet Island</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
            <option value="Brunei Darussalam">Brunei Darussalam</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos Islands">Cocos (Keeling) Islands</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Congo">Congo, the Democratic Republic of the</option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cota D'Ivoire">Cote d'Ivoire</option>
            <option value="Croatia">Croatia (Hrvatska)</option>
            <option value="Cuba">Cuba</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="East Timor">East Timor</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France Metropolitan">France, Metropolitan</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Territories">French Southern Territories</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
            <option value="Holy See">Holy See (Vatican City State)</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran">Iran (Islamic Republic of)</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Israel">Israel</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
            <option value="Korea">Korea, Republic of</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Lao">Lao People's Democratic Republic</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macau">Macau</option>
            <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malawi">Malawi</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Micronesia">Micronesia, Federated States of</option>
            <option value="Moldova">Moldova, Republic of</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands Antilles">Netherlands Antilles</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Philippines">Philippines</option>
            <option value="Pitcairn">Pitcairn</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russian Federation</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option> 
            <option value="Saint Lucia">Saint LUCIA</option>
            <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome and Principe">Sao Tome and Principe</option> 
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia (Slovak Republic)</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="St. Helena">St. Helena</option>
            <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syria">Syrian Arab Republic</option>
            <option value="Taiwan">Taiwan, Province of China</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania, United Republic of</option>
            <option value="Thailand">Thailand</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks and Caicos">Turks and Caicos Islands</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Viet Nam</option>
            <option value="Virgin Islands (British)">Virgin Islands (British)</option>
            <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
            <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
            <option value="Western Sahara">Western Sahara</option>
            <option value="Yemen">Yemen</option>
            <option value="Serbia">Serbia</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </select>
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" className="btn btn-success" name="photo" onChange={handleFileChange} />
        </div>

        <div className="col-span-full">
          <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
            Cover photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
            <div className="text-center">
              <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
              <div className="mt-3 flex text-sm/5 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-sm bg-white font-semibold 
                    text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 
                    focus-within:ring-offset-2 
                    focus-within:outline-hidden hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <button type="submit" className='btn btn-primary'>Submit</button>
      </form>
      <p/>
      
      <SubmitBtn_OtpModal />
      <p/>
      <Instruction />
    </>
  );
};

export default Home;

