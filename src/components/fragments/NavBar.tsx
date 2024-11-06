import React, { Fragment, useEffect, useState } from "react";
import IconNavBar from "../elements/IconNavBar"

interface NavBarProps {
    className?: string
}

const NavBar: React.FC<NavBarProps> = ({className}) => {

    const [isAtTop, setIsAtTop] = useState<boolean>(true);

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY === 0) {
            setIsAtTop(true);
          } else {
            setIsAtTop(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <Fragment>
            <header className={`md:fixed z-50 flex justify-between items-center px-4 w-full h-20 md:px-6 xl:px-20 duration-300 
            ${!isAtTop? 'md:bg-white md:shadow-md md:h-[4.5rem]' : 'md:bg-transparent md:h-20'} ${className}`}>
                <div className="flex items-center gap-16">
                    <IconNavBar />
                </div>
                
            </header>
        </Fragment>
    )
}

export default NavBar;