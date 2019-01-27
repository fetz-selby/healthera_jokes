import React from 'react';
import {shallow} from 'enzyme';
import Login from './';

describe('Login Component', ()=>{
    it('should render users correctly', ()=>{
        const users = [{id: 1, name: 'John Doe'}, {id: 2, name : 'Jane Doe'}];

        const login = shallow(<Login users={users}/>);
        expect(login).toMatchSnapshot();
    })
})