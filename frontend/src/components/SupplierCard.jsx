import { Link } from "react-router-dom"

export default function SupplierCard({ supplier, index })
{
    function getDescriptionSnippet(description)
    {
        const maxLength = 120

        if (description.length <= maxLength) {
            return description
        }

        return `${description.substring(0, maxLength).trim()}...`
    }
    const isBlue = index % 2 === 0

    return (
        <article
            className={`overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl ${
                isBlue
                    ? "bg-blue-600 text-white"
                    : "bg-gray-400 text-gray-900"
            }`}
        >

            <div className="p-6">

                <p
                    className={`mb-2 text-sm font-semibold uppercase tracking-wide ${
                        isBlue
                            ? "text-blue-100"
                            : "text-blue-600"
                    }`}
                >
                    {supplier.category}
                </p>

                <h3 className="mb-3 text-2xl font-bold">
                    {supplier.name}
                </h3>

                <p
                    className={`mb-4 text-sm leading-6 ${
                        isBlue
                            ? "text-blue-50"
                            : "text-gray-600"
                    }`}
                >
                    {getDescriptionSnippet(supplier.description)}
                </p>

                <p
                    className={`mb-6 text-sm ${
                        isBlue
                            ? "text-blue-100"
                            : "text-gray-500"
                    }`}
                >
                    {supplier.location}
                </p>

                <Link
                    to={`/suppliers/${supplier.id}`}
                    className={`inline-flex rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                        isBlue
                            ? "bg-gray-600 text-white hover:bg-gray-700"
                            : "bg-blue-600 text-black hover:bg-blue-700"
                    }`}
                >
                    View Details
                </Link>

            </div>

        </article>
    )
}