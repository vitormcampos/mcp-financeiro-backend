using Domain;
using Domain.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class ContaService(FinanceiroContext context)
{
    public async Task<IEnumerable<Conta>> GetAllAsync(ContasGetAll query)
    {
        var queryable = context.Contas.AsQueryable();

        if (query.Description is not null)
        {
            queryable = queryable.Where(c => c.Description.Contains(query.Description));
        }

        if (query.MinValue > 0)
        {
            queryable = queryable.Where(c => c.Amount >= query.MinValue);
        }

        if (query.MaxValue > 0)
        {
            queryable = queryable.Where(c => c.Amount <= query.MaxValue);
        }

        if (query.Month > 0)
        {
            queryable = queryable.Where(c => c.Mouth == query.Month);
        }

        if (query.Year > 0)
        {
            queryable = queryable.Where(c => c.Year == query.Year);
        }

        if (!string.IsNullOrEmpty(query.Status))
        {
            queryable = queryable.Where(c => c.Status == query.Status);
        }

        if (!string.IsNullOrEmpty(query.Type))
        {
            queryable = queryable.Where(c => c.Type == query.Type);
        }

        queryable = queryable.Where(c => c.UserId == query.UserId);

        return await queryable.ToListAsync();
    }

    public async Task<Conta> AddAsync(CreateConta createContaconta)
    {
        var conta = new Conta
        {
            Id = Guid.NewGuid().ToString(),
            Description = createContaconta.Description,
            Amount = createContaconta.Amount,
            Status = createContaconta.Status,
            Type = createContaconta.Type,
            Mouth = DateTime.UtcNow.Month,
            Year = DateTime.UtcNow.Year,
            CreatedAt = DateTime.UtcNow,
            UserId = createContaconta.UserId!,
        };

        context.Contas.Add(conta);
        await context.SaveChangesAsync();

        return conta;
    }

    public async Task<Conta> GetByIdAsync(string id, string userId)
    {
        return await context.Contas.FirstAsync(c =>
            (c.Id == id || c.Description.Contains(id)) && c.UserId == userId
        );
    }

    public async Task<Conta> UpdateAsync(string id, CreateConta createContaconta)
    {
        context
            .Contas.Where(c => c.Id == id && c.UserId == createContaconta.UserId)
            .ExecuteUpdate(c =>
                c.SetProperty(c => c.Description, createContaconta.Description)
                    .SetProperty(c => c.Amount, createContaconta.Amount)
                    .SetProperty(c => c.Status, createContaconta.Status)
            );

        await context.SaveChangesAsync();

        var conta = await context.Contas.FirstAsync(c => c.Id == id);
        return conta;
    }

    public async Task DeleteAsync(string id, string userId)
    {
        await context.Contas.Where(c => c.Id == id && c.UserId == userId).ExecuteDeleteAsync();
    }
}
