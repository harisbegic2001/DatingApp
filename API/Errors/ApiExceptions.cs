namespace API.Errors
{
    public class ApiExceptions
    {
        public ApiExceptions(int statusCode, string messgage = null, string details=null)
        {
            StatusCode = statusCode;
            Messgage = messgage;
            Details = details;
        }

        public int StatusCode { get; set; }
        public string Messgage { get; set; }
        public string Details { get; set; }
    
    }
}