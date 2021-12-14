﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyMoviesCore.DTOs
{
    public class PaginationDTO
    {
        public int Page { get; set; } = 1;
        public string sortColumn { get; set; }
        public string sortOrder { get; set; }
        private int recordsPerPage = 10;
        private readonly int maxAmount = 50;
        public int RecordsPerPage
        {
            get
            {
                return recordsPerPage;
            }
            set
            {
                recordsPerPage = (value > maxAmount) ? maxAmount : value; 
            }
        }
    }
}
