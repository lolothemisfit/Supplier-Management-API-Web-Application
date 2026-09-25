using System.ComponentModel.DataAnnotations;
using SupplierApi.Enums;

namespace SupplierApi.DTOs
{
    public class CreateSupplierDto
    {
        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [EnumDataType(typeof(SupplierCategory))]
        public SupplierCategory Category { get; set; }

        [Required]
        [MaxLength(200)]
        public string Location { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(254)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        [MaxLength(100)]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        [MinLength(1)]
        public ICollection<CreateSupplierServiceDto> Services { get; set; } = new List<CreateSupplierServiceDto>();
    }
}