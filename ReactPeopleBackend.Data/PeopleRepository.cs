using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;


namespace ReactPeopleBackend.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.ToList();
        }

        public void Add(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }
        public void Delete(int id)
        {
            using var ctx = new PeopleDbContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
        }

        public void Update(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Attach(person);
            context.Entry(person).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}
