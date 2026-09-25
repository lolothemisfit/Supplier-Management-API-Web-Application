import { getPricingUnit, getDurationUnit } from "../services/SupplierApi"
import { useState, useEffect } from "react"

export default function ServiceForm({ services, setSupplierForm })
{
    const [pricingUnits, setPricingUnits] = useState([])
    const [durationUnits, setDurationUnits] = useState([])

    const [service, setService] = useState({
        serviceName: '',
        serviceDescription: '',
        price: '',
        pricingUnit: '',
        duration: '',
        durationUnit: ''
    })

    const [serviceErrors, setServiceErrors] = useState({})

    const handleChange = (e) => {
        setService({
            ...service,
            [e.target.name]: e.target.value
        })

        setServiceErrors({
            ...serviceErrors,
            [e.target.name]: ''
        })
    }

    useEffect(() => {
        async function loadUnits() {
            const pricingData = await getPricingUnit()
            const durationData = await getDurationUnit()

            setPricingUnits(pricingData)
            setDurationUnits(durationData)
        }

        loadUnits()
    }, [])

    const validateService = () => {
        const newErrors = {}

        const serviceName = service.serviceName.trim()
        const serviceDescription = service.serviceDescription.trim()

        if (!serviceName) {
            newErrors.serviceName = "Service name is required"
        }
        else if (serviceName.length > 255) {
            newErrors.serviceName = "Service name cannot exceed 255 characters"
        }

        if (!serviceDescription) {
            newErrors.serviceDescription = "Service description is required"
        }
        else if (serviceDescription.length > 1000) {
            newErrors.serviceDescription = "Service description cannot exceed 1000 characters"
        }

        if (service.price === '' || Number(service.price) < 0) {
            newErrors.price = "Price must be 0.00 or greater"
        }

        if (!service.pricingUnit) {
            newErrors.pricingUnit = "Please select a pricing unit"
        }

        if (service.duration === '' || Number(service.duration) < 1) {
            newErrors.duration = "Duration must be at least 1"
        }

        if (!service.durationUnit) {
            newErrors.durationUnit = "Please select a duration unit"
        }

        setServiceErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const addService = () => {
        if (!validateService()) {
            return
        }

        setSupplierForm((currentForm) => ({
            ...currentForm,
            services: [
                ...currentForm.services,
                {
                    ...service,
                    price: Number(service.price),
                    duration: Number(service.duration)
                }
            ]
        }))

        setService({
            serviceName: '',
            serviceDescription: '',
            price: '',
            pricingUnit: '',
            duration: '',
            durationUnit: ''
        })

        setServiceErrors({})
    }

    const removeService = (indexToRemove) => {
        setSupplierForm((currentForm) => ({
            ...currentForm,
            services: currentForm.services.filter(
                (_, index) => index !== indexToRemove
            )
        }))
    }

    return (
        <section>

            <h2 className="mb-5 text-2xl font-bold text-gray-900">
                Add Service
            </h2>

            {/* Service Form */}
            <div className="space-y-5">

                {/* Service Name */}
                <div>
                    <label
                        htmlFor="serviceName"
                        className="mb-2 block text-sm font-medium text-gray-900"
                    >
                        Service Name
                    </label>

                    <input
                        id="serviceName"
                        name="serviceName"
                        type="text"
                        value={service.serviceName}
                        onChange={handleChange}
                        placeholder="Service Name"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {serviceErrors.serviceName && (
                        <p className="mt-1 text-sm text-red-600">
                            {serviceErrors.serviceName}
                        </p>
                    )}
                </div>

                {/* Service Description */}
                <div>
                    <label
                        htmlFor="serviceDescription"
                        className="mb-2 block text-sm font-medium text-gray-900"
                    >
                        Service Description
                    </label>

                    <textarea
                        id="serviceDescription"
                        name="serviceDescription"
                        value={service.serviceDescription}
                        onChange={handleChange}
                        placeholder="Service Description"
                        rows="3"
                        className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {serviceErrors.serviceDescription && (
                        <p className="mt-1 text-sm text-red-600">
                            {serviceErrors.serviceDescription}
                        </p>
                    )}
                </div>

                {/* Price + Pricing Unit */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div>
                        <label
                            htmlFor="price"
                            className="mb-2 block text-sm font-medium text-gray-900"
                        >
                            Price
                        </label>

                        <input
                            id="price"
                            name="price"
                            type="number"
                            min="0"
                            value={service.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {serviceErrors.price && (
                            <p className="mt-1 text-sm text-red-600">
                                {serviceErrors.price}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="pricingUnit"
                            className="mb-2 block text-sm font-medium text-gray-900"
                        >
                            Pricing Unit
                        </label>

                        <select
                            id="pricingUnit"
                            name="pricingUnit"
                            value={service.pricingUnit}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>
                                Select pricing unit
                            </option>

                            {pricingUnits.map((pricingUnit) => (
                                <option
                                    key={pricingUnit}
                                    value={pricingUnit}
                                >
                                    {pricingUnit}
                                </option>
                            ))}
                        </select>

                        {serviceErrors.pricingUnit && (
                            <p className="mt-1 text-sm text-red-600">
                                {serviceErrors.pricingUnit}
                            </p>
                        )}
                    </div>

                </div>

                {/* Duration + Duration Unit */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div>
                        <label
                            htmlFor="duration"
                            className="mb-2 block text-sm font-medium text-gray-900"
                        >
                            Duration
                        </label>

                        <input
                            id="duration"
                            name="duration"
                            type="number"
                            min="1"
                            value={service.duration}
                            onChange={handleChange}
                            placeholder="Duration"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {serviceErrors.duration && (
                            <p className="mt-1 text-sm text-red-600">
                                {serviceErrors.duration}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="durationUnit"
                            className="mb-2 block text-sm font-medium text-gray-900"
                        >
                            Duration Unit
                        </label>

                        <select
                            id="durationUnit"
                            name="durationUnit"
                            value={service.durationUnit}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>
                                Select duration unit
                            </option>

                            {durationUnits.map((durationUnit) => (
                                <option
                                    key={durationUnit}
                                    value={durationUnit}
                                >
                                    {durationUnit}
                                </option>
                            ))}
                        </select>

                        {serviceErrors.durationUnit && (
                            <p className="mt-1 text-sm text-red-600">
                                {serviceErrors.durationUnit}
                            </p>
                        )}
                    </div>

                </div>

                {/* Add Service Button */}
                <div>
                    <button
                        type="button"
                        onClick={addService}
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700"
                    >
                        Add Service
                    </button>
                </div>

            </div>

            {/* Added Services */}
            {services.length > 0 && (
                <div className="mt-8 border-t border-gray-300 pt-6">

                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Added Services
                    </h3>

                    <div className="space-y-4">

                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-white p-5 shadow-sm"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">
                                            {service.serviceName}
                                        </h4>

                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            {service.serviceDescription}
                                        </p>

                                        <div className="mt-3 space-y-1 text-sm">
                                            <p className="font-semibold text-blue-600">
                                                R{Number(service.price).toFixed(2)}
                                            </p>

                                            <p className="text-gray-600">
                                                {service.pricingUnit}
                                            </p>

                                            <p className="text-gray-600">
                                                {service.duration} {service.durationUnit}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeService(index)}
                                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-red-700"
                                    >
                                        Remove Service
                                    </button>

                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            )}

        </section>
    )
}