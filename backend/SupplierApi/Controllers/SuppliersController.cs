using SupplierApi.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SupplierApi.DTOs;
using SupplierApi.Enums;

namespace SupplierApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SuppliersController : ControllerBase
    {
        private readonly ISupplierService _supplierService;
    
        public SuppliersController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSuppliers()
        {
            var suppliers = await _supplierService.GetAllSuppliersAsync();

            return Ok(suppliers);
        }

        [HttpGet("{supplierId}")]
        public async Task<IActionResult> GetSupplierById(int supplierId)
        {
            var supplier = await _supplierService.GetSupplierByIdAsync(supplierId);
            if (supplier == null)
            {
                return NotFound();
            }

            return Ok(supplier);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSupplier(CreateSupplierDto createSupplierDto)
        {
            var newSupplier = await _supplierService.CreateSupplierAsync(createSupplierDto);
            return CreatedAtAction(nameof(GetSupplierById), new { supplierId = newSupplier.Id}, newSupplier);
        }

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            return Ok(Enum.GetNames<SupplierCategory>());
        }

        [HttpGet("pricingUnit")]
        public IActionResult GetPricingUnits()
        {
            return Ok(Enum.GetNames<PricingUnit>());
        }

        [HttpGet("durationUnit")]
        public IActionResult GetDurationUnits()
        {
            return Ok(Enum.GetNames<DurationUnit>());
        }

    }
}