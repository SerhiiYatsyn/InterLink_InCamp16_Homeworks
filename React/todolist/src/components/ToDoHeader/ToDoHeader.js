import React from 'react'

export default class ToDoHeader extends React.Component {
    render() {
        return (
                <div className="Home">
                    <h1>Home</h1>
                    <p>Please select or create a list</p>
                    <section>
                        <h2>Navigation</h2>
                        <p>You can navigate between lists using arrows </p>
                    </section>
                </div>
            );
        }
}
