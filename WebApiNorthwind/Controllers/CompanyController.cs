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
    public class CompanyController : ControllerBase
    {

        private readonly NorthwindContext _db;

        public CompanyController(NorthwindContext db)
        {
            _db = db;
        }

        [HttpGet]
        public string GetSuppliers()
        {

            JArray array = new JArray();

            var company = _db.Suppliers.ToList();

            foreach (var item in company)
            {
                JObject obj = new JObject();

                obj["id"] = item.SupplierId;
                obj["company"] = item.CompanyName;

                array.Add(obj);
            }

            return array.ToString();
        }
    }
}
