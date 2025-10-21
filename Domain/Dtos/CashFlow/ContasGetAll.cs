namespace Domain.Dtos.CashFlow;

public record CashFlowsGetAll(
    string? Description,
    decimal? MinValue,
    decimal? MaxValue,
    sbyte? Month,
    short? Year,
    string? Status,
    string? Type,
    string? UserId
);
