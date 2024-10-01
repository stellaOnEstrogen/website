---
title: Image Uploader - Get Media
---

## Endpoint

`GET https://i.0x7ffed9b08230.dev/api/get-media`

## Description

This endpoint retrieves a list of media from the database, filtered and sorted based on the provided query parameters.

## Query Parameters

- **by** (string) (**Required**): The user ID of the person who uploaded the media.
- **sort** (string) (Optional): The direction to sort the results. Accepted values are:
    - `ASC`: Ascending order (default).
    - `DESC`: Descending order.
- **order** (string) (Optional): The column by which to order the results. Accepted values are:
    - `UploadedAt`: Order by the upload date.
    - `Views`: Order by the number of views.
- **limit** (number) (Optional): The maximum number of results to return. Must be a positive integer.
- **type** (string) (Optional): The type of content to filter by. Accepted values:
    - `videos`: Filters for video content.
    - Other values will filter for image content.

## Example Request

```http
GET /api/get-media?by=12345&sort=DESC&order=Views&limit=10&type=videos
```

## Responses

### Success `(200 OK)`

On a successful request, the server will return a JSON array of media.

```json
[
    {
    "Id": "4c352de1",
    "Caption": "Example caption",
    "FileName": "81b5daba-53c4-4b47-9de4-c1cbe72b5fbe.jpg",
    "ContentType": "image/jpeg",
    "Views": 6,
    "UploadedAt": 1724288888678,
    "UploadedBy": "1"
  },
]
```

### Error Responses

- **400 Bad Request**: The request was malformed or missing required parameters.

```json
{
  "error": "Missing 'by' query parameter. This must be a user ID."
}
```

```json
{
  "error": "Invalid 'limit' query parameter. It must be a positive integer."
}
```

- **500 Internal Server Error**: If there is an error processing the request on the server.

```json
{
  "error": "Internal Server Error"
}
```

## Error Handling

The endpoint handles errors in the following cases:

- Missing or invalid `by` query parameter will return a `400` status code.
- Invalid limit query parameter will return a `400` status code.
- Any server-side issues will return a `500` status code.

## Caching

The server caches the results of the query using a simple in-memory cache (`postCache`). If the same query is requested again, the cached results are returned to improve performance.