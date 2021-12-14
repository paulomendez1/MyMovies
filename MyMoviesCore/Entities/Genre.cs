using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyMoviesCore.Entities
{
    public class Genre : BaseEntity
    {
        [Required]
        public string Name { get; set; }
    }
}
