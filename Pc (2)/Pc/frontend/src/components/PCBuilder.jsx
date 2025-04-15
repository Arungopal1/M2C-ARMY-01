import React, { useState } from 'react';

function PCBuilder() {
    const [components, setComponents] = useState([]);

    return (
        <div>
            <h2>Build Your Custom PC</h2>
            <p>Recommended parts will appear here...</p>
        </div>
    );
}

export default PCBuilder;