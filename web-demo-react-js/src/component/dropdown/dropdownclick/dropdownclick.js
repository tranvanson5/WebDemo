import React, { useState, useEffect, useRef } from 'react';
import './dropdownclick.css';

function Dropdownclick({ title, content, position }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll); // Thêm sự kiện lắng nghe scroll cho window
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-click-container" ref={dropdownRef}>
      <button className="dropdown-click-button" onClick={toggleDropdown}>
        {title || 'Click me'}
      </button>
      {isOpen && (
        <div className="dropdown-menu" style={{left: position||"-50%"}}>
          <ul>
            {content || (
              <>
                <li>Option 1</li>
                <li>Option 2</li>
                <li>Option 3</li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdownclick;
