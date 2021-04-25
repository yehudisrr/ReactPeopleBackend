using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using ReactPeopleBackend.Data;

namespace ReactPeopleBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("GetAll")]
        public List<Person> GetAll()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("add")]
        public void Add(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Add(person);
        }

        [HttpPost]
        [Route("update")]
        public void Update(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Update(person);
        }

        [HttpPost]
        [Route("delete")]
        public void Delete(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(person.Id);
        }

        [HttpPost]
        [Route("deleteall")]
        public void DeleteAll(List<Person> selectedPeople)
        {
            var repo = new PeopleRepository(_connectionString);
            foreach (Person p in selectedPeople)
            {
                repo.Delete(p.Id);
            }
        }


    }
}