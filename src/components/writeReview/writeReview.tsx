import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Rating } from "semantic-ui-react";
import "./writeReview.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { useDispatchApp } from "../../store/Store";
import { getSupplierDataById } from "../../store/action/supplier";
import { useParams } from "react-router-dom";

interface PopupProps {
    show: boolean;
    children: React.ReactNode;
  }

const Popup = ({ show, children }: PopupProps) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children} {/* Render children */}
        </section>
      </div>
    );
  };

const WriteReview = () => {
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState<string | number | undefined>('');
  const [descriptionError, setDescriptionError] = useState('');
  const [ratingError, setRatingError] = useState('');
  const { token, userDetails } = useSelector((state: RootState) => state.auth);
  const userName = token ? userDetails?.name || "" : null;

  const {  id: supplierId  } = useParams();
  const dispatch = useDispatchApp();

  useEffect(() => {
    if (supplierId) {
      dispatch(getSupplierDataById(supplierId));
    }
  }, [supplierId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //validate review description
      if (!description) {
        setDescriptionError('Please enter the review.');
        return;
      }

      //validate rating
      if (!rating) {
        setRatingError('Please set the rating.');
        return;
      }

      const response = await axios.post('http://localhost:4005/reviews/writeReview', { userName, description, rating, supplierId});
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error('Error writing review:', error);
      // Handle error
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setDescriptionError('');// Clear description error when the user types in the textarea
  };

  return (
    <form className="Review-Container" onSubmit={handleSubmit}>
      <div className="header">
        <div className="Username-Container">
          <span>{userName}</span>
          {descriptionError && <span className="error">{descriptionError}</span>}
        </div>
        <div className="Rating-Container">
        {ratingError && <span className="error">{ratingError}</span>}
          <Rating
            maxRating={5}
            defaultRating={3}
            icon="star"
            size="huge"
            value={rating}
            onRate={(e, { rating }) => {
              setRating(rating?.toString() ?? '');
              setRatingError('');// Reset rating error message when user sets a rating
            }}            
          />
        </div>
      </div>

      <div className="description">
        <textarea
          className="limited-lines"
          placeholder="Enter your review here"
          value={description}
          onChange={handleDescriptionChange} />
      </div>

      <div className="btn-container">
        <button
          className="button-65"
          type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

const PopupButton = () => {
    const [showPopup, setShowPopup] = useState(false);
  
    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
  
    return (
        <div className='popup-component'>
            <div className="PopupButton-row">
                <button className='button-65' onClick={togglePopup}>{showPopup ? 'Close Review' : 'Write Review'}</button>
                <div className="sort-dropdown">
                    <label htmlFor="sort">Sort By : </label>
                    <select>
                        <option value="highestRating">Highest Rating</option>
                        <option value="lowestRating">Lowest Rating</option>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>
            <div className="popupReview">
                <Popup show={showPopup}>
                    {showPopup && <WriteReview />}
                </Popup>
            </div>
      </div>
    );
  };

export default PopupButton;