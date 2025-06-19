import { useState } from 'react';
import './../styles/menu.css';
import useGlobalStore from '../stores/global.stores';
import { useNavigate } from 'react-router-dom';
import logo from './../assets/logo.jpg';

const VegMenu = () => {
  const menu = {
    breakfast: [
      'Idlis with Sambar and Chutney',
      'Dosas with Sambar and Chutney',
      'Parathas with Paneer Masala',
      'Puri-Sabzi',
      'Bread',
      'Toast',
      'Vadapav',
      'Pongal',
      'Poha',
      'Dhokla',
      'Handvo',
      'Akki Roti',
      'Dal Baati Churma',
      'Dal Bafla'
    ],
    lunch: [
      'Thalis',
      'Tomato Rice',
      'Lemon Rice',
      'Coconut Rice',
      'Roti',
      'Chitappa',
      'Dals and Vegetable Kurama',
      'Butter Tofu Paneer',
      'Vegetable Biryani',
      'Dalma',
      'Baghaar-e-Baingan',
      'Usal',
      'Gujarati Kadhi',
      'Bisi Bela Baath',
      'Gatte ki Sabji',
      'Bhindi Masala',
      'Matar Paneer',
      'Paneer 65'
    ],
    dinner: [
      'Thali',
      'Idli',
      'Dosa',
      'Masala Dosa',
      'Chitappa',
      'Rajma Chawal',
      'Vegetable Khichdi',
      'Chole Bhature',
      'Butter Naan',
      'Palak Paneer',
      'Butter Tofu Paneer',
      'Vegetable Biryani',
      'Dalma',
      'Baghaar-e-Baingan',
      'Usal',
      'Gujarati Kadhi',
      'Bisi Bela Baath',
      'Gatte ki Sabji',
      'Bhindi Masala',
      'Matar Paneer',
      'Paneer 65'
    ],
    snacks: [
      'Vada Pav',
      'Pav Bhaji',
      'Veg Cutlet',
      'Paneer Cutlet',
      'Aloo Samosa',
      'Bread Omelet',
      'Masala Corn',
      'Raw Banana Bhaji',
      'Aloo Bhaji',
      'Bread Bhaji',
      'Gobi 65'
    ],
    drinks: [
      'Tea',
      'Coffee',
      'Milk',
      'Boost',
      'Horlicks',
      'Fresh Juice',
      'Coke',
      'Pepsi',
      'Kalimark',
      'Campa'
    ],
    fruits: [
      'Apple',
      'Orange',
      'Mosambi',
      'Grapes',
      'Watermelon',
      'Muskmelon',
      'Pineapple',
      'Pomegranate',
      'Papaya',
      'Guava'
    ]
  };

  // const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const { selectedItems, setSelectedItems } = useGlobalStore();
  

  const handleChange = (e) => {
    const { value, checked } = e.target;
    setSelectedItems(value, checked);
  };

  return (
    <div className="container">
      <div className="head-cont">
        <div className="logo-container">
          <img style={{ width: "100%", height: "auto" }} src={logo} alt="Track bites logo" />
        </div>
        <h2>
          Track bites - Veg Menu
        </h2>
      </div>
      <p>Pick my food</p>
      <p className="subtitle">Select your Vegetarian dishes</p>

      {Object.entries(menu).map(([category, items]) => (
        <div key={category} className="category">
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <div className="items">
            {items.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  value={item}
                  onChange={handleChange}
                  checked={selectedItems.includes(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="summary">
        <h4>Selected Items:</h4>
        <ul>
          {selectedItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="nav-buttons">
        <button className='btn btn-prev' onClick={() => navigate("/menucategory")}>&larr; Previous</button>
        <button className='btn btn-next' onClick={() => navigate("/traindetails")}>Next &rarr;</button>
      </div>
    </div>
  );
};

export default VegMenu;