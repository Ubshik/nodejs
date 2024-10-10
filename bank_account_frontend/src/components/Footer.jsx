// import Github from '../../public/pictures/GitHub-512.webp';
// import LinkedIn from '../../public/pictures/linkedin_flat_black-512.webp';


import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer>
            <p id="logo">luBANK</p>
            <p id="footer-author">LUBOV VOL @ 2024</p>
            <div id="link-container">
            <Link
              to='https://github.com/Ubshik/nodejs/tree/admin-friendly'
              target='_blank'
              aria-label='GitHub'
            >
              <img className='link' src='/pictures/GitHub-512.webp' alt="Github" />
            </Link>

            <Link
              to='https://www.linkedin.com/in/lubov-vol-749746158/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <img className='link link-tab' src='/pictures/linkedin_flat_black-512.webp' alt="LinkedIn" />
            </Link>
            </div>
        </footer>
    )
}