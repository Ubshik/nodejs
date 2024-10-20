import { useNavigate } from 'react-router-dom';
import './ErrorWindow.css';

function ErrorWindow(props) {
    const navigate = useNavigate();

    return (
        <div className='popup_window'>
            <div className='popup_title'>
                ERROR:
            </div>
                <div className='popup_content'>
                    {props.message}
                </div>
            <div>
                {/* <button className='submit popup_button' onClick={() => navigate("/signup")}> */}
                <button className='submit popup_button' onClick={() => props.function("")}>
                    OK
                </button>
            </div>
        </div>
    )
}

export default ErrorWindow;

