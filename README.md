# ![FI-MIND Schema](docs/images/QU4LITY.png) Cloud Bridge
QU4LITY Cloud Infrastructure provides a seamless solution to exchange data using the QU4LITY Ontology Model (based on R-MPFQ), enabling a semantic enriched data exchange from on-premise data lake to QU4LITY Cloud Data Storage using a time-based approach. The developed QU4LITY Cloud Bridge offers a REST API layer to ease the interfaces with other processing and visualization components pilot taking care of any data decoding/encoding needs (i.e. IEEE754 data encoding)

## Contents

-   [Architecture](#architecture)
-   [Install](#install)
  -   [Docker install](#docker---recommended)
  -   [WebServer Install](#webserver)
-   [API](#api)

## Architecture

![FI-MIND Schema](docs/images/QCloudBridge.png)

In the picture above it's worth pointing out that QU4LITY Cloud Bridge but more generally QU4LITY Cloud Infrastructure aims building an abstraction layer on top of pre-exisitng Infrastructures to make them compliant to QU4LITY data model standards. To this extent, interoperability is the main goal which have been targeted during the whole development, thus the most varied on-premise data lake are supported by QU4LITY Cloud Infrastructure.

## Getting Started - install

To instantiate the whole QU4LITY Cloud Infrastructure use docker-compose which will take care of the creation of 3 containers namely: **nginx**, **MariaDB** and **node.js**. Alternatively you can locally run the infrastructure with the help of _node.js_ and a _MariaDB Server_.

### Docker - Recommended

1. Replace _'dump.sql'_ file in _'mariadb_conf'_ folder with your pre-existing dump if any.
2. Configure your environment variables in the _'docker-compose.yml'_ file  
3. Run docker-compose command into project root folder:
```sh
docker-compose up
```

## API

<table role="table">
 <thead>
  <tr align="center"><th>HTTP Method</th><th>Service</th><th>Description</th></tr>
 </thead>
 <tbody>

  <tr>
   <td>POST</td>
   <td>/function</td>
   <td>Returns given function by passing <a>function_id</a> as body parameter</td>
  </tr>
  <tr>
   <td>POST</td>
   <td>/functions</td>
   <td>Returns all functions. You can pass the followings as body parameter:
     <ul>
      <li><a>type</a>: String</li>
     </ul>
   </td>
  </tr>

  <tr>
   <td>POST</td>
   <td>/measure</td>
   <td>Returns given measure by passing <a>measure_id</a> as body parameter</td>
  </tr>
  <tr>
   <td>POST</td>
   <td>/measures</td>
   <td>Returns all measures. You can pass the followings as body parameter:
     <ul>
      <li><a>type</a>: String</li>
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
   <td>/productionLine</td>
   <td>Returns given productionLine by passing <a>productionLine_id</a> as body parameter</td>
  </tr>
  <tr>
   <td>POST</td>
   <td>/productionLines</td>
   <td>Returns all productionLines.</td>
  </tr>

  <tr>
   <td>POST</td>
   <td>/station</td>
   <td>Returns given station by passing <a>station_id</a> as body parameter</td>
  </tr>
  <tr>
   <td>POST</td>
   <td>/stations</td>
   <td>Returns all station. You can pass the followings as body parameter:
     <ul>
      <li><a>machinery_id</a>: Int</li>
     </ul>
   </td>
  </tr>

 </tbody>
</table>

##### Request Example

```sh
curl --location --request POST 'http://localhost:8080/mpfq/api/1.0/stations' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic ZXhhbXBsZXVzZXI6cXU0bGl0eSE=' \
--data-raw '{}'
```
