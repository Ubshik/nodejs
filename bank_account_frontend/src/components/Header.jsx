import './Header.css';

//TODO:
//1)User name should be shown ONLY on dashboard page
//2)Add logout for user
export default function Header() {
    return (
        <header>
            <p id="logo">luBANK</p>
            <p id="header-user">User name</p>
        </header>
    )
}