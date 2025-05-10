import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const sidebarLinks = [
    {
        label: "Dashboard",
        link: "/dashboard"
    },
    {
        label: "Task",
        link: "/tasks"
    },
    {
        label: "Settings",
        link: "/settings"
    },
    {
        label: "Logout",
        link: "/logout"
    }
]

function Sidebar() {

    const [openSidebar, setOpenSidebar] = useState(false);
    const location = useLocation();

    const closeSidebar = () => {
        setOpenSidebar(false);
    }

    return (
        <div className='w-full h-full flex flex-col gap-6 p-5'>

            <h1 className='flex gap-1 items-center'>
                <span className='text-2xl font-bold text-black'>Task Manager</span>
            </h1>

            <div className="flex flex-col gap-y-5 py-8">
                {
                    sidebarLinks.map((link, key) => (
                        <NavLink
                            to={link.link}
                            key={key}
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-md ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))
                }
            </div>

        </div>
    )
}

export default Sidebar;
