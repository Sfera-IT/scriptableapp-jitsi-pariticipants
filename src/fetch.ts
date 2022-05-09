// we must force tsc to interpret this file as a module, resolves
// "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations."
// error
export default async (
    input,
    { method, headers, body }
) => {
    const request = <any>new Request(input);
    request.method = method ?? 'GET';
    request.body = body;
    request.headers = headers;
    const response = await request.load();
    const responseMetadata = request.response;
    const status = responseMetadata.statusCode;
    const ok = status >= 200 && status <= 299;
    const json = async () =>
        JSON.parse(response.toRawString());
    const text = () => response.toRawString();
    const arrayBuffer = () =>
        Uint8Array.from(response.getBytes())
            .buffer;
    return {
        ...responseMetadata,
        text,
        json,
        arrayBuffer,
        ok,
        status,
        response,
    };
};