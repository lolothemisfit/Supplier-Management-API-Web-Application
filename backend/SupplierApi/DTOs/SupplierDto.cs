using SupplierApi.Enums;

namespace SupplierApi.DTOs
{
    public class SupplierDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public SupplierCategory Category { get; set; }
        public string Location { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public ICollection<SupplierServiceDto> Services { get; set; } = new List<SupplierServiceDto>();
    }
}