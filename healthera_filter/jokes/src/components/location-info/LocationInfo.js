import React from 'react';
import PropTypes from 'prop-types';
import wrong from '../../assets/icons/wrong.svg';
import './location-info.css';

const LocationInfo = (props)=>
    <div className='location-info-container'>
        <div className='icon-layout'>
            <img className='icon' src={wrong} alt='no location' />
        </div>
        <div className='info-layout'>
            <div className='message-container'>
                <div className='message'>{props.message}</div>
            </div>
            <div className='action-container'>
                <div className='btn-link' onClick={props.onClose}>close</div>
            </div>
        </div>
    </div>


LocationInfo.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func
}

export default LocationInfo;