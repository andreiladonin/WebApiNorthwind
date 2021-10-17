using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace WebApiNorthwind.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly NorthwindContext _db;

        public CategoriesController(NorthwindContext db)
        {
            _db = db;
        }

        [HttpGet]
        public string Get()
        {
            JArray jArray = new JArray();

            List<Category> categories = _db.Categories.ToList();
            if (categories == null)
            {
                return null;
            }

            foreach (var category in categories)
            {
                var obj = new JObject();
                obj["id"] = category.CategoryId;
                obj["name"] = category.CategoryName;
                obj["desc"] = category.Description;

                jArray.Add(obj);
            }

            return jArray.ToString();
        }

        [HttpPost]
        public async Task<ActionResult<Category>> Post(Category category)
        {
            if (category == null)
            {
                return BadRequest();
            }

            _db.Categories.Add(category);
            await _db.SaveChangesAsync();
            return Ok(category);
        }
    }
}
