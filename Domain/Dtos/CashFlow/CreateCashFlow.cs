using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain.Dtos.CashFlow;

public class CreateCashFlow
{
    [Required]
    public required string Description { get; init; }

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "The amount must be greater than zero.")]
    public decimal Amount { get; init; }

    [AllowedValues(
        "PENDING",
        "PAID",
        ErrorMessage = "Invalid status. Allowed values: PENDING, PAID."
    )]
    public required string Status { get; init; }

    [Required]
    [AllowedValues(
        "INCOME",
        "EXPENSE",
        "INVESTMENT",
        ErrorMessage = "Invalid type. Allowed values: INCOME, EXPENSE, or INVESTMENT."
    )]
    public required string Type { get; init; }

    [JsonIgnore]
    public string? UserId { get; set; }
}
