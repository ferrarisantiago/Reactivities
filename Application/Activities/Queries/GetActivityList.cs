using System;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities.Queries;

// This class defines a Query (request) and its Handler (logic) using the CQRS + MediatR pattern.
// Esta clase define una Query (petición) y su Handler (lógica) usando el patrón CQRS + MediatR.

public class GetActivityList
{

    // The Query: represents the request “Get me a list of all activities”.
    // La Query: representa la solicitud “Tráeme la lista de todas las actividades”.

    public class Query : IRequest<List<Activity>> { }

    // The Handler: handles the Query logic using EF Core (database access).
    // El Handler: maneja la lógica de la Query usando EF Core (acceso a base de datos).
    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Activity>>
    {
        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            // Retrieves all activities asynchronously from the database.
            // Obtiene todas las actividades de la base de datos de forma asíncrona.
            return await context.Activities.ToListAsync(cancellationToken);
        }
    }
}
