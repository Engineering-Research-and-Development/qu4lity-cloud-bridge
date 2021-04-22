# ![QU4LITY](docs/images/QU4LITY.png) Cloud Bridge
QU4LITY Cloud Infrastructure provides a seamless solution to exchange data using the QU4LITY Ontology Model (based on R-MPFQ), enabling a semantic enriched data exchange from on-premise data lake to QU4LITY Cloud Data Storage using a time-based approach. The developed QU4LITY Cloud Bridge offers a REST API layer to ease the interfaces with other processing and visualization components taking care of any data decoding/encoding needs (i.e. IEEE754 data encoding)

## Contents

-   [Install](#install)
    -   [Docker install](#docker---recommended)
-   [API](#api)
-   [License](#license)

## Getting Started - install

To instantiate the whole QU4LITY Cloud Infrastructure use docker-compose which will take care of the creation of 3 containers namely: **nginx**, **MariaDB** and **node.js**. Alternatively you can locally run the infrastructure with the help of _node.js_ and a _MariaDB Server_.

### Docker - Recommended

1. Fill _'mariadb_conf'_ folder with your pre-existing dumps if any.
2. Configure your environment variables in the _'docker-compose.yml'_ file
3. Run docker-compose command into project root folder:
```sh
docker-compose up
```

## API

<table role="table">
    <thead>
        <tr align="center">
            <th>HTTP Method</th>
            <th>Service</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
      <tr>
          <td>POST</td>
          <td>/drum/sensor/fetch/one</td>
          <td>Returns given drum sensor measure by passing <a>measure_id</a> as body parameter</td>
      </tr>
      <tr>
          <td>POST</td>
          <td>/drum/sensor/fetch/all</td>
          <td>Returns all drum sensor measures. You can pass the followings as body parameter:
              <ul>
                  <li><a>measureSpecification</a>: String - MANDATORY</li>
                  <li><a>from</a>: Date</li>
                  <li><a>to</a>: Date</li>
                  <li><a>limit</a>: Int</li>
                  <li><a>offset</a>: Int</li>
                  <li><a>decoded</a>: Bool</li>
              </ul>
          </td>
      </tr>
      <tr>
          <td>POST</td>
          <td>/drum/test/fetch/one</td>
          <td>Returns given drum test measure by passing <a>measure_id</a> as body parameter</td>
      </tr>
      <tr>
          <td>POST</td>
          <td>/drum/test/fetch/all</td>
          <td>Returns all drum test measures. You can pass the followings as body parameter:
              <ul>
                  <li><a>type</a>: String</li>
                  <li><a>onlyFailures</a>: Bool</li>
                  <li><a>from</a>: Date</li>
                  <li><a>to</a>: Date</li>
                  <li><a>limit</a>: Int</li>
                  <li><a>offset</a>: Int</li>
              </ul>
          </td>
      </tr>
      <tr>
          <td>GET</td>
          <td>/engineeringBoM/list</td>
          <td>Returns all engineeringBoMs</td>
      </tr>
      <tr>
          <td>POST</td>
          <td>/engineeringBoM/fetch/one</td>
          <td>Returns a subset of all engineeringBoMs. You can pass the followings as body parameter:
              <ul>
                  <li><a>engineeringBoM_id</a>: Int</li>
              </ul>
          </td>
      </tr>
      <tr>
          <td>POST</td>
          <td>/engineeringBoM/fetch/all</td>
          <td>Returns a subset of all engineeringBoMs. You can pass the followings as body parameter:
              <ul>
                  <li><a>engineeringBoM_id</a>: Int</li>
                  <li><a>material_id</a>: Int</li>
              </ul>
          </td>
      </tr>
      <tr>
          <td>GET</td>
          <td>/function/list</td>
          <td>Returns all functions</td>
      </tr>
      <tr>
          <td>POST</td>
          <td>/function/fetch/one</td>
          <td>Returns a function by passing <a>function_id</a> as body parameter</td>
      </tr>
      <tr>
          <td>POST</td>
          <td>/function/fetch/all</td>
          <td>Returns a subset of all functions. You can pass the followings as body parameter:
              <ul>
                  <li><a>type</a>: String</li>
              </ul>
          </td>
      </tr>
      <tr>
          <td>GET</td>
          <td>/material/list</td>
          <td>Returns all materials</td>
      </tr>
      <tr>
          <td>POST</td>
          <td>/material/fetch/one</td>
          <td>Returns a material by passing <a>material_id</a> as body parameter</td>
      </tr>
      <tr>
          <td>GET</td>
          <td>/process/list</td>
          <td>Returns all processes</td>
      </tr>
      <tr>
          <td>POST</td>
          <td>/process/fetch/one</td>
          <td>Returns given process by passing <a>process_id</a> as body parameter</td>
      </tr>
      <tr>
          <td>GET</td>
          <td>/productionLine/list</td>
          <td>Returns all productionLines</td>
      </tr>
      <tr>
          <td>POST</td>
          <td>/productionLine/fetch/one</td>
          <td>Returns given productionLine by passing <a>productionLine_id</a> as body parameter</td>
      </tr>
      <tr>
          <td>GET</td>
          <td>/station/list</td>
          <td>Returns all stations</td>
      </tr>
      <tr>
          <td>POST</td>
          <td>/station/fetch/one</td>
          <td>Returns given station by passing <a>station_id</a> as body parameter</td>
      </tr>
      <tr>
          <td>POST</td>
          <td>/station/fetch/all</td>
          <td>Returns a subset of all stations. You can pass the followings as body parameter:
              <ul>
                  <li><a>machinery_id</a>: Int</li>
              </ul>
          </td>
      </tr>
    </tbody>
</table>

You can download an example of Postman collection [here](docs/postman_collection.json)


N.B **nginx** is configured to use **Basic authentication**, please remember either to configure it properly in _'nginx_conf'_ folder or to include the authorization header in your HTTP request as shown in the following example

##### Request Example

```sh
curl --location --request POST 'http://localhost:8080/mpfq/api/1.0/station/fetch/all' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic ZXhhbXBsZXVzZXI6cXU0bGl0eSE=' \
--data-raw '{}'
```
## License
QU4LITY Cloud Bridge is licensed under the

GNU Affero General Public License v3.0
