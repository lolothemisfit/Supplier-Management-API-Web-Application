using SupplierApi.Enums;

namespace SupplierApi.Entities
{
    public class SupplierService
    {
        public int Id { get; set; }
        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; } = null!;
        public string ServiceName { get; set; } = string.Empty;
        public string ServiceDescription { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public PricingUnit PricingUnit { get; set; }
        public int Duration { get; set; }
        public DurationUnit DurationUnit { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? SeedKey { get; set; }
        public bool IsActive { get; set; } = true;
    }
}