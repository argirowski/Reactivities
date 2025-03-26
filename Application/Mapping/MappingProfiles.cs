using Application.DTO;
using AutoMapper;
using Domain;

namespace Application.Mapping
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<CreateActivityDTO, Activity>();
        }
    }
}
