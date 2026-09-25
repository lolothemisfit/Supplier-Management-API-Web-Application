import { Link } from "react-router-dom"

export default function Hero()
{
    return (
        <section className="bg-gray-400 pt-32 pb-20 w-full">

            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="max-w-3xl">

                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                        Supplier Management System
                    </p>

                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                        Your Travel Supplier Network, Simplified
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-white">
                        Discover, manage, and organise travel suppliers and the services they provide from a single platform.
                    </p>

                    <div className="mt-8">
                        <Link
                            to="/suppliers/add"
                            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700"
                        >
                            Add Supplier
                        </Link>
                    </div>

                </div>

            </div>

        </section>
    )
}