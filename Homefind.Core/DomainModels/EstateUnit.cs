﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Homefind.Core.Constants;

namespace Homefind.Core.DomainModels
{
    public class EstateUnit : BaseEntity
    {
        public ListingType Reason { get; set; }
        public long EstateTypeId { get; set; }
        public string PostedBy { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public int Balconies { get; set; }
        public int CarpetArea { get; set; }
        public int FloorNumber { get; set; }
        public DateTime DatePosted { get; set; }
        public DateTime DateAvailable { get; set; }
        public string Status { get; set; }
        [NotMapped]
        public bool IsMarkedAsFavourite { get; set; }

        public EstateLocation EstateLocation { get; set; }
        public EstateType EstateType { get; set; }
        public EstateFeature EstateFeature { get; set; }
        public ICollection<EstateImage> EstateImages { get; set; }
    }
}
