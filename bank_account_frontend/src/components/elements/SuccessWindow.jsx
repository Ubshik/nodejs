import { useNavigate } from 'react-router-dom';
import './ErrorWindow.css';

function SuccessWindow(props) {
    const navigate = useNavigate();

    return (
        <div className='popup_window success_window'>
            <div className='popup_title_success'>
                {props.message};
            </div>

            <div>
                {/* <button className='submit popup_button' onClick={() => navigate("/signup")}> */}
                <button className='submit popup_button' onClick={() => navigate(props.navigateTo)}>
                    OK
                </button>
            </div>
        </div>
    )
}

export default SuccessWindow;