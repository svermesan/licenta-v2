﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Homefind.Core.Interfaces
{
    public interface IFilter<T>
    {
        Expression<Func<T, bool>> Criteria { get; }
        List<Expression<Func<T, object>>> Includes { get; }
    }
}
