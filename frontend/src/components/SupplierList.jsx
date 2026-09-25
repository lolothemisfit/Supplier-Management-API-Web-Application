import SupplierCard from "./SupplierCard"

export default function SupplierList({ suppliers })
{
    return (
        <section className="w-full bg-white px-6 py-16 md:px-20">

            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-blue-600">
                        Travel Suppliers
                    </h2>

                    <p className="mt-3 text-gray-600">
                        Browse and manage suppliers and the services they offer.
                    </p>
                </div>

                {/* Supplier Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {suppliers.map((supplier, index) => (
                        <SupplierCard
                            key={supplier.id}
                            supplier={supplier}
                            index={index}
                        />
                    ))}

                </div>

            </div>

        </section>
    )
}