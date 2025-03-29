import React, { useState } from 'react';
import './billingForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard } from "@fortawesome/free-brands-svg-icons";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function BillingForm() {
  const [selectedCard, setSelectedCard] = useState(null);
  const handleSelect = (card) => {
    setSelectedCard(card);
  };
    const months = Array.from({length: 12}, (_,i) => (i+1).toString().padStart(2, "0"));
    const [selectedMonth, setSelectedMonth] = useState("");

    const years = Array.from({length: 10},(_,i) => 2025 + i);
    const [selectedYear, setSelectedYear] = useState("");

    const cardIcons = {
      Visa: faCcVisa,
      Mastercard: faCcMastercard,
    };

  return (
    <>
    <div className='billing-info'>
      <h3>Billing Info</h3>
      <div className="card-options">
        {["Visa", "Mastercard"].map((card) => (
          <button
            key={card}
            className={`card-button ${selectedCard === card ? "selected" : ""}`}
            onClick={() => handleSelect(card)}
          >
             <FontAwesomeIcon icon={cardIcons[card]} size="2x" />
             {selectedCard === card && (
              <span className='check-icon'>
                <FontAwesomeIcon icon = {faCheckCircle}/>
              </span>
             )}
          </button>
        ))}
      </div>

      </div>
      <div className="checkout">
      <div className="card-info">

        <h4>Credit Card Info</h4>

        <div className="form-group">
          <label>Cardholder name</label>
          <input type="text"/>
        </div>

        <div className="form-group">
          <label>Card Number</label>
          <input type="text" placeholder="0000-0000-0000-0000" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>CVV Number</label>
            <input type="text" id='short-input'/>
          </div>

          <div className="form-group">
            <label>Exp. Month</label>
            <select className='selection'
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}>
              <option>Month</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="">Exp. Year</label>
            <select className='selection'
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}>
              <option>Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
        </div>
        <div className='btn-container'>
      <button className='pay'>Pay now</button>
      </div>
      </div>
    </div>

    </>
  );
}

export default BillingForm;

