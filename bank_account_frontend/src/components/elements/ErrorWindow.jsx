import './ErrorWindow.css';

function ErrorWindow(props) {
    return (
        <div className={props.transaction ? 'popup_window transaction_position' : 'popup_window'}>
            <div className='popup_title'>
                ERROR:
            </div>
                <div className='popup_content'>
                    {props.message}
                </div>
            <div>
                <button className='submit popup_button' onClick={() => props.resetBadRequest("")}>
                    OK
                </button>
            </div>
        </div>
    )
}

export default ErrorWindow;

