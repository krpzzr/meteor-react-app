import { WebApp } from "meteor/webapp";
import bodyParser from "body-parser";

export function register_server_http_response_route(routeUrl, handler, handlerArgs) {
  // Setup to parse request body
  // https://forums.meteor.com/t/getting-request-body-undefined-in-post-requests/42722
  WebApp.connectHandlers.use(routeUrl, bodyParser.json());
  // For requests with content-type application/x-www-form-urlencoded
  // WebApp.connectHandlers.use('/path', bodyParser.urlencoded());
  
  // Listen to incoming HTTP requests (can only be used on the server).
  // https://docs.meteor.com/packages/webapp.html
  // eslint-disable-next-line fp/no-nil
  WebApp.connectHandlers.use(routeUrl, (req, res, next) => {
    handler(req, handlerArgs)
    res.writeHead(200);
    res.end();
  });
  return true;
}