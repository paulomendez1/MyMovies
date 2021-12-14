﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyMoviesCore.DTOs
{
    public class MovieFilterDTO
    {
        public int Page { get; set; }
        public int RecordsPerPage { get; set; }
        public PaginationDTO PaginationDTO
        {
            get { return new PaginationDTO() { Page = Page, RecordsPerPage = RecordsPerPage }; }
        }
        public string Title { get; set; }
        public int GenreId { get; set; }
        public bool InTheaters { get; set; }
        public bool UpcomingReleases { get; set; }

    }
}
