import { createSupplier, getCategory, getSuppliers } from "../services/SupplierApi"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import ServiceForm from "../components/ServiceForm"

import Header from "../components/Header"
import Footer from "../components/Footer"

export default function AddSupplier()
{
    const navigate = useNavigate()

    const [supplierForm, setSupplierForm] = useState({
        name: '',
        description: '',
        category: '',
        location: '',
        email: '',
        phoneNumber: '',
        services: []
    })

    const [categories, setCategories] = useState([])
    const [showServices, setShowServices] = useState(false)

    const [phoneInput, setPhoneInput] = useState('')
    const [phoneNumbers, setPhoneNumbers] = useState([])

    const [errors, setErrors] = useState({})
    const [submitError, setSubmitError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    useEffect(() => {
        async function loadCategories()
        {
            const data = await getCategory()
            setCategories(data)
        }

        loadCategories()
    }, [])

    const handleChange = (e) => {
        setSupplierForm({
            ...supplierForm,
            [e.target.name]: e.target.value
        })

        setErrors({
            ...errors,
            [e.target.name]: ''
        })

        setSubmitError('')
    }

    const handlePhoneInputChange = (e) => {
        setPhoneInput(e.target.value)

        setErrors({
            ...errors,
            phoneNumber: ''
        })

        setSubmitError('')
    }

    const getPhoneNumberError = (phoneNumber) => {
        const trimmedNumber = phoneNumber.trim()

        if (!trimmedNumber) {
            return "Phone number is required"
        }

        const digitsOnly = trimmedNumber.replace(/[\s\-()]/g, "")

        if (!/^\+\d+$/.test(digitsOnly)) {
            return "Phone number must use international format, e.g. +27 81 457 5566"
        }

        const digitCount = digitsOnly.substring(1).length

        if (digitCount < 7 || digitCount > 15) {
            return "Phone number must contain between 7 and 15 digits"
        }

        return ""
    }

    const addPhoneNumber = () => {
        const phoneError = getPhoneNumberError(phoneInput)

        if (phoneError) {
            setErrors({
                ...errors,
                phoneNumber: phoneError
            })

            return
        }

        const formattedNumber = phoneInput.trim()

        if (phoneNumbers.includes(formattedNumber)) {
            setErrors({
                ...errors,
                phoneNumber: "This phone number has already been added"
            })

            return
        }

        const updatedPhoneNumbers = [
            ...phoneNumbers,
            formattedNumber
        ]

        const combinedPhoneNumbers = updatedPhoneNumbers.join(', ')

        if (combinedPhoneNumbers.length > 100) {
            setErrors({
                ...errors,
                phoneNumber: "Phone numbers cannot exceed 100 characters in total"
            })

            return
        }

        setPhoneNumbers(updatedPhoneNumbers)

        setSupplierForm({
            ...supplierForm,
            phoneNumber: combinedPhoneNumbers
        })

        setPhoneInput('')

        setErrors({
            ...errors,
            phoneNumber: ''
        })
    }

    const removePhoneNumber = (indexToRemove) => {
        const updatedPhoneNumbers = phoneNumbers.filter(
            (_, index) => index !== indexToRemove
        )

        setPhoneNumbers(updatedPhoneNumbers)

        setSupplierForm({
            ...supplierForm,
            phoneNumber: updatedPhoneNumbers.join(', ')
        })

        setErrors({
            ...errors,
            phoneNumber: ''
        })
    }

    const validateForm = () => {
        const newErrors = {}

        const name = supplierForm.name.trim()
        const description = supplierForm.description.trim()
        const location = supplierForm.location.trim()
        const email = supplierForm.email.trim()
        const phoneNumber = supplierForm.phoneNumber.trim()

        if (!name) {
            newErrors.name = "Supplier name is required"
        }
        else if (name.length > 255) {
            newErrors.name = "Supplier name cannot exceed 255 characters"
        }

        if (!description) {
            newErrors.description = "Supplier description is required"
        }
        else if (description.length > 1000) {
            newErrors.description = "Supplier description cannot exceed 1000 characters"
        }

        if (!supplierForm.category) {
            newErrors.category = "Please select a category"
        }

        if (!location) {
            newErrors.location = "Location is required"
        }
        else if (location.length > 200) {
            newErrors.location = "Location cannot exceed 200 characters"
        }

        if (!email) {
            newErrors.email = "Email is required"
        }
        else if (email.length > 254) {
            newErrors.email = "Email cannot exceed 254 characters"
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address"
        }

        if (phoneNumbers.length < 1) {
            newErrors.phoneNumber = "Please add at least one phone number"
        }
        else if (phoneNumber.length > 100) {
            newErrors.phoneNumber = "Phone numbers cannot exceed 100 characters in total"
        }

        if (supplierForm.services.length < 1) {
            newErrors.services = "Please add at least one service"
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitError('')

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        const supplierCreateDto = {
            name: supplierForm.name.trim(),
            description: supplierForm.description.trim(),
            category: supplierForm.category,
            location: supplierForm.location.trim(),
            email: supplierForm.email.trim(),
            phoneNumber: supplierForm.phoneNumber.trim(),
            services: supplierForm.services
        }

        try {
            const existingSuppliers = await getSuppliers()

            const alreadyExists = existingSuppliers.some(
                (supplier) =>
                    supplier.name.trim().toLowerCase() === supplierCreateDto.name.toLowerCase() &&
                    supplier.category === supplierCreateDto.category
            )

            if (alreadyExists) {
                setSubmitError(
                    "A supplier with this name and category already exists."
                )

                setIsSubmitting(false)
                return
            }

            await createSupplier(supplierCreateDto)

            setShowSuccessModal(true)
        }
        catch (error) {
            console.error("Error creating supplier:", error)

            if (error.status === 409) {
                setSubmitError(
                    "A supplier with this name and category already exists."
                )

                setIsSubmitting(false)
                return
            }

            if (error.isNetworkError) {
                try {
                    const suppliersAfterError = await getSuppliers()

                    const supplierWasCreated = suppliersAfterError.some(
                        (supplier) =>
                            supplier.name.trim().toLowerCase() === supplierCreateDto.name.toLowerCase() &&
                            supplier.category === supplierCreateDto.category
                    )

                    if (supplierWasCreated) {
                        setShowSuccessModal(true)
                        return
                    }
                }
                catch (reconciliationError) {
                    console.error(
                        "Could not confirm supplier creation:",
                        reconciliationError
                    )
                }

                setSubmitError(
                    "We could not confirm whether the supplier was added. Please check the supplier list before trying again."
                )
            }
            else {
                setSubmitError(
                    error.message ||
                    "Something went wrong while creating the supplier."
                )
            }
        }

        setIsSubmitting(false)
    }

    return (
        <>
     

            <section className="min-h-screen bg-gray-400 px-4 py-24 sm:px-6 md:px-20">

                <h1 className="mb-4 text-center text-3xl font-bold text-blue-600 sm:text-4xl">
                    Add Supplier
                </h1>

                <p className="mx-auto mb-8 max-w-2xl px-2 text-center text-base text-white sm:text-lg">
                    Add a travel supplier and the services they provide.
                </p>

                <div className="flex justify-center">

                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-4xl space-y-6 rounded-2xl bg-white p-5 shadow-lg sm:p-8"
                    >

                        {/* Supplier Information */}
                        <div>

                            <h2 className="mb-5 text-2xl font-bold text-gray-900">
                                Supplier Information
                            </h2>

                            <div className="space-y-5">

                                {/* Supplier Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-medium text-gray-900"
                                    >
                                        Supplier Name
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={supplierForm.name}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-black shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="mb-2 block text-sm font-medium text-gray-900"
                                    >
                                        Description
                                    </label>

                                    <textarea
                                        id="description"
                                        name="description"
                                        value={supplierForm.description}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full resize-none rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-black shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Category + Location */}
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                    <div>
                                        <label
                                            htmlFor="category"
                                            className="mb-2 block text-sm font-medium text-gray-900"
                                        >
                                            Category
                                        </label>

                                        <select
                                            id="category"
                                            name="category"
                                            value={supplierForm.category}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-black shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">
                                                Select category
                                            </option>

                                            {categories.map((category) => (
                                                <option
                                                    key={category}
                                                    value={category}
                                                >
                                                    {category}
                                                </option>
                                            ))}
                                        </select>

                                        {errors.category && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.category}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="location"
                                            className="mb-2 block text-sm font-medium text-gray-900"
                                        >
                                            Location
                                        </label>

                                        <input
                                            id="location"
                                            type="text"
                                            name="location"
                                            value={supplierForm.location}
                                            onChange={handleChange}
                                            autoComplete="off"
                                            className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-black shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                        {errors.location && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.location}
                                            </p>
                                        )}
                                    </div>

                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-gray-900"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        type="text"
                                        name="email"
                                        value={supplierForm.email}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-black shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Phone Numbers */}
                                <div>

                                    <label
                                        htmlFor="phoneNumber"
                                        className="mb-2 block text-sm font-medium text-gray-900"
                                    >
                                        Phone Number
                                    </label>

                                    <div className="flex flex-col gap-3 sm:flex-row">

                                        <input
                                            id="phoneNumber"
                                            type="tel"
                                            value={phoneInput}
                                            onChange={handlePhoneInputChange}
                                            placeholder="+27 81 457 5566"
                                            autoComplete="off"
                                            className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-black shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                        <button
                                            type="button"
                                            onClick={addPhoneNumber}
                                            className="w-full shrink-0 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-700 sm:w-auto"
                                        >
                                            Add Number
                                        </button>

                                    </div>

                                    <p className="mt-2 text-xs text-gray-500">
                                        Use international format, e.g. +27 81 457 5566.
                                    </p>

                                    {errors.phoneNumber && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.phoneNumber}
                                        </p>
                                    )}

                                    {phoneNumbers.length > 0 && (
                                        <div className="mt-4 space-y-2">

                                            {phoneNumbers.map((number, index) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-col gap-2 rounded-xl bg-gray-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                                                >

                                                    <span className="break-all text-sm text-gray-700">
                                                        {number}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() => removePhoneNumber(index)}
                                                        className="w-full shrink-0 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-red-700 sm:w-auto"
                                                    >
                                                        Remove
                                                    </button>

                                                </div>
                                            ))}

                                        </div>
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Services */}
                        <div className="border-t border-gray-200 pt-6">

                            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Services
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Add at least one service offered by this supplier.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowServices(!showServices)}
                                    className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 sm:w-auto"
                                >
                                    {showServices
                                        ? "Hide Service Form"
                                        : "Add Service"}
                                </button>

                            </div>

                            {errors.services && (
                                <p className="mb-4 text-sm text-red-600">
                                    {errors.services}
                                </p>
                            )}

                            {showServices && (
                                <div className="rounded-2xl bg-gray-100 p-4 sm:p-5">

                                    <ServiceForm
                                        services={supplierForm.services}
                                        setSupplierForm={setSupplierForm}
                                    />

                                </div>
                            )}

                        </div>

                        {/* Submit */}
                        <div className="border-t border-gray-200 pt-6">

                            {submitError && (
                                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                                    {submitError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                            >
                                {isSubmitting
                                    ? "Creating Supplier..."
                                    : "Create Supplier"}
                            </button>

                        </div>

                    </form>

                </div>

            </section>
            {showSuccessModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">

                    <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl sm:p-8">

                        <h2 className="text-2xl font-bold text-gray-900">
                            Supplier Added Successfully
                        </h2>

                        <p className="mt-3 text-gray-600">
                            The supplier has been added successfully.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-700"
                        >
                            OK
                        </button>

                    </div>

                </div>
            )}
        </>
    )
}