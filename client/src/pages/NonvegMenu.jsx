import { useState } from 'react';
import './../styles/menu.css';
import { useNavigate } from 'react-router-dom';
import useGlobalStore from '../stores/global.stores';
import logo from './../assets/logo.jpg';
// import '@fortawesome/fontawesome-free/css/all.min.css';

const NonvegMenu = () => {
  const menu = {
    lunch: [
      'Egg Biryani',
      'Chicken Biryani',
      'Mutton Biryani',
      'Non-Veg Thali',
      'Chicken Curry with Rice',
      'Egg Curry with Rice',
      'Butter Chicken Curry',
      'Madras Chicken Curry',
      'Palak Chicken',
      'Chilli Chicken',
      'Pepper Chicken',
      'Chettinad Chicken',
      'Chicken 65',
      'Mutton Curry with Rice',
      'Mutton Chukka'
    ],
    dinner: [
      'Egg Biryani',
      'Chicken Biryani',
      'Mutton Biryani',
      'Chicken Curry with Rice',
      'Egg Curry with Rice',
      'Butter Chicken Curry',
      'Madras Chicken Curry',
      'Palak Chicken',
      'Chilli Chicken',
      'Pepper Chicken',
      'Chettinad Chicken',
      'Chicken 65',
      'Mutton Curry with Rice',
      'Mutton Chukka'
    ],
    snacks: [
      'Chicken Cutlet',
      'Chicken Samosa'
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
  const { selectedItems, setSelectedItems, selectedCategory } = useGlobalStore();
  console.log("Selected Items:", selectedItems);

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
          Track bites - Non veg Menu
        </h2>
      </div>
      <p>Pick my food</p>
      <p className="subtitle">Select your Non-Vegetarian dishes</p>

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

export default NonvegMenu;

