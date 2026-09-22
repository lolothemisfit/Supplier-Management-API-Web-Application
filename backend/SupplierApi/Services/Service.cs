using SupplierApi.Interfaces;
using SupplierApi.DTOs;
using SupplierApi.Data;
using SupplierApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace SupplierApi.Services
{
    public class Service : ISupplierService
    {
        private readonly ApplicationDbContext _context;

        public Service(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SupplierDto>> GetAllSuppliersAsync()
        {
            return await _context.Suppliers
            .Select(s => new SupplierDto
            {
                Id = s.Id,
                Name = s.Name,
                Description = s.Description,
                Category = s.Category,
                Location = s.Location,
                Email = s.Email,
                PhoneNumber = s.PhoneNumber,
                Services = s.Services.Select(service => new SupplierServiceDto
                {
                    Id = service.Id,
                    ServiceName = service.ServiceName,
                    ServiceDescription = service.ServiceDescription,
                    Price = service.Price,
                    PricingUnit = service.PricingUnit,
                    Duration = service.Duration,
                    DurationUnit = service.DurationUnit,
                }).ToList()
            }).ToListAsync();
        
        }

        public async Task<SupplierDto?> GetSupplierByIdAsync(int SupplierId)
        {
            var supplier = await _context.Suppliers
                .Select(s => new SupplierDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    Category = s.Category,
                    Location = s.Location,
                    Email = s.Email,
                    PhoneNumber = s.PhoneNumber,
                    Services = s.Services.Select(service => new SupplierServiceDto
                    {
                        Id = service.Id,
                        ServiceName = service.ServiceName,
                        ServiceDescription = service.ServiceDescription,
                        Price = service.Price,
                        PricingUnit = service.PricingUnit,
                        Duration = service.Duration,
                        DurationUnit = service.DurationUnit,
                    }).ToList()
                }).FirstOrDefaultAsync(s => s.Id == SupplierId);
            return supplier;
        }

        public async Task<SupplierDto> CreateSupplierAsync(CreateSupplierDto createSupplierDto)
        {
            var supplier = new Supplier
            {
                Name = createSupplierDto.Name,
                Description = createSupplierDto.Description,
                Category = createSupplierDto.Category,
                Location = createSupplierDto.Location,
                Email = createSupplierDto.Email,
                PhoneNumber = createSupplierDto.PhoneNumber,
                Services = createSupplierDto.Services.Select(service => new SupplierService
                {
                    ServiceName = service.ServiceName,
                    ServiceDescription = service.ServiceDescription,
                    Price = service.Price,
                    PricingUnit = service.PricingUnit,
                    Duration = service.Duration,
                    DurationUnit = service.DurationUnit,
                }).ToList()
            };

            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();
            
            return new SupplierDto
            {
                Id = supplier.Id,
                Name = supplier.Name,
                Description = supplier.Description,
                Category = supplier.Category,
                Location = supplier.Location,
                Email = supplier.Email,
                PhoneNumber = supplier.PhoneNumber,
                Services = supplier.Services.Select(service => new SupplierServiceDto
                {
                    Id = service.Id,
                    ServiceName = service.ServiceName,
                    ServiceDescription = service.ServiceDescription,
                    Price = service.Price,
                    PricingUnit = service.PricingUnit,
                    Duration = service.Duration,
                    DurationUnit = service.DurationUnit,
                }).ToList()
            };
        }
    }
}