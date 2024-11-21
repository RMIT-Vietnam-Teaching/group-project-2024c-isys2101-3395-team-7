import React from "react"
import Link from "next/link";
import bookmark from '../assets/Bookmark_fill.svg';
import menu from '../assets/Menu.svg'
import history from '../assets/History.svg';
import logo from '../assets/vietgo_logo.svg'

const Header = () => {
    return (
        <>
            <div
            >
                {/*sidebar*/}
                <div>
                    testing
                    <svg
                        src={menu} alt="menu Icon" className= "h-6 w-6"
                    />
                    sidebar icon
                </div>
                {/*app logo*/}
                <div>
                    <Link href="/home">
                        <svg src={logo} alt="Viego Icon" className= "h-6 w-6"/>
                    </Link>
                </div>
                {/*right panel*/}
                <div className='basis-2/3 flex flex-nowrap justify-end mr-4'>
                    <nav>
                        <ul>
                            <svg src={bookmark} alt="Favorite Icon" className= "h-6 w-6"/>
                            <li>Favorite item</li>
                        </ul>
                        <ul>
                            <svg src={history} alt="History Icon" className= "h-6 w-6"/>
                            <li>History item</li>
                        </ul>
                        <ul>
                            {/*<svg src="client/src/assets/History.svg" alt="History Icon"/>*/}
                            <li>user Profile</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Header