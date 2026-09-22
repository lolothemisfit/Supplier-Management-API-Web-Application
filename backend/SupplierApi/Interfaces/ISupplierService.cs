using SupplierApi.DTOs;

namespace SupplierApi.Interfaces
{
    public interface ISupplierService
    {
        Task<IEnumerable<SupplierDto>> GetAllSuppliersAsync();
        Task<SupplierDto?> GetSupplierByIdAsync(int supplierId);
        Task<SupplierDto> CreateSupplierAsync(CreateSupplierDto createSupplierDto);
    }
}