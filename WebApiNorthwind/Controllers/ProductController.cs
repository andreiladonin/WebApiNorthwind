﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;

namespace WebApiNorthwind.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly NorthwindContext _db;

        public ProductController(NorthwindContext db)
        {
            _db = db;
        }

        [HttpGet]
        public string Get()
        {
            JArray jArray = new JArray();
            List<Product> products = _db.Products.Include(p => p.Category).Include(p=>p.Supplier).ToList();

            foreach (var product in products)
            {
                var obj = new JObject();
                obj["id"] = product.ProductId;
                obj["name"] = product.ProductName;
                obj["category_name"] = product.Category?.CategoryName;
                obj["supplier_name"] = product.Supplier?.CompanyName;

                jArray.Add(obj);

            }
            
            return jArray.ToString() ;
        }


        [HttpPost]
        public ActionResult<Product> Post(Product product)
        {

            if (product == null)
            {
                return BadRequest();
            }

            _db.Products.Add(product);
            _db.SaveChanges();
            return Ok(product);
        }

        [HttpDelete("{id}")]
        public ActionResult<string> DeleteProduct(int? id)
        {
            if (id == null || id <= 0 )
            {
                return BadRequest();
            }

            var obj = _db.Products.Find(id);

            if (obj == null)
            {
                return BadRequest();
            }

            _db.Products.Remove(obj);
            _db.SaveChanges();
            return Ok("Product delleted");
        }
    }

}
