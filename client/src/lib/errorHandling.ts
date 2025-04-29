/**
 * Parses API error responses and returns a formatted error message.
 * Handles both JSON-formatted errors and plain text responses.
 */
export async function parseErrorResponse(response: Response): Promise<string> {
  try {
    // Try to parse the error response as JSON
    const errorData = await response.json();
    
    if (errorData.message && errorData.errors && Array.isArray(errorData.errors)) {
      // Format Zod validation errors in a readable way
      const errorDetails = errorData.errors.map((err: any) => 
        `${err.path.join('.')}: ${err.message}`
      ).join(', ');
      
      return `${errorData.message}. ${errorDetails}`;
    }
    
    // If JSON parsing succeeds but not in the expected format
    return errorData.message || JSON.stringify(errorData);
  } catch (parseError) {
    // If JSON parsing fails, fallback to using status text
    try {
      const text = await response.text();
      return text || response.statusText || `Error ${response.status}`;
    } catch (textError) {
      return `Error ${response.status}: ${response.statusText}`;
    }
  }
}