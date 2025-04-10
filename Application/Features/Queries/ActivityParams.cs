using Application.Pagination;

namespace Application.Features.Queries
{
    public class ActivityParams : PaginationParams<DateTime?>
    {
        public string? Filter { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}
