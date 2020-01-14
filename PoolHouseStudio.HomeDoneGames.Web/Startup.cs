using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PoolHouseStudio.HomeDoneGames.DataAccessLayer;
using PoolHouseStudio.HomeDoneGames.DataAccessLayer.Repositories;
using PoolHouseStudio.HomeDoneGames.Service.Services;
using PoolHouseStudio.HomeDoneGames.Web.Extensions;
using PoolHouseStudio.HomeDoneGames.Web.Hubs;

namespace PoolHouseStudio.HomeDoneGames
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin",
                builder =>
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });

            services.AddDbContext<DataDbContext>(options => 
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // Repositories

            services.AddScoped(typeof(IAsyncRepository<>), typeof(Repository<>));
            services.AddScoped<IGameTypeRepository, GameTypeRepository>();
            services.AddScoped<IRoomRepository, RoomRepository>();
            
            // Services

            services.AddTransient<IGameTypeService, GameTypeService>();
            services.AddTransient<IRoomService, RoomService>();

            services.AddControllers();
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("AllowOrigin");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.ConfigureCustomExceptionMiddleware();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<GameHub>("/gamehub");
            });
        }
    }
}
