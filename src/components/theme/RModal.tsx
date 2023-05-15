
export function RModal({ children }: any) {

    return (

        <div className="modal" id="modal">
            <h2>Modal Window</h2>
            <div className="content">
                { children }
            </div>
            <div className="actions">
                <button className="toggle-button">OK</button>
            </div>
        </div>
    )
} 