import React, { useState, useEffect } from 'react';
import { Popover, OverlayTrigger, PopoverBody } from 'react-bootstrap';

export const InfoPopOver = ({ message }) => {
  const [show, setShow] = useState(true);
  

  setTimeout(() => {
    setShow(false);
  }, 5000); // Disparait après 5 secondes

  const popover = (
    <Popover id="info-popover">
      <PopoverBody >
        {message}
      </PopoverBody>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      show={show}
      overlay={popover}
    >
      <span></span>
    </OverlayTrigger>
  );
}