using System.ComponentModel.DataAnnotations;
using SupplierApi.Enums;

namespace SupplierApi.DTOs
{
    public class CreateSupplierServiceDto
    {
        [Required]
        [MaxLength(255)]
        public string ServiceName { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string ServiceDescription { get; set; } = string.Empty;

        [Range(typeof(decimal), "0.00", "9999999999999999.99")]
        public decimal Price { get; set; }

        [EnumDataType(typeof(PricingUnit))]
        public PricingUnit PricingUnit { get; set; }

        [Range(1, int.MaxValue)]
        public int Duration { get; set; }

        [EnumDataType(typeof(DurationUnit))]
        [Range(1, int.MaxValue)]
        public DurationUnit DurationUnit { get; set; }
    }
}