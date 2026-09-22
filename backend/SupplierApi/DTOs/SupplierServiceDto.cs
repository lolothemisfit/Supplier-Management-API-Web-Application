using SupplierApi.Enums;

namespace SupplierApi.DTOs
{
    public class SupplierServiceDto
    {
        public int Id { get; set; }
        public string ServiceName { get; set; } = string.Empty;
        public string ServiceDescription { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public PricingUnit PricingUnit { get; set; }
        public int Duration { get; set; }
        public DurationUnit DurationUnit { get; set; }
    }
}