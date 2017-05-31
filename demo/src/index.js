import React from 'react';
import { render } from 'react-dom';

import Input from '../../src';


const FlexWrapper = ({ children }) =>
  <div style={{
    fontFamily: 'helvetica',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  }}>
    {children}
  </div>


const Demo = ({ props }) =>
  <FlexWrapper>
    <h1>react-simple-input Gallery</h1>
    <Input name="hi" label="Label:" value="green" validator={v => v === "hello world" ? ({}) : ({ error: "error" })} />
    <Input type="color" name="color" label="Input a Color:" />
  </FlexWrapper>


render(<Demo/>, document.querySelector('#demo'));
