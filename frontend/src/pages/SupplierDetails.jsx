import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getSupplierById } from "../services/SupplierApi"
import Header from "../components/Header"

function formatEnum(value)
{
    if (!value) {
        return ""
    }

    return value.replace(/([a-z])([A-Z])/g, "$1 $2")
}

export default function SupplierDetails()
{
    const { id } = useParams()

    const [supplier, setSupplier] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function loadSupplier()
        {
            try {
                const data = await getSupplierById(id)
                setSupplier(data)
            }
            catch (error) {
                console.error("Error loading supplier:", error)
                setError("Unable to load supplier.")
            }
            finally {
                setIsLoading(false)
            }
        }

        loadSupplier()
    }, [id])

    if (isLoading) {
        return (
            <>
                <Header />

                <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6 pt-24">
                    <p className="text-gray-600">
                        Loading supplier...
                    </p>
                </main>
            </>
        )
    }

    if (error || !supplier) {
        return (
            <>
                <Header />

                <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 pt-24">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Supplier not found
                    </h1>

                    <p className="mt-2 text-gray-600">
                        We could not find the supplier you are looking for.
                    </p>

                    <Link
                        to="/"
                        className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
                    >
                        Back to Suppliers
                    </Link>
                </main>
            </>
        )
    }

    return (
        <>
            <Header />

            <main className="min-h-screen bg-gray-100 px-6 pb-16 pt-32">

                <div className="mx-auto max-w-7xl">

                    {/* Back Link */}
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                        ← Back to Suppliers
                    </Link>

                    {/* Supplier Header */}
                    <section className="mt-6 overflow-hidden rounded-xl bg-white shadow-md">

                        <div className="bg-blue-600 px-6 py-8 text-white md:px-10">

                            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-100">
                                {supplier.category}
                            </p>

                            <h1 className="text-3xl font-bold md:text-4xl">
                                {supplier.name}
                            </h1>

                            <p className="mt-3 text-blue-100">
                                {supplier.location}
                            </p>

                        </div>

                        <div className="px-6 py-8 md:px-10 bg-gray-400">

                            <h2 className="text-xl font-bold text-gray-900">
                                About this supplier
                            </h2>

                            <p className="mt-4 max-w-4xl leading-7 text-white">
                                {supplier.description}
                            </p>

                        </div>

                    </section>

                    {/* Contact Information */}
                    <section className="mt-8">

                        <h2 className="mb-4 text-2xl font-bold text-gray-900">
                            Contact Information
                        </h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                            <div className="rounded-xl bg-gray-400 p-6 shadow-md">
                                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                                    Email
                                </p>

                                <p className="mt-2 text-gray-800">
                                    {supplier.email}
                                </p>
                            </div>

                            <div className="rounded-xl bg-gray-400 p-6 shadow-md">
                                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                                    Phone
                                </p>

                                <p className="mt-2 text-gray-800">
                                    {supplier.phoneNumber}
                                </p>
                            </div>

                        </div>

                    </section>

                    {/* Services */}
                    <section className="mt-10">

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Services
                            </h2>

                            <p className="mt-2 text-gray-600">
                                Services offered by {supplier.name}.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                            {supplier.services.map((service) => (
                                <article
                                    key={service.id}
                                    className="rounded-xl bg-gray-400 p-6 shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
                                >

                                    <h3 className="text-xl font-bold text-blue-600">
                                        {service.serviceName}
                                    </h3>

                                    <p className="mt-3 leading-6 text-gray-800">
                                        {service.serviceDescription}
                                    </p>

                                    <div className="mt-6 border-t border-gray-200 pt-4">

                                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">

                                            <p>
                                                <span className="font-semibold text-gray-900">
                                                    Price:
                                                </span>{" "}
                                                R{Number(service.price).toFixed(2)}
                                            </p>

                                            <p>
                                                <span className="font-semibold text-gray-900">
                                                    Pricing:
                                                </span>{" "}
                                                {formatEnum(service.pricingUnit)}
                                            </p>

                                            <p>
                                                <span className="font-semibold text-gray-900">
                                                    Duration:
                                                </span>{" "}
                                                {service.duration}{" "}
                                                {formatEnum(service.durationUnit)}
                                            </p>

                                        </div>

                                    </div>

                                </article>
                            ))}

                        </div>

                    </section>

                </div>

            </main>
        </>
    )
}