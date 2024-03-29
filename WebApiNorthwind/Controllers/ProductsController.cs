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
    public class ProductsController : ControllerBase
    {
        private readonly NorthwindContext _db;

        public ProductsController(NorthwindContext db)
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
        public IActionResult DeleteProduct(int? id)
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

            try
            {
                _db.Products.Remove(obj);
                _db.SaveChanges();
                return Ok();
            }
            catch (DbUpdateException ex)
            {
                var jObject = new JObject();

                
                jObject["message"] = ex.InnerException.Message;
                jObject["Source"] = ex.InnerException.Source;

                jObject["EntityCount"] = ex.Entries.Count();
                foreach (var item in ex.Entries)
                {
                    var product = new JObject();
                    product["ProductId"] = ((Product)item.Entity).ProductId;
                    product["ProductName"] = ((Product)item.Entity).ProductName;
                    product["CategoryId"] = ((Product)item.Entity).CategoryId;
                    product["SupplierId"] = ((Product)item.Entity).SupplierId;

                    jObject["EntityObject"] = product;
                }

               
                
                return Conflict(jObject.ToString()) ;
            }



        }
        
        [HttpPut("{id}")]
        public IActionResult ChangeProduct(int id, Product product)
        {
            return null;
        }
    }

}
