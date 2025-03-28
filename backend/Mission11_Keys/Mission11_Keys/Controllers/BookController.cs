using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Keys.Data;

namespace Mission11_Keys.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookContext _bookContext;

        public BookController(BookContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNumber = 1, string sortBy = "asc", [FromQuery] List<string>? categories = null)
        {
            // Create query object from db table
            var booksQuery = _bookContext.Books.AsQueryable();

            // Ignore "The " when a tital starts with "The " for sorting purposes
            if (sortBy.ToLower() == "desc")
            {
                booksQuery = booksQuery.OrderByDescending(b => b.Title.StartsWith("The ")
                    ? b.Title.Substring(4)
                    : b.Title);
            }
            else
            {
                booksQuery = booksQuery.OrderBy(b => b.Title.StartsWith("The ")
                    ? b.Title.Substring(4)
                    : b.Title);
            }

            // Filter by categories
            if (categories != null && categories.Any())
            {
                booksQuery = booksQuery.Where(b => categories.Contains(b.Category));
            }

            int totalNumberBooks = booksQuery.Count();

            // Main query
            var bookList = booksQuery
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // Return object includes two items
            var returnObject = new
            {
                BookList = bookList,
                TotalNumberBooks = totalNumberBooks
            };

            return Ok(returnObject);
        }

        [HttpGet("AllBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategories);
        }
    }
}
