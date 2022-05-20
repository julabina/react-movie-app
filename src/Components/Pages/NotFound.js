import React, { useEffect } from 'react';

const NotFound = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (
        <main>
            <section className="notFound">
                <h2>Page not found</h2>
                <p>404</p>
            </section>
        </main>
    );
};

export default NotFound;