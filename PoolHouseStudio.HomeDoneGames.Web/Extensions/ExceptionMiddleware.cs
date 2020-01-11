using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using PoolHouseStudio.HomeDoneGames.Common;
using PoolHouseStudio.HomeDoneGames.Common.Exceptions;
using System;
using System.Net;
using System.Threading.Tasks;

namespace PoolHouseStudio.HomeDoneGames.Web.Extensions
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var response = context.Response;
            var baseException = exception as BaseException;
            var statusCode = (int)HttpStatusCode.InternalServerError;
            var message = "An unexpected fault happened. Try again later.";
            var description = "An unexpected fault happened. Try again later.";

            if (baseException != null)
            {
                message = baseException.Message;
                description = baseException.Description;
                statusCode = baseException.Code;
            }

            response.ContentType = "application/json";
            response.StatusCode = statusCode;

            await response.WriteAsync(new ErrorDetails()
            {
                Message = message,
                Description = description,
                StatusCode = statusCode
            }.ToString());
        }
    }
}
