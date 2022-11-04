import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingBox() {
  return (
    <div className={'d-flex justify-content-center'}>
      <Spinner
        className={'d-flex align-self-center'}
        animation="border"
        role="status"
      >
        <span className={'visually-hidden'}>Loading</span>
      </Spinner>
    </div>
  );
}
