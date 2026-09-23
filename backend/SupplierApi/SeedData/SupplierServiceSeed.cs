using SupplierApi.Enums;

namespace SupplierApi.SeedData
{

    public class SupplierServiceSeed
    {
        public string SeedKey { get; set; } = string.Empty;
        public string ServiceName { get; set; } = string.Empty;
        public string ServiceDescription { get; set; } = string.Empty;
        
        public decimal Price { get; set; }
        public PricingUnit PricingUnit { get; set; } 
        public int Duration { get; set; }
        public DurationUnit DurationUnit { get; set; }
    }
}