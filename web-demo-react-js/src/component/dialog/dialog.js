// dialog.js
import React from 'react';
import Modal from 'react-modal';

const Dialog = ({ isOpen, onRequestClose, children, title, customStyles }) => {
    const defaultStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            border: 'none',
            borderRadius: '8px',
            maxWidth: '400px',
            margin: 'auto',
            padding: '20px',
            minHeight: '250px',
        },
        title: {
            fontSize: '1.5rem',
            marginBottom: '10px',

        },
        contentContainer: {
            // Add any additional styles for the content container
        },
    };

    const mergedStyles = {
        content: { ...defaultStyles.content, ...customStyles?.content },
        title: { ...defaultStyles.title, ...customStyles?.title },
        contentContainer: { ...defaultStyles.contentContainer, ...customStyles?.contentContainer },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={title || 'Modal'}
            ariaHideApp={false}
            style={{
                ...defaultStyles,
                content: mergedStyles.content,
            }}
        >
            {title && <h2 style={mergedStyles.title}>{title}</h2>}
            <div style={mergedStyles.contentContainer}>
                {children}
            </div>
        </Modal>
    );
};

export default Dialog;