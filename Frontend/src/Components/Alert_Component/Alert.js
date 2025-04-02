import React from 'react';

function Alert(props) {
    const alertStyle = {
        padding: '1rem',
        borderRadius: '4px',
        margin: '0.5rem',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '100%',
        width: 'auto'
    };

    const errorStyle = {
        ...alertStyle,
        backgroundColor: '#fee2e2',
        color: '#b91c1c',
        borderLeft: '4px solid #b91c1c'
    };

    const successStyle = {
        ...alertStyle,
        backgroundColor: '#dcfce7',
        color: '#166534',
        borderLeft: '4px solid #166534'
    };

    return (
        <>
            {props.type === "error" && (
                <div style={errorStyle} role="alert">
                    <svg 
                        style={{
                            marginRight: '0.5rem',
                            minWidth: '24px'
                        }} 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {props.alertmsg}
                </div>
            )}
            
            {props.type === "success" && (
                <div style={successStyle} role="alert">
                    <svg 
                        style={{
                            marginRight: '0.5rem',
                            minWidth: '24px'
                        }} 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    {props.alertmsg}
                </div>
            )}
        </>
    );
}

export default Alert;