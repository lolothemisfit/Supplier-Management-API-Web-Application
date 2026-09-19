# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY ["SupplierApi.csproj", "./"]

RUN dotnet restore "SupplierApi.csproj"

COPY . .

RUN dotnet publish "SupplierApi.csproj" -c Release -o /app/publish --no-restore


# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime

WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "SupplierApi.dll"]