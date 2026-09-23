using SupplierApi.Enums;

namespace SupplierApi.SeedData
{
    public class SupplierSeed
    {
        public string SeedKey { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public SupplierCategory Category { get; set; }
        public string Location { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public ICollection<SupplierServiceSeed> Services { get; set; } = new List<SupplierServiceSeed>();
    }
    
}