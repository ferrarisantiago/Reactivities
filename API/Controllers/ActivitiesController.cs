using System;
using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

// This controller manages HTTP requests for the Activities endpoint.
// Este controlador maneja las peticiones HTTP para el endpoint de Activities.
public class ActivitiesController : BaseApiController
{

    [HttpGet]
    // Sends a Query through MediatR to get all activities.
    // Envía una Query mediante MediatR para obtener todas las actividades.
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        return await Mediator.Send(new GetActivityDetails.Query { id = id });
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(Activity activity)
    {
        return await Mediator.Send(new CreateActivity.Command { Activity = activity });
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(Activity activity)
    {
        await Mediator.Send(new EditActivity.Command { Activity = activity });
        
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        await Mediator.Send(new DeleteActivity.Command{Id = id});

        return Ok();
    }

    /*Oldfashion way
    private readonly AppDbContext context;

    public ActivitiesController(AppDbContext context) 
    {
        this.context = context;  
    }
    */

}
