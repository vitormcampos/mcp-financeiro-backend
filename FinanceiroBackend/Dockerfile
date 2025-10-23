# Usa a imagem oficial do .NET SDK como build environment
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build-env
WORKDIR /app

# Copia os arquivos .csproj de todos os projetos para restaurar as dependências
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["Services/Application.csproj", "Services/"]
COPY ["FinanceiroBackend/Web.csproj", "FinanceiroBackend/"]

# Restaura as dependências
RUN dotnet restore ./FinanceiroBackend/Web.csproj

# Copia todo o código restante para o contêiner
COPY . .

# Publica a aplicação (gera binários e dependências)
RUN dotnet publish ./FinanceiroBackend/Web.csproj -c Release -o /app/out

# Usa a imagem oficial do .NET runtime como runtime environment
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build-env /app/out .

# Expõe a porta 2000 e inicia a aplicação
EXPOSE 2000
ENTRYPOINT ["dotnet", "Web.dll"]
