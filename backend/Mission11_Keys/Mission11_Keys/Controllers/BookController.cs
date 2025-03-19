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
        public IActionResult GetBooks(int pageSize = 5, int pageNumber = 1, string sortBy = "asc")
        {
            var booksQuery = _bookContext.Books.AsQueryable();

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

            var bookList = booksQuery
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var returnObject = new
            {
                BookList = bookList,
                TotalNumberBooks = _bookContext.Books.Count()
            };

            return Ok(returnObject);
        }
    }
}
