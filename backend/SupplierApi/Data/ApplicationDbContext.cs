using Microsoft.EntityFrameworkCore;

namespace SupplierApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options)
        {
        }

        public DbSet<Entities.Supplier> Suppliers { get; set; } = null!;
        public DbSet<Entities.SupplierService> SupplierServices { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Entities.Supplier>(entity =>
            {
                entity.HasKey(supplier => supplier.Id);
                entity.Property(supplier => supplier.Name).HasMaxLength(255).IsRequired();
                entity.Property(supplier => supplier.Description).HasMaxLength(1000).IsRequired();
                entity.Property(supplier => supplier.Category).HasConversion<string>().IsRequired();
                entity.Property(supplier => supplier.Location).HasMaxLength(200).IsRequired();
                entity.Property(supplier => supplier.Email).HasMaxLength(254).IsRequired();
                entity.Property(supplier => supplier.PhoneNumber).HasMaxLength(30).IsRequired();
                entity.Property(supplier => supplier.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
                entity.Property(supplier => supplier.UpdatedAt).HasDefaultValueSql("GETUTCDATE()");

                entity.HasIndex(supplier => new { supplier.Name, supplier.Category }).IsUnique();
                entity.HasIndex(supplier => supplier.SeedKey).IsUnique().HasFilter("[SeedKey] IS NOT NULL");

                entity.HasMany(supplier => supplier.Services)
                    .WithOne(service => service.Supplier)
                    .HasForeignKey(service => service.SupplierId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Entities.SupplierService>(entity =>
            {
                entity.HasKey(service => service.Id);
                entity.Property(service => service.ServiceName).HasMaxLength(255).IsRequired();
                entity.Property(service => service.ServiceDescription).HasMaxLength(1000).IsRequired();
                entity.Property(service => service.Price).HasPrecision(18, 2).IsRequired();
                entity.Property(service => service.PricingUnit).HasConversion<string>().IsRequired();
                entity.Property(service => service.Duration).IsRequired();
                entity.Property(service => service.DurationUnit).HasConversion<string>().IsRequired();
                entity.Property(service => service.CreatedAt).HasDefaultValueSql("GETUTCDATE()");

                entity.HasIndex(service => new { service.SupplierId, service.ServiceName }).IsUnique();
                entity.HasIndex(service => service.SeedKey).IsUnique().HasFilter("[SeedKey] IS NOT NULL");
            });
        }
    }
}