using System.Text.Json;
using SupplierApi.Data;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using SupplierApi.Entities;


namespace SupplierApi.SeedData
{
    public class DatabaseSeeder
    {
        private readonly ApplicationDbContext _dbContext;

        public DatabaseSeeder(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task SeedAsync()
        {
            var seedFilePath = Path.Combine(
                AppContext.BaseDirectory,
                "SeedData",
                "supplier-seed.json"
            );

            var json = await File.ReadAllTextAsync(seedFilePath);

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            options.Converters.Add(new JsonStringEnumConverter());
        
            var seedData = JsonSerializer.Deserialize<SeedData>(json, options);

            if (seedData == null)
            {
                throw new InvalidOperationException("Seed data could not be loaded.");
            }

            if (seedData.Suppliers.Count == 0)
            {
                throw new InvalidOperationException("Seed data contains no suppliers");
            }

            foreach (var supplierSeed in seedData.Suppliers)
            {
                var existingSupplier = await _dbContext.Suppliers
                    .FirstOrDefaultAsync(supplier => supplier.SeedKey == supplierSeed.SeedKey);

                Supplier supplier;

                if (existingSupplier == null)
                {
                    supplier = new Supplier
                    {
                        SeedKey = supplierSeed.SeedKey,
                        Name = supplierSeed.Name,
                        Description = supplierSeed.Description,
                        Category = supplierSeed.Category,
                        Location = supplierSeed.Location,
                        Email = supplierSeed.Email,
                        PhoneNumber = supplierSeed.PhoneNumber
                    };

                    _dbContext.Suppliers.Add(supplier);
                }
                else
                {
                    supplier = existingSupplier;
                }

                // service processing will go here
                foreach (var serviceSeed in supplierSeed.Services)
                {
                    var existingService = await _dbContext.SupplierServices
                        .FirstOrDefaultAsync(service => service.SeedKey == serviceSeed.SeedKey);

                    if (existingService == null)
                    {
                        var newService = new SupplierService
                        {
                            SeedKey = serviceSeed.SeedKey,
                            ServiceName = serviceSeed.ServiceName,
                            ServiceDescription = serviceSeed.ServiceDescription,
                            Price = serviceSeed.Price,
                            PricingUnit = serviceSeed.PricingUnit,
                            Duration = serviceSeed.Duration,
                            DurationUnit = serviceSeed.DurationUnit,
                            Supplier = supplier
                        };

                        _dbContext.SupplierServices.Add(newService);
                    }
                }
            }
            await _dbContext.SaveChangesAsync();
        }
    }
}