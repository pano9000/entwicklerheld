package de.entwicklerheld.restApiJava;

public class Response<T> {
    private final int statusCode;
    private final T body;

    public Response(int statusCode, T body) {
        this.statusCode = statusCode;
        this.body = body;
    }

    public Response(int statusCode) {
        this.statusCode = statusCode;
        this.body = null;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public T getBody() {
        return body;
    }
}
