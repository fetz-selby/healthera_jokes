import React from 'react';
import {shallow} from 'enzyme';
import LocationInfo from './';

describe('Location Info Component', ()=>{
    it('should display [message] passed with props', ()=>{
        const message = 'location could not be found';

        const locationInfo = shallow(<LocationInfo message={message}/>);
        expect(locationInfo.find('.message').text()).toBe(message);
    })

    it('should call onClose when close is clicked', ()=>{
        const message = 'location could not be found';
        const id = 1;
        const onClose = jest.fn();

        const props = {
            message,
            onClose
        }

        const locationInfo = shallow(<LocationInfo {...props}/>);
        locationInfo.find('.btn-link').simulate('click');
        expect(onClose).toHaveBeenCalled();
    })

    it('should render correctly', ()=>{
        const message = 'location could not be found';

        const props = {
            message
        }

        const locationInfo = shallow(<LocationInfo {...props}/>);
        expect(locationInfo).toMatchSnapshot();
    })
})