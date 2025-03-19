using System.ComponentModel.DataAnnotations;

namespace Mission11_Keys.Data
{
    public class Book
    {
        [Required]
        public int BookID { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string Publisher { get; set; }
        [Required]
        public string ISBN { get; set; }
        [Required]
        public string Classification { get; set; }
        [Required]
        public string Category { get; set; }
        [Required] 
        public int pageCount { get; set; }
        [Required]
        public int price { get; set; }
    }
}
