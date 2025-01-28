using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using test.Models;

namespace test.Data
{
    public class TodoContext : DbContext
    {
        public DbSet<TodoItem> TodoItems {  get; set; }
        public TodoContext (DbContextOptions<TodoContext> options)  : base(options)
        {

        }
    }
}
