using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SupplierApi.Migrations
{
    /// <inheritdoc />
    public partial class AddSeedKeysAndUniqueness : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SupplierServices_SupplierId",
                table: "SupplierServices");

            migrationBuilder.AddColumn<string>(
                name: "SeedKey",
                table: "SupplierServices",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Suppliers",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "SeedKey",
                table: "Suppliers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SupplierServices_SeedKey",
                table: "SupplierServices",
                column: "SeedKey",
                unique: true,
                filter: "[SeedKey] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_SupplierServices_SupplierId_ServiceName",
                table: "SupplierServices",
                columns: new[] { "SupplierId", "ServiceName" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_Name_Category",
                table: "Suppliers",
                columns: new[] { "Name", "Category" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_SeedKey",
                table: "Suppliers",
                column: "SeedKey",
                unique: true,
                filter: "[SeedKey] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SupplierServices_SeedKey",
                table: "SupplierServices");

            migrationBuilder.DropIndex(
                name: "IX_SupplierServices_SupplierId_ServiceName",
                table: "SupplierServices");

            migrationBuilder.DropIndex(
                name: "IX_Suppliers_Name_Category",
                table: "Suppliers");

            migrationBuilder.DropIndex(
                name: "IX_Suppliers_SeedKey",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "SeedKey",
                table: "SupplierServices");

            migrationBuilder.DropColumn(
                name: "SeedKey",
                table: "Suppliers");

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Suppliers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateIndex(
                name: "IX_SupplierServices_SupplierId",
                table: "SupplierServices",
                column: "SupplierId");
        }
    }
}
