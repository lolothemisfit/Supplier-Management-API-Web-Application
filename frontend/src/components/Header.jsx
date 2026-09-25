import { useState } from "react"
import { Link } from "react-router-dom"
import { HiMenu, HiX } from "react-icons/hi"

export default function Header()
{
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className="fixed left-0 top-0 z-50 w-full bg-blue-600/90 shadow-md backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-xl font-bold tracking-tight text-white sm:text-2xl"
                >
                    Supplier Management System
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden items-center md:flex">
                    <Link
                        to="/suppliers/add"
                        className="rounded-lg bg-white px-4 py-2 font-semibold text-blue-600 transition-colors duration-200 hover:bg-blue-50"
                    >
                        Add Supplier
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex items-center md:hidden">
                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-3xl text-white focus:outline-none "
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                    >
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>

            </div>

            {/* Mobile Side Drawer */}
            <div
                className={`fixed right-0 top-0 z-40 h-full w-3/4 max-w-sm transform bg-blue-600 shadow-lg transition-transform duration-300 ${
                    menuOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                }`}
            >

                {/* Drawer Header */}
                <div className="flex justify-end p-6">
                    <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        className="text-3xl text-white focus:outline-none"
                        aria-label="Close menu"
                    >
                        <HiX />
                    </button>
                </div>

                {/* Drawer Links */}
                <nav className="flex flex-col gap-4 px-6 pt-6">

                    <Link
                        to="/suppliers/add"
                        onClick={() => setMenuOpen(false)}
                        className="rounded-lg bg-white px-5 py-3 text-center font-semibold text-blue-600 transition-colors duration-200 hover:bg-blue-50"
                    >
                        Add Supplier
                    </Link>

                </nav>

            </div>

            {/* Mobile Drawer Overlay */}
            {menuOpen && (
                <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 z-30 h-3/4 w-3/4 bg-black/30 md:hidden"
                    aria-label="Close menu"
                />
            )}
        </header>
    )
}