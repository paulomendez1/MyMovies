using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyMoviesCore.Entities
{
    public class Actor : BaseEntity
    {
        [Required]
        [StringLength(120)]
        public string Name { get; set; }
        public DateTime Birthdate { get; set; }
        public string Biography { get; set; }
        public string Picture { get; set; }

    }
}
