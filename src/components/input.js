import React, { useState } from 'react';

export default function Input() {
    const [message, setMessage] = useState('hello world');

    return (
        <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            {message}
        </div>
    );
}
