const API_BASE_URL = "http://localhost:5288";

export async function getSuppliers()
{
    const response = await fetch(`${API_BASE_URL}/api/Suppliers`);
    return await response.json();
}

export async function getSupplierById(id)
{
    const response = await fetch(`${API_BASE_URL}/api/Suppliers/${id}`)
    return await response.json()
}

export async function createSupplier(createSupplierDto)
{
    try {
        const response = await fetch(`${API_BASE_URL}/api/Suppliers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createSupplierDto)
        })

        if (!response.ok) {
            throw new Error("Failed to create supplier")
        }

        return await response.json()
    }
    catch (error) {
        console.error("Error creating supplier...")
    }
}

export async function getCategory()
{
    const response = await fetch(`${API_BASE_URL}/api/Suppliers/categories`)
    return await response.json()
}

export async function getPricingUnit()
{
    const response = await fetch(`${API_BASE_URL}/api/Suppliers/pricingUnit`)
    return await response.json()
}

export async function getDurationUnit()
{
    const response = await fetch(`${API_BASE_URL}/api/Suppliers/durationUnit`)
    return await response.json()
}

