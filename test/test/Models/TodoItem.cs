using System.ComponentModel.DataAnnotations;

namespace test.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        [Required]
        public string ?Title { get; set; }
        public bool IsCompleted { get; set; }
    }
}
