﻿using Application.DTO;
using Application.Features.Commands;
using Application.Features.Queries;
using Application.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<PagedList<ActivityDTO, DateTime?>>> GetActivities([FromQuery] ActivityParams activityParams)
        {
            return HandleResult(await Mediator.Send(new GetActivityList.Query { ActivityParams = activityParams }));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityDTO>> GetActivityDetail(string id)
        {
            return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateActivity(CreateActivityDTO activityDTO)
        {
            return HandleResult(await Mediator.Send(new CreateActivity.Command { CreateActivityDTO = activityDTO }));
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult> EditActivity(EditActivityDTO activity)
        {
            return HandleResult(await Mediator.Send(new EditActivity.Command { EditActivityDTO = activity }));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult> DeleteActivity(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult> Attend(string id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }
    }
}
