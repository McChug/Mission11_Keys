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

        [HttpGet(Name = "GetBook")]
        public IEnumerable<Book> Get()
        {
            var bookList = _bookContext.Books.ToList();

            return bookList;
        }
    }
}
