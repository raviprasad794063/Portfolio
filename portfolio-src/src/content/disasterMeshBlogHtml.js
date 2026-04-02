import sourceHtml from './disasterMeshBlogSource.html?raw';

const mainBlockMatch = sourceHtml.match(/<style[\s\S]*?<\/style>[\s\S]*?<main class="page-wrap">[\s\S]*?<\/main>/i);

const disasterMeshBlogHtml = (mainBlockMatch ? mainBlockMatch[0] : sourceHtml)
  .replace(/<\/body>[\s\S]*$/i, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(
    /Most communication systems are built on a single assumption:[\s\S]*?the answer turned into DisasterMesh[\s\S]*?relay\.<\/p>/i,
    `<p class="body-text">
      Most communication systems are built on a single assumption: the internet will always be there. In real-world disaster scenarios &mdash; earthquakes, floods, large-scale outages &mdash; that assumption fails immediately. Cellular towers go down. Wi-Fi infrastructure disappears. The people who need to communicate most are the ones suddenly cut off.
    </p>
    <p class="body-text">
      That is where this project started. The question was simple: what if devices could communicate without internet, without cellular towers, and still form a usable network? The answer turned into DisasterMesh &mdash; a peer-to-peer Android application that uses Bluetooth and Wi-Fi Direct to build a dynamic mesh where each device acts as both a node and a relay.
    </p>`
  );

export default disasterMeshBlogHtml;
